import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import "./styles/Career.css";

const Career = () => {
  const itemVariants: Variants = {
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
                <h4>Software Intern</h4>
                <h5>Voila System Pvt.Ltd</h5>
              </div>
              <h3>2024</h3>
            </div>
            <ul className="career-points">
              <li>
                Built and optimized applications using Python and MySQL,
                ensuring efficient query performance.
              </li>
              <li>
                Applied data structures and algorithms in problem-solving tasks
                to improve performance.
              </li>
              <li>
                Mentored fellow interns on debugging, teamwork, and effective
                use of AI tools.
              </li>
            </ul>
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
                <h4>Co-Founder</h4>
                <h5>onedaytask.com</h5>
              </div>
              <h3>2025</h3>
            </div>
            <ul className="career-points">
              <li>
                Built and launched a digital platform connecting businesses with
                students and young workers for one-day or short-term job
                opportunities, enabling quick hiring and same-day payments.
              </li>
              <li>
                Scaled the platform to 1,500+ users within the first 3 months,
                validating strong demand for flexible, on-demand manpower.
              </li>
              <li>
                Collaborated with large organizations such as Lulu Group to
                fulfill temporary staffing needs for specific events and peak
                business days through the platform.
              </li>
              <li>
                Successfully exited the venture by selling equity stake, and
                transitioned focus toward building solutions in AI and
                automation technologies.
              </li>
            </ul>
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
                <h4>AI Intern</h4>
                <h5>Lanovis Security Solutions</h5>
              </div>
              <h3>2025</h3>
            </div>
            <ul className="career-points">
              <li>
                Developed machine learning and deep learning models using
                TensorFlow and PyTorch, gaining experience with neural networks
                (CNN, RNN, LSTM), NLP.
              </li>
              <li>
                Built AI chatbot using LangChain for internal automation and
                assisted in development of company AI products.
              </li>
              <li>
                Learned professional development practices including team
                collaboration, version control, agile methodologies, and
                production deployment workflows.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Career;
