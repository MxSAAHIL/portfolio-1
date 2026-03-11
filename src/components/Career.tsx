import { motion } from "framer-motion";
import "./styles/Career.css";

const Career = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          My career <span>&</span>
          <br /> experience
        </motion.h2>
        <div className="career-info">
          <motion.div
            className="career-timeline"
            initial={{ maxHeight: "0%", opacity: 0 }}
            whileInView={{ maxHeight: "100%", opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="career-dot"></div>
          </motion.div>
          <motion.div
            className="career-info-box"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
          >
            <div className="career-info-in">
              <div className="career-role">
                <h4>Position In Company</h4>
                <h5>Company Name</h5>
              </div>
              <h3>20XX</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              labore sit non ipsum temporibus quidem, deserunt eaque officiis
              mollitia ratione suscipit repellat.
            </p>
          </motion.div>
          <motion.div
            className="career-info-box"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
          >
            <div className="career-info-in">
              <div className="career-role">
                <h4>Position In Company</h4>
                <h5>Company Name</h5>
              </div>
              <h3>20XX</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              labore sit non ipsum temporibus quidem, deserunt eaque officiis
              mollitia ratione suscipit repellat.
            </p>
          </motion.div>
          <motion.div
            className="career-info-box"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.35 }}
          >
            <div className="career-info-in">
              <div className="career-role">
                <h4>Position In Company</h4>
                <h5>Company Name</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
              labore sit non ipsum temporibus quidem, deserunt eaque officiis
              mollitia ratione suscipit repellat.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Career;
