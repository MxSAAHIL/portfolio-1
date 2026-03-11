import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

type WorkItem = {
  title: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
};

const WORK_ITEMS: WorkItem[] = [
  {
    title: "Project One",
    category: "Web App",
    tools: "React, TypeScript, GSAP, Three.js",
    image: "/images/placeholder.webp",
  },
  {
    title: "Project Two",
    category: "Portfolio",
    tools: "React, Framer Motion, WebGL",
    image: "/images/placeholder.webp",
  },
  {
    title: "Project Three",
    category: "Interactive UI",
    tools: "JavaScript, CSS, Motion Design",
    image: "/images/placeholder.webp",
  },
  {
    title: "Project Four",
    category: "Creative Dev",
    tools: "TypeScript, Three.js, Postprocessing",
    image: "/images/placeholder.webp",
  },
  {
    title: "Project Five",
    category: "Frontend",
    tools: "React, Node.js, REST APIs",
    image: "/images/placeholder.webp",
  },
  {
    title: "Project Six",
    category: "Full Stack",
    tools: "Next.js, TypeScript, MySQL",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemCount = WORK_ITEMS.length;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveIndex((value) => (value + 1) % itemCount);
        return;
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((value) => (value - 1 + itemCount) % itemCount);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [itemCount]);

  const previous = () => {
    setActiveIndex((value) => (value - 1 + itemCount) % itemCount);
  };
  const next = () => {
    setActiveIndex((value) => (value + 1) % itemCount);
  };

  const activeItem = WORK_ITEMS[activeIndex];

  return (
    <section className="work-section section-container" id="work">
      <h2>
        My <span>Work</span>
      </h2>

      <div className="work-slider" data-cursor="disable">
        <button className="work-nav" onClick={previous} aria-label="Previous project">
          Prev
        </button>

        <div className="work-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="work-box"
              initial={{ opacity: 0, x: 90, filter: "blur(3px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -90, filter: "blur(3px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(activeIndex + 1).padStart(2, "0")}</h3>
                  <div>
                    <h4>{activeItem.title}</h4>
                    <p>{activeItem.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{activeItem.tools}</p>
              </div>
              <WorkImage image={activeItem.image} alt={activeItem.title} link={activeItem.link} />
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="work-nav" onClick={next} aria-label="Next project">
          Next
        </button>
      </div>

      <div className="work-dots" data-cursor="disable">
        {WORK_ITEMS.map((_item, index) => (
          <button
            key={`dot-${index}`}
            className={`work-dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
