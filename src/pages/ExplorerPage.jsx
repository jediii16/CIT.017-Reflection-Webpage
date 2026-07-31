import { motion } from "framer-motion";
import GeographicExplorer from "../components/explorer/GeographicExplorer";

export default function ExplorerPage() {
  return (
    <motion.main
      className="explorer-page minimal-landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="landing-header">
        <div className="landing-identity">
          <strong>Jed Tenorio</strong>
          <span>Computer Science</span>
          <small>CIT.017 (Information Assurance and Security) - A</small>
        </div>
      </header>
      <section className="landing-globe" aria-label="Interactive reflection globe">
        <GeographicExplorer />
      </section>
    </motion.main>
  );
}
