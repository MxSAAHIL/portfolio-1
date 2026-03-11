import { motion } from "framer-motion";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <motion.h3
          className="title"
          initial={{ opacity: 0, y: 45, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          About Me
        </motion.h3>
        <motion.p
          className="para"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
      </div>
    </div>
  );
};

export default About;
