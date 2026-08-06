import { motion } from "framer-motion";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";
import ComicArticleHeader from "../components/reflection/ComicArticleHeader";
import ComicSection from "../components/reflection/ComicSection";
import ReadingProgress from "../components/reflection/ReadingProgress";
import ReflectionNavigation from "../components/reflection/ReflectionNavigation";
import { getReflectionById } from "../data/reflections";
import { getReadingTime } from "../utils/readingTime";

export default function ReflectionPage() {
  const { id } = useParams();
  const reflection = getReflectionById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!reflection || reflection.status !== "published") {
    return <Navigate to="/not-found" replace />;
  }

  const readingTime = getReadingTime(reflection.sections);

  return (
    <motion.main
      className="reflection-page"
      initial={{ opacity: 0, x: "5vw", rotateY: -3 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: "-3vw" }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      style={{ transformOrigin: "left center" }}
    >
      <ReadingProgress />
      <SiteHeader light />
      <article className="article-shell">
        <ComicArticleHeader reflection={reflection} readingTime={readingTime} />
        <aside className="article-index" aria-label="Table of contents">
          <div className="article-index-intro">
            <span>REFLECTION {reflection.reflectionNumber} / CONTENTS</span>
            <h2>Follow the Thread</h2>
            <p>Jump directly to any chapter in this security reflection.</p>
          </div>
          <ol>
            {reflection.sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="index-copy">
                    <small>{section.comicLabel}</small>
                    <strong>{section.heading}</strong>
                  </span>
                  <span className="index-arrow" aria-hidden="true">↓</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>
        <div className="article-body">
          {reflection.sections.map((section, index) => (
            <ComicSection section={section} index={index} key={section.id} />
          ))}
        </div>
        <blockquote className="article-pullquote">
          <span>KEY TAKEAWAY</span>
          “{reflection.pullQuote}”
        </blockquote>
        <div className="author-note">
          <span className="author-avatar" aria-hidden="true">JT</span>
          <div>
            <span className="eyebrow red">ABOUT THE AUTHOR</span>
            <h2>Jed Tenorio</h2>
            <p>Jed Tenorio is a Computer Science student taking CIT.017 - Information Assurance and Security. He created this reflection journal to connect classroom security concepts with practical questions about designing safer, more accountable systems.</p>
          </div>
        </div>
        <ReflectionNavigation reflection={reflection} />
      </article>
      <SiteFooter light />
    </motion.main>
  );
}
