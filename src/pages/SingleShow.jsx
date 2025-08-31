import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetails, fetchCast } from '../redux/showsSlice'

export default function SingleShow() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const details = useSelector(s => s.shows.details)
  const cast = useSelector(s => s.shows.cast)

  useEffect(() => {
    dispatch(fetchDetails(id))
    dispatch(fetchCast(id))
  }, [dispatch, id])

  if (!details) return null

  return (
    <div>
      <div className="show-details">
        {details.image && (
          <img
            src={details.image.original || details.image.medium}
            alt={details.name}
          />
        )}
        <div>
          <h2 className="section-title">{details.name}</h2>
          <p
            className="summary"
            dangerouslySetInnerHTML={{ __html: details.summary }}
          />
        </div>
      </div>

      <h3 className="section-title" style={{ marginTop: 24 }}>
        Cast
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px,1fr))',
          gap: 16,
        }}
      >
        {cast.map(c => (
          <div key={c.person.id}>
            {c.person.image && (
              <img
                className="poster"
                style={{ height: 160, borderRadius: 8 }}
                src={c.person.image.medium || c.person.image.original}
                alt={c.person.name}
              />
            )}
            <div className="title">{c.person.name}</div>
            <div className="rating">{c.character?.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
