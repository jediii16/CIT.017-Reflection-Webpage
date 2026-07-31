import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <motion.main className="not-found" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="error-burst" aria-hidden="true">404!</div>
      <span className="eyebrow red">COORDINATES UNKNOWN</span>
      <h1>This case file<br />doesn’t exist.</h1>
      <p>The trail goes cold here. Return to the globe and choose a documented reflection.</p>
      <Link to="/" className="comic-button red"><ArrowLeft size={18} /> Back to Explorer</Link>
    </motion.main>
  );
}
