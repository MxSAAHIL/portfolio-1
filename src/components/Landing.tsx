import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import "./styles/Landing.css";

const PRIMARY_WORDS = ["Designer", "Developer"];
const SECONDARY_WORDS = ["Developer", "Designer"];

const Landing = ({ children }: PropsWithChildren) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((value) => (value + 1) % PRIMARY_WORDS.length);
    }, 4000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <motion.h2
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            >
              Hello! I'm
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 45, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              MONCY
              <br />
              <span>YOHANNAN</span>
            </motion.h1>
          </div>
          <div className="landing-info">
            <motion.h3
              initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
            >
              A Creative
            </motion.h3>
            <h2 className="landing-info-h2 landing-rotating">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`primary-${wordIndex}`}
                  className="landing-rotating-word"
                  initial={{ opacity: 0, y: 70, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -70, filter: "blur(4px)" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {PRIMARY_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </h2>
            <h2 className="landing-sub-rotating">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`secondary-${wordIndex}`}
                  className="landing-sub-word"
                  initial={{ opacity: 0, y: 70, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -70, filter: "blur(4px)" }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: 0.05 }}
                >
                  {SECONDARY_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
