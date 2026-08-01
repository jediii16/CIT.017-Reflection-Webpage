import { motion, useReducedMotion } from "framer-motion";

export default function ComicSection({ section, index }) {
  const reduceMotion = useReducedMotion();
  const sectionMotion = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.12 },
      };
  const copyVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: "easeOut", staggerChildren: 0.055 },
    },
  };
  const textVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
  };

  return (
    <motion.section
      className="article-section"
      id={section.id}
      variants={{
        hidden: { opacity: 0, y: 28, rotate: index % 2 === 0 ? -0.35 : 0.35 },
        visible: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
      {...sectionMotion}
    >
      <motion.div
        className="section-number"
        aria-hidden="true"
        variants={{
          hidden: { opacity: 0, x: -24, rotate: -8, scale: 0.86 },
          visible: {
            opacity: 1,
            x: 0,
            rotate: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 320, damping: 20, delay: 0.06 },
          },
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>
      <motion.div className="section-copy" variants={copyVariants}>
        <motion.span
          className="comic-label"
          variants={{
            hidden: { opacity: 0, x: -20, rotate: -6, scale: 0.9 },
            visible: {
              opacity: 1,
              x: 0,
              rotate: -1,
              scale: 1,
              transition: { type: "spring", stiffness: 380, damping: 18 },
            },
          }}
        >
          {section.comicLabel}
        </motion.span>
        <motion.h2 variants={textVariants}>{section.heading}</motion.h2>
        {section.paragraphs.map((paragraph, paragraphIndex) => (
          <motion.p variants={textVariants} key={`${section.id}-${paragraphIndex}`}>
            {paragraph}
          </motion.p>
        ))}
      </motion.div>
      <span className="panel-page" aria-hidden="true">PAGE {String(index + 1).padStart(2, "0")}</span>
    </motion.section>
  );
}
