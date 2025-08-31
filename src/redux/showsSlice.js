import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../config'

// Fetch shows by page (TVmaze)
export const fetchShows = createAsyncThunk('shows/fetchShows', async (page=0) => {
  const { data } = await axios.get(`${BASE_URL}/shows?page=${page}`)
  return { items: data, page, hasMore: data.length > 0 }
})

// Fetch top rated (fetch page and sort client-side)
export const fetchTopRated = createAsyncThunk('shows/fetchTopRated', async (page=0) => {
  const { data } = await axios.get(`${BASE_URL}/shows?page=${page}`)
  const sorted = data.slice().sort((a,b)=> (b.rating?.average||0) - (a.rating?.average||0))
  return { items: sorted, page, hasMore: data.length > 0 }
})

// Upcoming: use schedule (today) and map to shows
export const fetchUpcoming = createAsyncThunk('shows/fetchUpcoming', async () => {
  const { data } = await axios.get(`${BASE_URL}/schedule`)
  // map episodes to unique shows
  const unique = []
  const ids = new Set()
  for (const ep of data) {
    const s = ep._embedded?.show || ep.show || null
    if (s && !ids.has(s.id)) {
      ids.add(s.id)
      unique.push(s)
    }
  }
  return { items: unique.slice(0, 50), page: 0, hasMore: false }
})

// Search
export const fetchSearch = createAsyncThunk('shows/fetchSearch', async ({ query, page=0 }) => {
  const { data } = await axios.get(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)
  const items = data.map(d=>d.show)
  return { items, page, hasMore: false, query }
})

// Details and cast
export const fetchDetails = createAsyncThunk('shows/fetchDetails', async (id) => {
  const { data } = await axios.get(`${BASE_URL}/shows/${id}`)
  return data
})
export const fetchCast = createAsyncThunk('shows/fetchCast', async (id) => {
  const { data } = await axios.get(`${BASE_URL}/shows/${id}/cast`)
  return data
})

const listState = { items: [], page: 0, hasMore: true }

const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    popular: { ...listState },
    toprated: { ...listState },
    upcoming: { ...listState },
    search: { ...listState, query: '' },
    details: null,
    cast: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.fulfilled, (state, { payload }) => { state.popular = payload })
      .addCase(fetchTopRated.fulfilled, (state, { payload }) => { state.toprated = payload })
      .addCase(fetchUpcoming.fulfilled, (state, { payload }) => { state.upcoming = payload })
      .addCase(fetchSearch.fulfilled, (state, { payload }) => { state.search = payload })
      .addCase(fetchDetails.fulfilled, (state, { payload }) => { state.details = payload })
      .addCase(fetchCast.fulfilled, (state, { payload }) => { state.cast = payload })
  }
})

export default showsSlice.reducer
