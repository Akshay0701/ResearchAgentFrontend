export default function Header({ onMenuClick }) {
  return (
    <header className="app-header">
      <button className="menu-button" onClick={onMenuClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 12H21M3 6H21M3 18H21" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <h1>Research Assistant</h1>
      <div className="header-placeholder"></div>
    </header>
  );
}