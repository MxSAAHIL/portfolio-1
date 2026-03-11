import { motion } from "framer-motion";
import "./styles/About.css";

const About = () => {
  const paragraphWords =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis dolores numquam iusto Ratione earum ducimus autem id iure pariatur dolorum quae maiores."
      .split(" ");

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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.025,
              },
            },
          }}
        >
          {paragraphWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={{
                hidden: { opacity: 0, y: 36, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: "easeOut" },
                },
              }}
            >
              {word}
              {index < paragraphWords.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  );
};

export default About;
