import "./styles/WhatIDo.css";

const SKILL_GROUPS = [
  {
    title: "Languages:",
    items: ["Python", "SQL", "HTML"],
  },
  {
    title: "Machine Learning:",
    items: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "PyTorch",
      "NumPy",
      "Pandas",
      "MLflow",
      "DagsHub",
      "Supervised Learning",
      "Unsupervised Learning",
      "Feature Engineering",
      "Model Training & Evaluation",
      "Jupyter Notebook",
    ],
  },
  {
    title: "Deep Learning:",
    items: [
      "CNN",
      "RNN",
      "LSTM",
      "Neural Networks",
      "Natural Language Processing",
    ],
  },
  {
    title: "Backend Development:",
    items: ["Flask", "FastAPI", "Streamlit", "REST API Development"],
  },
  {
    title: "Databases & Storage:",
    items: ["MongoDB", "SQLite3", "MySQL", "AWS S3"],
  },
  {
    title: "Cloud & DevOps:",
    items: [
      "AWS (EC2, S3, Elastic Beanstalk)",
      "Docker",
      "Git/GitHub",
      "CI/CD",
    ],
  },
  {
    title: "Other Skills:",
    items: [
      "N8n Automations",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Microsoft Office Suite",
      "Technical Documentation",
    ],
  },
];

const WhatIDo = () => {
  return (
    <section className="whatIDO" id="skills">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>

          <div className="what-content what-noTouch">
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>Skills &amp; Tools</h3>

              {SKILL_GROUPS.map((group) => (
                <div className="skill-group" key={group.title}>
                  <h5>{group.title}</h5>
                  <div className="what-content-flex">
                    {group.items.map((item) => (
                      <div className="what-tags" key={`${group.title}-${item}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
