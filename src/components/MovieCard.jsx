import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  const poster = movie.image?.medium || movie.image?.original || ''
  return (
    <div className="card">
      <Link to={`/show/${movie.id}`}>
        {poster ? <img className="poster" src={poster} alt={movie.name} /> : <div className="poster" />}
        <div className="card-body">
          <div className="title">{movie.name}</div>
          <div className="rating">Rating: {movie.rating?.average ?? 'N/A'}</div>
        </div>
      </Link>
    </div>
  )
}
