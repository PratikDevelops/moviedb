import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUpcoming } from '../redux/showsSlice'
import MovieCard from '../components/MovieCard'

export default function Upcoming() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.shows.upcoming)

  useEffect(()=>{ dispatch(fetchUpcoming()) }, [dispatch])

  return (
    <div>
      <h2 className="section-title">Upcoming</h2>
      <div className="grid">{items.map(m=> <MovieCard key={m.id} movie={m} />)}</div>
    </div>
  )
}
