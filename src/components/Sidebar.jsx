export default function Sidebar({ isOpen, onClose, onNewChat }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="new-chat-button" onClick={onNewChat}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New chat
        </button>
        <div className="sidebar-footer">
          <button className="sidebar-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5.5V8.5M8 8.5V11.5M8 8.5H11M8 8.5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Updates & FAQ
          </button>
          <button className="sidebar-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Settings
          </button>
        </div>
      </aside>
    </>
  );
}