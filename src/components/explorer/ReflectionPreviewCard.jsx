import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, MapPin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { getReadingTime } from "../../utils/readingTime";

export default function ReflectionPreviewCard({ reflection, onClose }) {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const openingTimer = useRef(null);
  const readingTime = getReadingTime(reflection?.sections);
  const reduceMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (openingTimer.current) window.clearTimeout(openingTimer.current);
    },
    [],
  );

  if (!reflection) return null;

  const openReflection = () => {
    if (opening) return;
    setOpening(true);
    openingTimer.current = window.setTimeout(() => {
      navigate(`/reflection/${reflection.id}`);
    }, 420);
  };

  return (
    <>
      <motion.article
        className={`preview-card reflection-card reflection-card-${reflection.id} ${reduceMotion ? "" : "motion-safe"}`}
        initial={reduceMotion ? false : { opacity: 0, x: -26, y: 22, rotate: -3.5, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: -0.6, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -18, y: 14, rotate: -2, scale: 0.95 }}
        transition={reduceMotion ? { duration: 0.01 } : {
          type: "spring",
          stiffness: 300,
          damping: 23,
          mass: 0.75,
        }}
        aria-live="polite"
      >
        <div className="reflection-card-web" aria-hidden="true" />
        <div className="reflection-card-masthead">
          <span>JED TENORIO / SECURITY JOURNAL</span>
          <button
            className="preview-close"
            onClick={onClose}
            aria-label="Close reflection preview"
            disabled={opening}
          >
            <X size={18} />
          </button>
        </div>

        <div className="preview-kicker">REFLECTION {reflection.reflectionNumber}</div>
        <h2>{reflection.title}</h2>
        <p className="reflection-card-date">{reflection.date}</p>

        <div className="reflection-card-details">
          <span><MapPin size={14} /> {reflection.locationLabel}</span>
          <span><Clock3 size={14} /> {readingTime} min read</span>
        </div>

        <p className="reflection-card-preview">{reflection.preview}</p>

        <div className="reflection-card-topics" aria-label="Reflection topics">
          {(reflection.topics || []).map((topic) => <span key={topic}>{topic}</span>)}
        </div>

        <button className="comic-button red" onClick={openReflection} disabled={opening}>
          Read Reflection <ArrowRight size={18} />
        </button>
        <span className="reflection-card-code" aria-hidden="true">
          CIT.017 / R{String(reflection.reflectionNumber).padStart(2, "0")}
        </span>
      </motion.article>

      {opening && createPortal(
        <motion.div
          className="issue-opening reflection-opening"
          role="status"
          aria-live="assertive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12 }}
        >
          <motion.div
            className="issue-opening-panel"
            initial={{ scale: 0.88, rotate: -3 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <small>TURNING THE PAGE TO</small>
            <strong>OPENING REFLECTION {reflection.reflectionNumber}...</strong>
            <span className="opening-rule" />
          </motion.div>
        </motion.div>,
        document.body,
      )}
    </>
  );
}
