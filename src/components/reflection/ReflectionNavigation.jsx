import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReflectionNavigation() {
  return (
    <nav className="reflection-nav" aria-label="Reflection navigation">
      <Link to="/" className="nav-card previous">
        <span><ArrowLeft size={16} /> BACK TO</span>
        <strong>Geographic Explorer</strong>
      </Link>
      <div className="nav-card next disabled" aria-disabled="true">
        <span>NEXT REFLECTION <ArrowRight size={16} /></span>
        <strong>Reflection 2</strong>
        <small>Coming Soon</small>
      </div>
    </nav>
  );
}
