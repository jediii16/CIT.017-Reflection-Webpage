export default function SiteHeader({ light = false }) {
  return (
    <header className={`site-header article-site-header ${light ? "light" : ""}`}>
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">#1</span>
        <span>
          <strong>JED TENORIO</strong>
          <small>Information Assurance &amp; Security</small>
        </span>
      </div>
    </header>
  );
}
