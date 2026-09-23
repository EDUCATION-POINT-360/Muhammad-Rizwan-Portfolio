import { ProjectItem, EducationItem, JourneyStep, SkillCategory, InterestItem } from '../types';

export const PERSONAL_INFO = {
  name: "Muhammad Rizwan",
  title: "Founder • Educationist • Digital Architect",
  roles: [
    "Founder",
    "Digital Product Builder",
    "Education Technology Creator",
    "Digital Architect",
    "Web Developer"
  ],
  headline: "Founder • Educationist • Digital Architect",
  alternativePositioning: "Digital Product Builder | Founder | Education Technology Creator",
  location: "Mianwali, Pakistan",
  country: "Pakistan",
  motto: "Think Digital. Build Future.",
  secondaryMotto: "Learn • Create • Improve • Repeat",
  shortIntro: "I'm Muhammad Rizwan, a founder and digital product builder focused on creating useful, accessible and modern digital experiences across education, web applications and technology.",
  professionalBio: "Muhammad Rizwan is the Founder & Owner of Education Point and a digital creator focused on building practical technology-driven platforms. His work combines education, web development, digital product design and technology experimentation. He is particularly interested in turning ideas into usable digital products and creating technology that provides practical value to students and users.",
  founderStatement: "I believe technology becomes meaningful when it solves real problems. My focus is on turning ideas into practical digital products that people can actually use.",
  globalOpportunitiesStatement: "Open to relevant international opportunities and collaborations.",
  openStatus: "Open to International Opportunities",
  phone: "03314220506",
  phoneInternational: "+92 331 4220506",
  whatsappUrl: "https://wa.me/923314220506",
  email: "educationpoint0360@gmail.com",
  websiteUrl: "https://educationpoint360.netlify.app/",
  portfolioUrl: "https://rizwanep.netlify.app/",
  instagramUrl: "https://www.instagram.com/educ.ationpointofficial/",
  instagramHandle: "@educ.ationpointofficial",
  whatsappChannelUrl: "https://whatsapp.com/channel/0029Vb7bYUSJUM2eWSlWfo36",
  personalInstagram: "https://www.instagram.com/itx.wani1",
  personalInstagramHandle: "@itx.wani1",
  youtubeUrl: "https://youtube.com/@educationpoint998",
  youtubeHandle: "@educationpoint998",
  personalityDescription: "A self-directed digital builder motivated by creating useful platforms, practical systems, and empowering students through educational technology.",
  personalityTraits: [
    "Independent Builder",
    "Product-Minded",
    "Self-Directed Learner",
    "Clean Execution",
    "User-Centric",
    "Empathetic Problem Solver",
    "Consistent Experimenter",
    "Detail-Oriented",
    "Technology Enthusiast"
  ],
  digitalPhilosophyQuote: "Technology is most impactful when it bridges knowledge gaps and makes real daily utility accessible to everyday users."
};

export const QUICK_PROFILE = {
  education: "Intermediate in Computer Science (ICS)",
  secondary: "Matric (Computer Science) - 85%",
  location: "Mianwali, Pakistan"
};

export const GLOBAL_CAREER_AREAS = [
  {
    title: "Digital Product Development",
    desc: "Transforming user needs and real problems into structured, usable, end-to-end digital web products."
  },
  {
    title: "Web Development",
    desc: "Engineering responsive, performant, and cross-browser web interfaces with clean HTML, modern CSS, and JavaScript."
  },
  {
    title: "Education Technology",
    desc: "Designing academic repositories, student platforms, and digital resources that make learning accessible."
  },
  {
    title: "Frontend Development",
    desc: "Crafting fluid client-side experiences with high visual polish, semantic accessibility, and fast load times."
  },
  {
    title: "UI/UX-Focused Web Experiences",
    desc: "Structuring intuitive user journeys, clean layout hierarchies, micro-interactions, and refined typography."
  },
  {
    title: "Digital Platforms",
    desc: "Architecting multi-page portals, content delivery platforms, community spaces, and web utilities."
  },
  {
    title: "AI-Powered Products",
    desc: "Integrating intelligent API endpoints, prompt workflows, and AI assistants into practical user interfaces."
  },
  {
    title: "Remote Collaboration",
    desc: "Working asynchronously with international teams, remote employers, founders, and digital product squads."
  },
  {
    title: "Startup Environments",
    desc: "Building rapidly from idea to execution with an independent product builder mindset."
  },
  {
    title: "Technology Projects",
    desc: "Continuously exploring modern web frameworks, Progressive Web Apps (PWA), and emerging technology."
  }
];

