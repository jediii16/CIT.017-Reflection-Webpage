import { ArrowLeft, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function ComicArticleHeader({ reflection, readingTime }) {
  return (
    <header className="article-hero">
      <Link to="/" className="back-link"><ArrowLeft size={17} /> Back to Explorer</Link>
      <div className="article-issue-row">
        <span className="article-issue">REFLECTION {reflection.reflectionNumber}</span>
      </div>
      <h1>{reflection.title}</h1>
      <p className="article-subtitle">{reflection.subtitle}</p>
      <div className="article-meta">
        <span>{reflection.date}</span>
        <span><Clock3 size={15} /> {readingTime} min read</span>
        <span><MapPin size={15} /> {reflection.locationLabel}</span>
      </div>
    </header>
  );
}
