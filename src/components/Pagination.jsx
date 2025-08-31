export default function Pagination({ page, hasMore, onChange }) {
  return (
    <div className="pagination">
      <button className="btn" onClick={()=>onChange(Math.max(0, page-1))} disabled={page<=0}>Prev</button>
      <span>Page {page+1}</span>
      <button className="btn" onClick={()=>onChange(page+1)} disabled={!hasMore}>Next</button>
    </div>
  )
}