export const FOUNDER_TIMELINE = [
  { step: "01", phase: "Idea", desc: "Identify real user friction or educational resource gap." },
  { step: "02", phase: "Design", desc: "Structure clean UI architecture and intuitive information hierarchy." },
  { step: "03", phase: "Build", desc: "Code responsive, fast, and accessible web experiences." },
  { step: "04", phase: "Improve", desc: "Refine performance, user feedback, and functional reliability." },
  { step: "05", phase: "Launch", desc: "Deploy publicly to empower students, users, and digital communities." }
];

export const FOUNDER_EXPERIENCE = [
  {
    role: "Founder & Owner",
    organization: "Education Point",
    period: "2024 – Present",
    location: "Mianwali, Pakistan / Remote",
    website: "https://educationpoint360.netlify.app/",
    description: "Conceived, architected, and continuously develop Education Point as a student-focused educational platform created to make academic resources organized and accessible.",
    focusAreas: [
      "Product development & platform architecture",
      "Educational platform management & curriculum structuring",
      "Digital content organization (Notes, MCQs, Past Papers, Schemes)",
      "Web platform development with responsive mobile-first performance",
      "Feature planning & user journey optimization",
      "Student-focused digital solutions and community engagement"
    ]
  }
];

export const EDUCATION_POINT_DETAILS = {
  title: "Building Education Point",
  role: "Founder & Owner",
  tagline: "Learn • Prepare • Succeed",
  statement: "Education Point is a student-focused educational platform created to make useful academic resources more accessible and organized.",
  websiteUrl: "https://educationpoint360.netlify.app/",
  schemeUrl: "https://educationpoint360.netlify.app/scheme",
  coreAreas: [
    "Matric",
    "Intermediate",
    "Entry Test Preparation",
    "Notes",
    "MCQs",
    "Past Papers",
    "Pairing Schemes",
    "Guess Papers",
    "Test Series",
    "Preparation Material"
  ],
  stats: [
    { label: "Target Classes", value: "9th, 10th, 11th, 12th" },
    { label: "Resource Types", value: "10 Core Academic Categories" },
    { label: "Mission", value: "Equitable Student Access" },
    { label: "Access Model", value: "Free & Open Digital Portal" }
  ]
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "education-point",
    number: "01",
    title: "Education Point",
    category: "Education Technology / EdTech",
    description: "An education platform focused on providing students with structured academic resources, notes, preparation material, MCQs, past papers, pairing schemes, tests and other learning resources.",
    theme: "EdTech • Comprehensive Student Resources",
    url: "https://educationpoint360.netlify.app/",
    demoUrl: "https://educationpoint360.netlify.app/",
    buttonLabel: "Visit Education Point →",
    role: "Founder & Product Builder",
    problem: "Pakistani secondary and higher secondary students (Matric & Intermediate) routinely suffer from fragmented study materials, outdated question papers, and inaccurate pairing schemes scattered across unverified blogs.",
    concept: "A centralized, zero-clutter digital repository providing structured, up-to-date academic resources categorized strictly by grade, subject, and exam cycle.",
    solution: "Engineered Education Point with direct access to Notes, MCQs, Past Papers, Guess Papers, Pairing Schemes, and Test Series with lightning-fast mobile loading.",
    keyFeatures: [
      "Structured grade-level categorization (9th–12th Classes)",
      "Curated Punjab board pairing schemes and guess papers",
      "Comprehensive test series & MCQ banks",
      "Lightweight, mobile-responsive layout for quick exam revision"
    ],
    outcome: "Built from scratch into an active digital academic hub relied upon by students for exam preparation.",
    tags: ["HTML5", "CSS3", "JavaScript", "EdTech", "Curriculum Architecture", "Responsive Web"],
    featured: true
  },
  {
    id: "ep-ai",
    number: "02",
    title: "Education Point AI",
    category: "AI / Education Technology",
    description: "An AI-focused educational product designed to explore intelligent assistance and student-focused digital learning experiences.",
    theme: "AI Technology • Smart Tutoring Concept",
    url: "https://edupointai.netlify.app/",
    demoUrl: "https://edupointai.netlify.app/",
    buttonLabel: "Explore Education Point AI →",
    role: "Product Concept & AI Integration",
    problem: "Students frequently need instant clarifications on academic topics outside classroom hours when private tutors are unavailable or unaffordable.",
    concept: "An accessible AI-powered learning companion that provides structured explanations, concept breakdowns, and study guidance on demand.",
    solution: "Developed an interactive web application connecting users to conversational AI models fine-tuned with student-centric prompt workflows.",
    keyFeatures: [
      "Instant academic explanation interface",
      "Interactive concept summaries and Q&A",
      "Minimalist, zero-distraction chat view",
      "Optimized for mobile-first student access"
    ],
    outcome: "Successfully launched digital prototype demonstrating how modern AI APIs can provide real utility in everyday student learning.",
    tags: ["AI Web App", "AI API Integration", "EdTech", "Prompt Engineering", "JavaScript"],
    featured: true
  },
  {
    id: "ep-courses",
    number: "03",
    title: "Education Point Courses",
    category: "Education / Online Learning",
    description: "A digital learning platform focused on structured courses, practical knowledge modules, and digital skill development.",
    theme: "Courseware • Modular Skill Acquisition",
    url: "https://epcourse.netlify.app/",
    demoUrl: "https://epcourse.netlify.app/",
    buttonLabel: "View Courses →",
    role: "Product Architect & Web Developer",
    problem: "Ambitious students often lack free, accessible avenues to learn practical digital skills and foundational technologies alongside traditional school curricula.",
    concept: "A clean, modular course repository structured into intuitive learning tracks, topic outlines, and clear lesson roadmaps.",
    solution: "Designed and built an e-learning catalog focusing on clear typography, structured lesson cards, and frictionless course navigation.",
    keyFeatures: [
      "Modular course catalog with clear lesson hierarchy",
      "Self-paced learning guides and practical topic outlines",
      "Readable typography designed for long study sessions",
      "Zero paywalls or complex sign-up hurdles"
    ],
    outcome: "Expanded Education Point's digital ecosystem from test prep into progressive skill development.",
    tags: ["Online Learning", "Course Directory", "Modular UI", "Responsive Web"],
    featured: true
  },
  {
    id: "soulbook",
    number: "04",
    title: "SoulBook",
    category: "Social / Digital Platform",
    description: "A social-platform concept focused on creating a modern digital space for user interaction and content sharing.",
    theme: "Social Platform Architecture • User Interaction",
    url: "https://soulbook.netlify.app/",
    demoUrl: "https://soulbook.netlify.app/",
    buttonLabel: "Explore SoulBook →",
    role: "Concept Creator & Frontend Architect",
    problem: "Mainstream social platforms have become cluttered with advertising, complex tracking algorithms, and noisy interfaces that detract from personal sharing.",
    concept: "A refined social platform prototype showcasing essential social mechanics—profiles, interactive feeds, reactions, comments, and notifications—in a clean visual framework.",
    solution: "Built a reactive frontend application implementing client-side state for post creation, feed rendering, user following, and notification events.",
    keyFeatures: [
      "User profile management and biography cards",
      "Interactive feed with post authoring and media embeds",
      "Dynamic like reactions and nested commentary",
      "Follower / following relationships and notification feed"
    ],
    outcome: "Created a comprehensive social product prototype validating UI architecture and user state management.",
    tags: ["Social Engine", "Interactive State", "User Feeds", "JavaScript", "CSS Architecture"],
    featured: true
  },
  {
    id: "nur-islamic",
    number: "05",
    title: "NUR Islamic",
    category: "Islamic Technology / PWA",
    description: "A digital Islamic platform bringing together Quran, Hadith, prayer-related tools, adhkar and other faith-oriented resources in a modern web experience.",
    theme: "Islamic Technology • Spiritual Utility & PWA",
    url: "https://nurislamic.netlify.app/",
    demoUrl: "https://nurislamic.netlify.app/",
    buttonLabel: "Visit NUR Islamic →",
    role: "Sole Architect, Designer & Developer",
    problem: "Many online Islamic tools are burdened with pop-up ads, clunky navigation, or require bulky app store downloads that consume device storage.",
    concept: "A serene, respectful, ad-free Progressive Web App combining verified Islamic scripture, prayer tools, and daily remembrances in one fast interface.",
    solution: "Engineered a Progressive Web App (PWA) with installable home-screen support, offline service workers, Holy Quran recitations, Authentic Hadith collections, and a responsive digital Tasbeeh counter.",
    keyFeatures: [
      "Holy Quran text reading and audio recitations",
      "Authentic Hadith collections organized by topic",
      "Accurate prayer time indicators and Qibla utility",
      "Digital Tasbeeh counter with haptic feedback support",
      "Daily morning & evening Adhkar supplications"
    ],
    outcome: "Delivered a lightweight, ad-free PWA providing daily spiritual utility to users across mobile and desktop devices.",
    tags: ["Progressive Web App (PWA)", "Quran & Hadith", "Digital Tasbeeh", "Offline PWA", "Faith Tech"],
    featured: true
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Digital Product Development",
    skills: [
      "Product Concept Development",
      "Web Platform Development",
      "Digital Project Architecture",
      "Feature Planning",
      "User-focused Product Design"
    ]
  },
  {
    category: "Web Technologies",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Web Design",
      "Progressive Web Apps",
      "API Integration"
    ]
  },
  {
    category: "Platforms & Tools",
    skills: [
      "Supabase",
      "GitHub",
      "Netlify",
      "Google Drive integrations",
      "REST APIs",
      "OpenRouter / AI APIs"
    ]
  },
  {
    category: "AI & Emerging Technology",
    skills: [
      "AI-powered web applications",
      "AI API integration",
      "AI product experimentation",
      "Prompt engineering",
      "AI-assisted product development"
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Intermediate in Computer Science (ICS)",
    field: "Computer Science, Mathematics & Physics Fundamentals",
    percentage: 70,
    period: "Higher Secondary Certificate",
    description: "Focused on core computing logic, algorithmic thinking, mathematics, physics, and digital problem solving."
  },
  {
    degree: "Secondary School Certificate (Matric)",
    field: "Computer Science Foundation",
    percentage: 85,
    period: "Secondary School Certificate",
    description: "Built an early academic foundation in computers, information technology, mathematics, and programming logic."
  }
];

