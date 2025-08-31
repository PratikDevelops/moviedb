import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchSearch } from '../redux/showsSlice'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

export default function Search() {
  const { query } = useParams()
  const dispatch = useDispatch()
  const { items, page, hasMore } = useSelector(s => s.shows.search)
  const [p, setP] = useState(0)

  useEffect(()=>{ if (query) dispatch(fetchSearch({ query, page: p })) }, [dispatch, p, query])

  return (
    <div>
      <h2 className="section-title">Search: {query}</h2>
      <div className="grid">{items.map(m=> <MovieCard key={m.id} movie={m} />)}</div>
      <Pagination page={page} hasMore={hasMore} onChange={setP} />
    </div>
  )
}
