import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUpcoming } from '../redux/showsSlice'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'

export default function Upcoming() {
  const dispatch = useDispatch()
  const { items } = useSelector(s => s.shows.upcoming)
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchUpcoming())
    }
  }, [dispatch, items.length])

  const showsPerPage = 10
  const startIndex = page * showsPerPage
  const currentShows = items.slice(startIndex, startIndex + showsPerPage)
  const totalPages = Math.ceil(items.length / showsPerPage)

  return (
    <div>
      <h2 className="section-title">Upcoming</h2>

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
