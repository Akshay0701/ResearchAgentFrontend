export default function SourceLinks({ sources }) {
  // Return null if sources is undefined, null, or not an array
  if (!sources || !Array.isArray(sources) || sources.length === 0) {
    return null;
  }

  return (
    <div className="sources-container">
      <h4>Sources</h4>
      <div className="sources-list">
        {sources.map((source, idx) => (
          <div key={idx} className="source-card">
            <span className="source-title">
              {source.title || new URL(source.url).hostname}
            </span>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              {source.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}