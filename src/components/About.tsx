import { motion } from "framer-motion";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <motion.div
            className="about-glow about-glow-one"
            animate={{ y: [0, -7, 0], x: [0, 5, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="about-glow about-glow-two"
            animate={{ y: [0, 8, 0], x: [0, -5, 0], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.h3
            className="about-title"
            initial={{ opacity: 0, y: 45, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
          >
            About Me
          </motion.h3>
          <motion.p
            className="about-para"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.16 }}
          >
            Enthusiastic and curious problem solver with a strong passion for{" "}
            <span className="about-highlight">AI and software development</span>,
            actively{" "}
            <span className="about-highlight">
              building real-world end-to-end systems
            </span>{" "}
            that solve meaningful problems. A continuous learner eager to grow,
            contribute, and{" "}
            <span className="about-highlight">
              make an impact in a software engineering role
            </span>
            .
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
