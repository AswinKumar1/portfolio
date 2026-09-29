// Central place to edit your real details — swap these and the rest of the
// site updates everywhere it's referenced.

export const profile = {
  name: 'Aswin Kumar',
  title: 'SYSTEM ARCHITECT & ML LEAD',
  email: 'aswin@aswinkumarj.com',
  githubUsername: 'AswinKumar1', // used to pull the real contribution graph
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/aswin-kumar-janakiraman' },
    { label: 'GitHub', href: 'https://github.com/AswinKumar1' },
    { label: 'Medium', href: 'https://no-cap-ambrosia.medium.com/' },
  ],
  availability: 'Available for select partnerships',
}

export const nav = [
  { label: 'Activity', href: '#activity' },
  { label: 'Specimens', href: '#specimens' },
  { label: 'Experience', href: '#experience' }, 
  { label: 'Publications', href: '#publications' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Connect', href: '#connect' },
]

// All scrollable sections, including the hero (which has no nav link of
// its own, since the wordmark already anchors there) — used to track
// which section is in view for the mascot's per-section pose.
export const mascotSectionIds = ['top', ...nav.map((item) => item.href.replace('#', ''))]

// Maps a section id to the mascot artwork shown while that section is in
// view. Only one custom design exists so far (the waving "hi" pose from
// your bf), so every section points at it for now — as more arrive, drop
// the file in public/mascots/ and point the relevant section(s) at it
// here. Anything not listed falls back to `default`.
export const mascotPoses = {
  default: '/mascots/hello-bust.svg',
  top: '/mascots/hello-bust.svg',
  activity: '/mascots/gaming.svg', 
  specimens: '/mascots/coffee.svg',
  publications: '/mascots/working.svg',
  credentials: '/mascots/music.svg',
  connect: '/mascots/bye.svg',
}

export const hero = {
  eyebrow: profile.title,
  headline: ['Engineering', 'Elegance into', 'Infrastructure.'],
  italicWord: 'Elegance',
  body: 'I build the silent, high-performance foundations that allow ambitious AI initiatives to scale from laboratory curiosity to global reality.',
  primaryCta: { label: 'Initiate Contact', href: '#connect' },
  secondaryCta: { label: 'Resume.pdf', href: '/resume.pdf' },
  focusBadge: { label: 'CURRENT FOCUS', value: 'Decision Models & LLMs' },
}

export const activity = {
  eyebrow: 'ARTIFACT 01',
  title: 'The Generative Garden',
  yearLabel: '2024',
}

export const specimens = {
  eyebrow: 'ARTIFACT 02',
  title: 'Technical Specimens',
  archiveLabel: 'ARCHIVE VOL. IV',
  items: [
    {
      index: '01',
      category: 'Infrastructure',
      name: 'Nexus Core',
      problem: 'Multi-cloud latency spikes disrupting real-time LLM inference for 50M+ users.',
      solution: 'Developed a custom Rust-based proxy layer with predictive routing and warm-cache synchronization.',
      scale: '12.5k Requests/Sec · 4 Global Regions · 99.99% Uptime.',
      result: '40% reduction in token-to-first-byte latency.',
    },
    {
      index: '02',
      category: 'AI Engineering',
      name: 'Robotics & AI',
      problem: 'Autonomous robotics and LLMs for human-robot interaction for effective survillance.',
      solution: 'Orchestrated a distributed vector database on Kubernetes with automated embedding pipelines.',
      scale: '2.1B Vector records · Real-time semantic search indexing.',
      result: 'Shortened R&D discovery cycle by 6 months.',
    },
    {
      index: '03',
      category: 'Automation',
      name: 'Forge CI/CD',
      problem: 'Manual deployment of GPU clusters causing 48-hour downtime windows.',
      solution: 'Declarative infrastructure-as-code using Terraform and custom GPU-aware Ansible playbooks.',
      scale: '500+ A100 Nodes · Zero-downtime rolling updates.',
      result: 'Automated provisioning from 2 days to 14 minutes.',
    },
    {
      index: '04',
      category: 'Security',
      name: 'Sentinel Layer',
      problem: 'Prompt injection attacks and PII leakage in public-facing chat interfaces.',
      solution: 'Real-time filtering middleware using detection models for toxicity and PII.',
      scale: 'Scanning 100k tokens per minute with <10ms overhead.',
      result: 'Zero security breaches across 12 product launches.',
    },
  ],
}

export const certifications = [
  { name: 'AWS Certified Solutions Architect — Professional', short: 'AWS SAA', issuer: 'AWS', year: '2024' },
  { name: 'Google Professional Machine Learning Engineer', short: 'GCP ML Engineer', issuer: 'Google Cloud', year: '2023' },
  // { name: 'Kubernetes Administrator (CKA)', short: 'CKA', issuer: 'Kubernetes', year: '2023' },
  // { name: 'NVIDIA DLI: Optimizing LLM Inference', short: 'NVIDIA DLI', issuer: 'NVIDIA', year: '2024' },
  { name: 'HashiCorp Certified: Terraform Associate', short: 'Terraform', issuer: 'HashiCorp', year: '2022' },
  { name: 'Deep Learning Specialization — DeepLearning.AI', short: 'Deep Learning Spec.', issuer: 'DeepLearning.AI', year: '2022' },
  { name: 'Databricks Certified Data Engineer', short: 'Databricks', issuer: 'Databricks', year: '2023' },
  // { name: 'CKS: Certified Kubernetes Security Specialist', short: 'CKS', issuer: 'Kubernetes', year: '2024' },
  { name: 'Azure AI Engineer Associate', short: 'Azure AI', issuer: 'Microsoft Azure', year: '2023' },
  { name: 'Confluent Certified Developer for Apache Kafka', short: 'Kafka Dev', issuer: 'Confluent', year: '2022' },
  // { name: 'Certified Ethical Hacker (CEH)', short: 'CEH', issuer: 'EC-Council', year: '2021' },
]

// The distinct issuing companies behind the certifications above, for the
// logo ticker. `icon` refers to a key in `src/data/brandIcons.js` — leave
// it null and the ticker falls back to a clean monogram badge instead
// (used for brands like AWS and Azure that aren't in the open-source icon
// set this project uses, for licensing reasons — see brandIcons.js).
export const issuers = [
  { name: 'AWS Solutions Architect', icon: null, monogram: 'AWS' },
  { name: 'Google Cloud ML Engineer', icon: 'googlecloud', monogram: 'GCP' },
  // { name: 'Kubernetes', icon: 'kubernetes', monogram: 'K8S' },
  // { name: 'NVIDIA', icon: 'nvidia', monogram: 'NV' },
  { name: 'Apache Airflow 3 Fundamentals', icon: null, monogram: 'Airflow' },
  { name: 'PyTorch Developer', icon: 'null', monogram: 'OpenCV' },
  { name: 'DeepLearning.AI', icon: null, monogram: 'DL.AI' },
  { name: 'Databricks', icon: 'databricks', monogram: 'DB' },
  { name: 'Microsoft Certified: Azure AI Engineer Associate', icon: null, monogram: 'AZ' },
  { name: 'Neo4j Certified Professional', icon: 'apachekafka', monogram: 'Neo4j' },
  // { name: 'EC-Council', icon: null, monogram: 'EC' },
]

export const voices = [
  {
    quote: 'Aswin was a A student in my gradaute level machine learning class in Fall 2024. He later on joined the project and has been an invaluable contributor. He brings a strong "can-do" mindset and consistently drives progress at an impressive pace. Beyond contributing to day-to-day development, he led the refactoring our application to make it more scalable, secure, and user-friendly—taking it to the next level of quality. What sets Aswin apart is his open-mindedness and eagerness to learn, as well as his ability to quickly apply new skills and stay abreast of state-of-the-art solutions. He approaches challenges with relentless problem-solving attitude, contributes with both creative ideas and practical solutions. His energy, fresh perspective, and technical expertise have made a significant impact on our project.',
    name: 'Karen Chen',
    role: 'PI @ Lab for Informatics for Human Flourishing – UMBC',
    photo: 'https://media.licdn.com/dms/image/v2/C4E03AQFTc1e-9nZ9Jw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1567374846128?e=1792022400&v=beta&t=JygrpPU9E0ZolNvEZSAp2pAfKzyBldbhWZvF8kpgXI0',
    linkedin: 'https://www.linkedin.com/in/karen-chen-2474751/',
  },
  {
    quote: 'I had the pleasure of supervising the work of Aswin Kumar Janakiraman at CARDS at the University of Maryland, Baltimore County, where he made exceptional contributions to our projects focused on advanced AI and machine learning techniques. Aswin played a key role in optimizing large language models (LLMs) and implementing Retrieval-Augmented Generation (RAG) techniques, which significantly improved the performance of our VQA systems. His deep understanding of LLM optimization, vector embeddings, and prompt engineering was instrumental in advancing our AI-driven solutions, particularly in real-time natural language tasks and robot navigation. Aswin\'s technical expertise and ability to innovate in the AI space will make him a valuable asset to any AI/ML-focused team and I am confident he will continue to make significant strides in the field.',
    name: 'Aryya Gangopadhyay',
    role: 'PI @ CARDS, UMBC',
    photo: 'https://media.licdn.com/dms/image/v2/C4E03AQG_f3BsK2JnBQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1530817866055?e=1792022400&v=beta&t=8XF4sqRxy0OBl-J5msEuIDOFWwvRk919PBmNrP2kEq4',
    linkedin: 'https://www.linkedin.com/in/aryya-gangopadhyay-09628821/',
  },
  {
    quote: 'Aswin was a student in my Cloud Computing class at UMBC, and he has consistently demonstrated exceptional technical skills and a strong passion for engineering. He possesses a deep understanding of AWS services and enjoys applying them in practical projects. Aswan is a talented engineer who thrives on building and problem-solving, making him an excellent asset to any organization in need of a highly technical individual with strong cloud expertise. I would gladly recommend him again and again.',
    name: 'Samson Oni',
    role: 'Security @ AWS',
    photo: 'https://media.licdn.com/dms/image/v2/D4E03AQHvQCoHP4dOuw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730313023100?e=1792022400&v=beta&t=TQ6zDIsjarYdOLyF-zNRM2uh_Ex6L9JBHm7BzeJqo9c',
    linkedin: 'https://www.linkedin.com/in/samdwise/',
  },
  {
    quote: 'Ashwin is a highly skilled, an adaptable individual and a great learner. He knows when to stand his ground and when to admit a mistake. These are qualities of a great leader and a team player. He is always willing to collaborate and support his colleagues. Ashwin is an original thinker, who consistently demonstrates his ability to design and develop simple solutions to complex problems. I had the pleasure of working with him on several projects, and he always received great feedback from fellow team members and customers alike. He has outstanding communication skills and never loses sight of the target, even in challenging environments. I am confident that Ashwin will continue to excel in his career and always be a valuable contributor to any team he is a part of.',
    name: 'Amit Soni',
    role: 'Director @ Ahoy Systems',
    photo: 'https://media.licdn.com/dms/image/v2/C5103AQH3hGMKuH9YJQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1516243415749?e=1792022400&v=beta&t=x7N3GIBLXxsP-M2bt1rvDhHriNPzKW3RDG6qmPNBrmA',
    linkedin: 'https://www.linkedin.com/in/amitsoni9999/',
  },
]

export const publications = [
  {
    title: 'Machine Learning Frameworks for Wearable-Based Stress Modeling in Naturalistic Settings: Scoping Review',
    venue: 'JMIR Mhealth Uhealth 2026',
    year: '2026',
    description:
      'A confidence-calibration framework for LLM outputs, validated across public benchmark datasets spanning clinical, legal, and scientific text.',
    href: 'https://mhealth.jmir.org/2026/1/e76632',
  },
  {
    title: 'CASTCurate: An Agentic System to Accelerate the Collection and Annotation of Data-Driven Stories',
    venue: 'SIGCSE TS 2026: Proceedings of the 57th ACM Technical Symposium on Computer Science Education V.2',
    year: '2026',
    description: 'One or two sentences on what the paper is about and why it matters.',
    href: 'https://doi.org/10.1145/3770761.3777345',
  },
  {
    title: 'Edge LLMs for Real-Time Contextual Understanding with Ground Robots',
    venue: 'AAAI 2025:Proceedings of the 2025 AAAI Spring Symposium Series',
    year: '2025',
    description: 'GenAI@Edge: Empowering Generative AI at the Edge',
    href: 'https://doi.org/10.1609/aaaiss.v5i1.35583',
  }
]

export const footer = {
  note: "© 2025 " + profile.name + ". Designed with precision & warmth.",
}