export const LANGUAGES_DATA = [
  { language: "English", level: "Professional Working Proficiency" },
  { language: "Urdu", level: "Native / Bilingual" }
];

export const CERTIFICATIONS_NOTE = "Certifications will be added as verified credentials become available.";

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: "01",
    title: "CURIOSITY",
    tagline: "The Spark of Discovery",
    description: "Started exploring computers, websites, and the fundamentals of digital technology."
  },
  {
    step: "02",
    title: "SELF LEARNING",
    tagline: "Independent Growth",
    description: "Developed web development and design skills through self-directed research, coding, and continuous experimentation."
  },
  {
    step: "03",
    title: "WEB CREATION",
    tagline: "From Idea to Screen",
    description: "Began building real web pages, exploring frontend interfaces, and understanding user accessibility."
  },
  {
    step: "04",
    title: "EDUCATION POINT",
    tagline: "Serving the Student Community",
    description: "Founded Education Point to organize academic materials and solve real study access problems for students."
  },
  {
    step: "05",
    title: "DIGITAL PRODUCTS",
    tagline: "Expanding Horizons",
    description: "Expanded into AI tutoring experiments, social platform architecture, e-learning courses, and faith-based PWAs."
  },
  {
    step: "06",
    title: "CONTINUOUS BUILDING",
    tagline: "The Future in Motion",
    description: "Continuously refining technical capability, learning modern web standards, and building practical digital products."
  }
];

