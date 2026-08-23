// Your work history — edit freely, this is transcribed straight from the
// resume doc you shared. Structured as company -> one or more roles, so
// promotions within the same company (like Vagus) nest under one entry
// instead of repeating the company name.

export const experience = [
  {
    company: "PrimeAI",
    website: "https://www.medschool.umaryland.edu/anesthesiology/research/labs/prime-ai-lab/",
    location: "Baltimore, MD",
    roles: [
      {
        title: "AI/ML Engineer — Enterprise Applications",
        period: "Nov 2025 — Present",
        duration: "10 mos",
        bullets: [
          "Engineered an Agent-powered AIS scoring pipeline using MCP, Python, and MongoDB, achieving 83% expert-validated accuracy across 20 years of Maryland Trauma data, estimated to save $40M in healthcare costs",
          "Optimized local Ollama-based LLM inference by tuning data sampling strategies via Terraform and agent tool-calling intervals, improving model throughput by 40%",
          "Designed a VLM-based Surgical Assistant using RAG on image-text data, automating surgical documentation across 5 high-critical procedures and reducing manual documentation effort by 60%",
          "Collaborated with 10+ clinicians and surgeons to propose and validate AI-driven workflows, accelerating research-to-deployment cycles by 35%",
          "Built a Human-in-the-Loop medical review panel using LangExtract to detect documentation errors in Trauma patient records, improving record accuracy by 75% across reviewed cases",
          "Presented monthly literature reviews on Agentic AI architectures and model development trends to a research team, contributing to a publication submission for JMIR and 2+ notable AI conferences",
        ],
      },
    ],
  },
  {
    company: "UMBC Department of Information Systems",
    website: "https://flourish.umbc.edu/",
    location: "Baltimore, MD",
    roles: [
      {
        title: "Full-Stack Developer — Data Science Learning Platform",
        period: "Dec 2024 — Nov 2025",
        duration: "11 mos",
        bullets: [
          "Built end-to-end MLOps pipeline with SageMaker, MLflow, Terraform, and Dockerized AWS ECS, reducing model deployment time by 90%",
          "Architected responsive Nuxt.js front-end with dynamic routing and Vuex state management, reducing page load times by 40% and increasing user session duration by 65%",
          "Conducted multivariate A/B testing experiments, improving click-through rates by 88% and reducing user drop-off by 75%",
          "Integrated Meta 3.2 3B Instruct model via AWS Bedrock, creating an AI assistant that resolved 92% of student queries and increased platform engagement by 80%",
          "Led cross-functional collaboration to implement user feedback, raising satisfaction scores from 7.2 to 9.1/10 through 12 targeted feature improvements",
          "Developed machine learning pipeline with 95% prediction accuracy, increasing course completion rates by 72% and reducing dropout rates by 38%",
          "Integrated with Duo Security MFA for tiered subscriptions, ensuring 100% compliance with data protection standards",
          "Coupled Prefect Workflows + Grafana dashboards to monitor data drift & alert, improving proactive issue detection by 85%",
          "Scaling the backend from a prototype of a Python-based server to an enterprise-level architecture using Golang to better handle concurrent user data collections",
        ],
      },
    ],
  },
  {
    company: "Center for Real-time Distributed Sensing and Autonomy",
    website: "https://cards.umbc.edu/",
    location: "Baltimore, MD",
    roles: [
      {
        title: "Research Assistant",
        period: "Nov 2023 — May 2025",
        duration: "1 yr 7 mos",
        bullets: [
          "Utilized SPOT-SDK and techniques like SLAM/GMapping to create visual map for localisation using Point-cloud data",
          "Developed voice-based chatbot for Visual Question & Answering using Llava-v1.6/Molmo-7B-D-0924 vllm on edge to improve communication with the robot by 40%, employed voice models like gTTs/Kyutai-Moshika",
          "Fine-tuned the LLM application using Prompt engineering and RAG techniques on the RGB & Thermal images using vector embeddings and Pinecone increasing the context rich response by 70%",
          "Developed and integrated LangChain agent-based workflows with custom tools to process high-level NLP voice inputs, utilizing a locally hosted Llama-3.1b LLM on an edge device, enabling actionable robot executions and audio output via online and offline TTS models involving ElevenLabs and Coqui-XTTS",
          "Engineered advanced LangChain AI Agent systems with Model Context Protocol to enable robots to interpret and execute complex natural language commands, resulting in more intuitive human-robot interactions and a 65% reduction in command complexity for non-technical operators",
          "Implemented Oracle Database 23 AI with vector embedding storage to optimize supply chain management operations, leveraging graph-RAG architecture and ONNX models which improved inventory tracking accuracy by 45% and reduced query response times by 60% in contested environment simulations",
        ],
      },
    ],
  },
  {
    company: "Vagus Technologies Inc",
    website: "https://www.vagustech.com/",
    location: "Trichy, India",
    roles: [
      {
        title: "Senior Software Developer",
        period: "Jun 2020 — Aug 2023",
        duration: "3 yrs 3 mos",
        note: "Promoted from Software Developer",
        bullets: [
          "Led a cross-functional team of 6 engineers (2 frontend, 2 backend, 2 DevOps) across 3 years, delivering 15+ enterprise prototypes with a 95% client approval rate and reducing time-to-market by 80%",
          "Managed sprint planning and code reviews for a 6-member development team, maintaining a 98% on-time delivery rate while improving code quality scores from 7.2 to 9.1/10",
          "Mentored and onboarded 4 junior developers over 3 years, with a 100% retention rate and average promotion timeline reduced from 18 to 12 months",
          "Established team-wide CI/CD best practices and code review standards across 6 engineers, reducing production bugs by 65% and improving deployment frequency from weekly to daily",
          "Delivered enterprise solutions across the US and APAC regions with 98% customer satisfaction, generating $2M+ in revenue while coordinating with business stakeholders, product, and cross-functional production team",
        ],
      },
      {
        title: "Software Developer",
        period: "Jun 2018 — Jun 2020",
        duration: "2 yrs",
        bullets: [
          "Architected high-fidelity product prototypes using Python and React.js, deployed using Docker on AWS, accelerating client acquisition by 60% and reducing prototype-to-production time by 75%",
          "Conducted RCA for major system outages and contributed remediation scripts that reduced the recurrence rate by 70%",
          "Led containerization of enterprise microservices using Docker and Kubernetes with Helm-based configuration, improving scalability and reducing manual intervention by 85%",
          "Designed and configured databases and backend applications, contributing to a 38% increase in application efficiency",
          "Utilized Python requests to consume APIs and read JSON reports to automatically log bugs for intermittent issues",
          "Implemented SSO authentication using OpenID Connect and OAuth protocols, enhancing security compliance for 10K+ users",
        ],
      },
    ],
  },
  {
    company: "Ahoy Systems Pvt Limited",
    website: "https://ahoysys.com/",
    location: "New Delhi, India",
    roles: [
      {
        title: "Technical Associate",
        period: "Jan 2017 — Jun 2018",
        duration: "1 yr 6 mos",
        bullets: [
          "Designed and developed a security system based on BeagleBone Black using various sensor data, improving ATM security and reducing incidents by 30%",
          "Executed a system to generate alerts to 3rd party security and maintenance teams, ensuring timely responses and reducing downtime by 20%",
          "Programmed cron jobs to execute shell scripts for raising alerts on web portals, enhancing system reliability and reducing manual intervention",
          "Integrated PTZ camera modules to IP networks and the system to capture incident photos, improving incident documentation and response efficiency",
        ],
      },
    ],
  },
  {
    company: "Google Summer of Code '16 — Red Hen Labs",
    website: "https://www.redhenlab.org/summer-of-code/gsoc16report",
    location: "Remote",
    roles: [
      {
        title: "Intern",
        period: "Mar 2016 — Jul 2016",
        duration: "5 mos",
        bullets: [
          "Engineered a forced alignment system using Kaldi ASR, SRILM, and IRSTLM, optimized for HPC clusters, reducing alignment time by 60% for large-scale news video datasets",
          "Developed Python scripts to automate the alignment workflow, increasing processing speed by 75% and enabling the system to handle 500+ hours of video content daily",
          "Integrated Edinburgh Speech Tools for advanced phonetic analysis and feature extraction, significantly improving word-level alignment precision",
          "Collaborated with Red Hen Lab to integrate the system into their framework, resulting in a 40% increase in research output for multimodal communication studies",
        ],
      },
    ],
  },
]
