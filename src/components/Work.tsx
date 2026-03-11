import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

type WorkItem = {
  title: string;
  subtitle: string;
  description: string;
  painPoints: string[];
  tools: string[];
  image: string;
};

const WORK_ITEMS: WorkItem[] = [
  {
    title: "AI Powered RAG Chatbot for Company Policies",
    subtitle: "GenAI · LangChain",
    description:
      "Built a RAG-based chatbot using LangChain and Gemini LLM that answers employee queries strictly from company policy documents, reducing hallucinated responses.",
    painPoints: [
      "Used SentenceTransformers to convert policy documents into vector embeddings for semantic understanding",
      "Stored and indexed embeddings in FAISS for accurate semantic search across company policies",
      "Integrated LangChain retriever with Gemini API to fetch relevant policy chunks per query",
      "Generated grounded, context-aware responses tied directly to retrieved policy content",
    ],
    tools: [
      "LangChain",
      "Gemini LLM",
      "SentenceTransformers",
      "FAISS",
      "Retriever Pipeline",
      "Policy RAG",
    ],
    image:
      "https://res.cloudinary.com/digi9xpsn/image/upload/v1773249881/Screenshot_2026-03-03_032307_h7cqpp.png",
  },
  {
    title: "ML-Powered Network Intrusion Detection System",
    subtitle: "End-to-End MLOps",
    description:
      "Developed an end-to-end ML system for network security with an automated pipeline covering data preprocessing, model training, deployment, and monitoring.",
    painPoints: [
      "Built ELT pipeline and trained a classification model achieving 95%+ accuracy on intrusion detection",
      "Deployed FastAPI-based inference service on AWS EC2 for real-time prediction capabilities",
      "Implemented CI/CD automation with GitHub Actions and Docker for reproducible deployments",
      "Integrated MLflow for experiment tracking, DAGsHub for orchestration, and MongoDB for database storage",
    ],
    tools: [
      "Python",
      "ELT Pipeline",
      "FastAPI",
      "AWS EC2",
      "GitHub Actions",
      "Docker",
      "MLflow",
      "DAGsHub",
      "MongoDB",
    ],
    image: "/images/placeholder.webp",
  },
  {
    title: "Skin Cancer Detection System",
    subtitle: "Deep Learning",
    description:
      "Built a binary classification deep learning system to detect Benign vs Malignant skin cancer from medical images with strong real-world prediction performance.",
    painPoints: [
      "Built CNN model for Benign vs Malignant classification, achieving 84-85%+ accuracy",
      "Applied data augmentation and normalization using ImageDataGenerator to improve generalization and prevent overfitting",
      "Designed CNN architecture with Keras Sequential API using Conv2D, MaxPooling, Dense, and Dropout layers",
      "Deployed real-time prediction web app with Streamlit, including image upload and instant classification output",
    ],
    tools: [
      "Python",
      "TensorFlow",
      "Keras",
      "CNN",
      "ImageDataGenerator",
      "Streamlit",
      "Medical Imaging",
    ],
    image:
      "https://res.cloudinary.com/digi9xpsn/image/upload/v1773249706/Screenshot_2026-03-11_224745_gtlzea.png",
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
                  <h3 className="work-number">{String(activeIndex + 1).padStart(2, "0")}</h3>
                  <div>
                    <h4>{activeItem.title}</h4>
                    <p>{activeItem.subtitle}</p>
                  </div>
                </div>

                <div className="work-field">
                  <h5 className="work-label">Project Description</h5>
                  <p className="work-description">{activeItem.description}</p>
                </div>

                <div className="work-field">
                  <h5 className="work-label">Pain Points Solved</h5>
                  <ul className="work-points">
                    {activeItem.painPoints.map((point) => (
                      <li key={`${activeItem.title}-${point}`}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="work-field">
                  <h5 className="work-label">Tech Stack</h5>
                  <div className="work-tech">
                    {activeItem.tools.map((tool) => (
                      <span key={`${activeItem.title}-${tool}`} className="work-tech-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              <div className="work-right">
                <h5 className="work-image-title">Project Image</h5>
                <WorkImage image={activeItem.image} alt={activeItem.title} />
              </div>
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