export const INTERESTS_DATA: InterestItem[] = [
  {
    id: "tech",
    title: "Digital Product Architecture",
    category: "Core Discipline",
    description: "Architecting end-to-end digital experiences from initial problem discovery to public deployment.",
    iconName: "Cpu"
  },
  {
    id: "web-dev",
    title: "Modern Web Engineering",
    category: "Engineering",
    description: "Creating responsive, fast, and accessible web experiences with clean code and modern standards.",
    iconName: "Code2"
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    category: "Emerging Tech",
    description: "Exploring AI APIs, prompt workflows, and practical automated assistance for education and productivity.",
    iconName: "Sparkles"
  },
  {
    id: "edtech",
    title: "Education Technology",
    category: "Social Impact",
    description: "Combining web technology with academic curation to make quality study materials accessible to every student.",
    iconName: "GraduationCap"
  },
  {
    id: "design",
    title: "UI/UX & Visual Architecture",
    category: "Aesthetics",
    description: "Crafting clean layouts, intuitive typography, micro-interactions, and uncluttered design hierarchies.",
    iconName: "Palette"
  },
  {
    id: "communities",
    title: "Digital Communities",
    category: "Engagement",
    description: "Fostering engaged student channels, peer knowledge sharing, and online collaborative spaces.",
    iconName: "Users"
  }
];
