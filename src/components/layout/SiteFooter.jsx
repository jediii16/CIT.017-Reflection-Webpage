export default function SiteFooter({ light = false }) {
  return (
    <footer className={`site-footer ${light ? "light" : ""}`}>
      <div>
        <strong>JED TENORIO / REFLECTION 1</strong>
        <span>Information Assurance and Security reflection.</span>
      </div>
      <p>End of Reflection 1. To be continued...</p>
    </footer>
  );
}
