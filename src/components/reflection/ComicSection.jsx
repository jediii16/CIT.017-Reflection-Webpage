import { motion, useReducedMotion } from "framer-motion";

export default function ComicSection({ section, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className="article-section"
      id={section.id}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      <div className="section-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
      <div className="section-copy">
        <span className="comic-label">{section.comicLabel}</span>
        <h2>{section.heading}</h2>
        {section.paragraphs.map((paragraph, paragraphIndex) => (
          <p key={`${section.id}-${paragraphIndex}`}>{paragraph}</p>
        ))}
      </div>
      <span className="panel-page" aria-hidden="true">PAGE {String(index + 1).padStart(2, "0")}</span>
    </motion.section>
  );
}
