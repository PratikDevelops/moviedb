import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopRated } from '../redux/showsSlice'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

export default function TopRated() {
  const dispatch = useDispatch()
  const { items, page, hasMore } = useSelector(s => s.shows.toprated)
  const [p, setP] = useState(0)

  useEffect(()=>{ dispatch(fetchTopRated(p)) }, [dispatch, p])

  return (
    <div>
      <h2 className="section-title">Top Rated Shows</h2>
      <div className="grid">{items.map(m=> <MovieCard key={m.id} movie={m} />)}</div>
      <Pagination page={page} hasMore={hasMore} onChange={setP} />
    </div>
  )
}
