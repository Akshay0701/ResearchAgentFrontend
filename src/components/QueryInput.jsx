export default function QueryInput({ query, setQuery, loading }) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Message Research Assistant..."
      className="query-input"
      disabled={loading}
    />
  );
}