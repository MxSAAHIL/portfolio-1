import { motion } from "framer-motion";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import "./styles/Landing.css";

const ROLE_TEXTS = ["AI/ML Developer", "Software Developer"];
const ROLE_HOLD_MS = 2500;
const ROLE_FLIP_HALF_MS = 350;

const Landing = ({ children }: PropsWithChildren) => {
  const [roleText, setRoleText] = useState(ROLE_TEXTS[0]);
  const [flipPhase, setFlipPhase] = useState<"idle" | "out" | "in">("idle");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const roleIndexRef = useRef(0);

  useEffect(() => {
    const timers: number[] = [];

    const later = (callback: () => void, ms: number): void => {
      const id = window.setTimeout(callback, ms);
      timers.push(id);
    };

    const runCycle = () => {
      later(() => {
        const nextIndex = (roleIndexRef.current + 1) % ROLE_TEXTS.length;
        setFlipPhase("out");

        later(() => {
          roleIndexRef.current = nextIndex;
          setRoleText(ROLE_TEXTS[nextIndex]);
          setFlipPhase("in");

          later(() => {
            setFlipPhase("idle");
            runCycle();
          }, ROLE_FLIP_HALF_MS);
        }, ROLE_FLIP_HALF_MS);
      }, ROLE_HOLD_MS);
    };

    runCycle();

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const section = document.getElementById("landingDiv");
    const container = containerRef.current;
    if (!section || !container) return;

    const handleMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;

      container.style.setProperty("--parallax-x", nx.toFixed(4));
      container.style.setProperty("--parallax-y", ny.toFixed(4));
    };

    const handleLeave = () => {
      container.style.setProperty("--parallax-x", "0");
      container.style.setProperty("--parallax-y", "0");
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);

    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container" ref={containerRef}>
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
              MUHAMMED
              <br />
              <span>SAAHIL</span>
            </motion.h1>
          </div>
          <div className="landing-info">
            <div className="landing-role-block">
              <p className="landing-role-label">A Creative</p>
              <p
                className={`landing-role-flip landing-role-${flipPhase}`}
              >
                <span className="landing-role-word">
                  {roleText}
                </span>
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
