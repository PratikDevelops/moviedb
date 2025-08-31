import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [q, setQ] = useState('')
  const nav = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    if (q.trim()) nav(`/search/${encodeURIComponent(q.trim())}`)
  }

  return (
    <header className="navbar">
      <div className="brand">MovieDb</div>
      <nav className="nav-links">
        <Link className="nav-link" to="/">Popular</Link>
        <Link className="nav-link" to="/top-rated">Top Rated</Link>
        <Link className="nav-link" to="/upcoming">Upcoming</Link>
        <form className="searchbar" onSubmit={onSubmit}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Show name" />
          <button className="btn" type="submit">Search</button>
        </form>
      </nav>
    </header>
  )
}
