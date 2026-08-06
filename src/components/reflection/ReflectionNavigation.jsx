import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { publishedReflections } from "../../data/reflections";

export default function ReflectionNavigation({ reflection }) {
  const currentIndex = publishedReflections.findIndex(({ id }) => id === reflection.id);
  const previousReflection = publishedReflections[currentIndex - 1];
  const nextReflection = publishedReflections[currentIndex + 1];

  return (
    <nav className="reflection-nav" aria-label="Reflection navigation">
      {previousReflection ? (
        <Link to={`/reflection/${previousReflection.id}`} className="nav-card previous">
          <span><ArrowLeft size={16} /> PREVIOUS REFLECTION</span>
          <strong>{previousReflection.shortTitle}</strong>
        </Link>
      ) : (
        <Link to="/" className="nav-card previous">
          <span><ArrowLeft size={16} /> BACK TO</span>
          <strong>Geographic Explorer</strong>
        </Link>
      )}
      {nextReflection ? (
        <Link to={`/reflection/${nextReflection.id}`} className="nav-card next">
          <span>NEXT REFLECTION <ArrowRight size={16} /></span>
          <strong>{nextReflection.shortTitle}</strong>
        </Link>
      ) : (
        <div className="nav-card next disabled" aria-disabled="true">
          <span>NEXT REFLECTION <ArrowRight size={16} /></span>
          <strong>More reflections</strong>
          <small>Coming Soon</small>
        </div>
      )}
    </nav>
  );
}
