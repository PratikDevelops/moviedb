import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopRated } from '../redux/showsSlice'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

export default function TopRated() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.shows.toprated)
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchTopRated(0))
    }
  }, [dispatch, items.length])

  const showsPerPage = 10
  const startIndex = page * showsPerPage
  const currentShows = items.slice(startIndex, startIndex + showsPerPage)
  const totalPages = Math.ceil(items.length / showsPerPage)

  return (
    <div>
      <h2 className="section-title">Top Rated Shows</h2>

      <div className="grid">
        {currentShows.map(m => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>

      <Pagination
        page={page}
        hasMore={page < totalPages - 1}
        onChange={setPage}
      />
    </div>
  )
}
