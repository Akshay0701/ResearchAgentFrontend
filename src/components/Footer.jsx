export default function Footer() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} Research Assistant AI. All information is sourced from the web.</p>
      <p className="disclaimer">
        Note: AI-generated content may contain errors. Verify critical information.
      </p>
    </footer>
  );
}