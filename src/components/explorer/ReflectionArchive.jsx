import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";
import { reflections } from "../../data/reflections";

const terms = ["Midterms", "Finals"];

export default function ReflectionArchive({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            className="archive-backdrop"
            aria-label="Close reflection archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="archive-drawer"
            aria-label="Reflection archive"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="archive-heading">
              <div>
                <span className="eyebrow">FIELD RECORDS</span>
                <h2>Reflection Archive</h2>
              </div>
              <button className="icon-button light" onClick={onClose} aria-label="Close archive">
                <X size={20} />
              </button>
            </div>
            <p className="archive-intro">
              Every entry is pinned to a place and a moment in my security learning journey.
            </p>
            <div className="archive-list">
              {terms.map((term) => (
                <section className="archive-term" key={term} aria-labelledby={`${term.toLowerCase()}-heading`}>
                  <div className="archive-term-heading">
                    <span>{term === "Midterms" ? "01" : "02"}</span>
                    <h3 id={`${term.toLowerCase()}-heading`}>{term}</h3>
                  </div>
                  <div className="archive-term-list">
                    {reflections
                      .filter((reflection) => reflection.term === term)
                      .map((reflection) => (
                        <article
                          className={`archive-entry ${reflection.status}`}
                          key={reflection.id}
                        >
                          <div className="archive-entry-topline">
                            <span>Reflection {String(reflection.reflectionNumber).padStart(2, "0")}</span>
                            <span>{reflection.date}</span>
                          </div>
                          <h4>{reflection.title}</h4>
                          {reflection.locationLabel && (
                            <p className="location-line">
                              <MapPin size={14} /> {reflection.locationLabel}
                            </p>
                          )}
                          {reflection.status === "published" ? (
                            <Link to={`/reflection/${reflection.id}`} className="text-link">
                              Open case file <ArrowUpRight size={16} />
                            </Link>
                          ) : (
                            <span className="coming-badge">Currently Unavailable</span>
                          )}
                        </article>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
