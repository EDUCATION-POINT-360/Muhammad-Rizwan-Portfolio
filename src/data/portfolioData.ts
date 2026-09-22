import { ProjectItem, EducationItem, JourneyStep, SkillCategory, InterestItem } from '../types';

export const PERSONAL_INFO = {
  name: "Muhammad Rizwan",
  title: "Founder • Educationist • Digital Architect",
  roles: ["Founder", "Educationist", "Digital Architect", "Web Developer", "Digital Innovator"],
  location: "Mianwali, Pakistan",
  country: "Pakistan",
  motto: "Think Digital. Build Future.",
  secondaryMotto: "Learn • Create • Improve • Repeat",
  phone: "+92 331 4220506",
  whatsappUrl: "https://wa.me/923314220506",
  personalInstagram: "https://www.instagram.com/itx.wani1",
  personalInstagramHandle: "@itx.wani1",
  epInstagram: "https://www.instagram.com/educ.ationpointofficial/",
  epInstagramHandle: "@educ.ationpointofficial",
  facebookUrl: "https://www.facebook.com/share/1C3r1Jy8QH/",
  youtubeUrl: "https://youtube.com/@educationpoint998",
  youtubeHandle: "@educationpoint998",
  epWhatsappChannel: "https://whatsapp.com/channel/0029Vb7bYUSJUM2eWSlWfo36",
  epEmail: "educationpoint0360@gmail.com",
  portfolioUrl: "https://rizwanep.netlify.app/",
  heroSupportingText: "Technology enthusiast, educationist, web creator and digital innovator building meaningful digital experiences through web development, AI, education technology and creative digital products.",
  aboutLargeStatement: "I don't just use technology. I build with it.",
  aboutBios: [
    "My name is Muhammad Rizwan. I am a technology enthusiast, educationist, web creator and digital innovator with a strong interest in building useful digital platforms and learning experiences.",
    "I enjoy exploring technology, creating websites, experimenting with modern web interfaces, learning new digital skills and turning ideas into real projects.",
    "I believe that technology should not only look modern but should also solve real problems and make information easier to access."
  ],
  areasOfInterest: [
    "Web Development",
    "UI/UX Design",
    "Artificial Intelligence",
    "Educational Technology",
    "Digital Communities",
    "Creative Digital Projects"
  ],
  personalityStatement: "QUIET. CREATIVE. CURIOUS.",
  personalityDescription: "I prefer observing, learning and building rather than constantly talking about what I want to achieve. I enjoy working independently, exploring new ideas and turning concepts into something real.",
  personalityTraits: [
    "Curious",
    "Creative",
    "Independent",
    "Technology-Oriented",
    "Learner",
    "Calm",
    "Observant",
    "Innovative",
    "Consistent"
  ],
  digitalPhilosophyQuote: "My goal is not simply to create websites, but to create useful digital experiences that people can actually use."
};

export const QUICK_PROFILE = [
  { label: "NAME", value: "Muhammad Rizwan" },
  { label: "ROLE", value: "Founder • Educationist • Digital Architect" },
  { label: "LOCATION", value: "Mianwali, Pakistan" },
  { label: "EDUCATION", value: "Matric (CS) • Intermediate (ICS)" },
  { label: "MATRIC RESULT", value: "85%", highlight: true },
  { label: "INTER RESULT", value: "70%", highlight: true },
  { label: "FOCUS", value: "Technology • Education • Digital Innovation" }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "MATRIC",
    field: "Computer Science",
    percentage: 85,
    period: "Secondary School Certificate",
    description: "Built an early foundation in computers, technology and digital concepts."
  },
  {
    degree: "INTERMEDIATE",
    field: "ICS (Intermediate in Computer Science)",
    percentage: 70,
    period: "Higher Secondary Certificate",
    description: "Continued developing interest in computing, technology and digital problem-solving."
  }
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: "01",
    title: "CURIOSITY",
    tagline: "The Spark of Discovery",
    description: "Started exploring computers, websites and digital technology."
  },
  {
    step: "02",
    title: "SELF LEARNING",
    tagline: "Independent Growth",
    description: "Developed skills through experimentation, online learning and practical work."
  },
  {
    step: "03",
    title: "WEB CREATION",
    tagline: "From Idea to Screen",
    description: "Started building websites and experimenting with modern interfaces."
  },
  {
    step: "04",
    title: "EDUCATION POINT",
    tagline: "Serving the Community",
    description: "Created Education Point as a student-focused educational platform."
  },
  {
    step: "05",
    title: "DIGITAL PRODUCTS",
    tagline: "Expanding Horizons",
    description: "Expanded into AI, social platforms, Islamic technology and creative web projects."
  },
  {
    step: "06",
    title: "CONTINUOUS BUILDING",
    tagline: "The Future in Motion",
    description: "Continuing to learn, experiment and build new digital experiences."
  }
];

export const EDUCATION_POINT_DETAILS = {
  title: "EDUCATION POINT",
  role: "Founder & Owner",
  tagline: "Learn • Prepare • Succeed",
  description: "Education Point is a student-focused educational platform created to make academic resources easier to access.",
  websiteUrl: "https://educationpoint360.netlify.app/",
  schemeUrl: "https://educationpoint360.netlify.app/scheme",
  resources: [
    "Notes",
    "MCQs",
    "Past Papers",
    "Guess Papers",
    "Pairing Schemes",
    "Test Series",
    "Entry Test Preparation",
    "Student Resources",
    "Educational Communities",
    "Class 9th–12th Resources"
  ],
  stats: [
    { label: "Focus Classes", value: "9th - 12th" },
    { label: "Core Categories", value: "10+ Resource Types" },
    { label: "Community", value: "Student-Centered" },
    { label: "Access Model", value: "Open & Free" }
  ]
};

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "education-point",
    number: "01",
    title: "EDUCATION POINT",
    category: "Education Technology",
    description: "Student-focused educational platform created to simplify access to high-yield academic study material, paper schemes, and test resources.",
    theme: "EdTech • Comprehensive Student Resources",
    url: "https://educationpoint360.netlify.app/",
    buttonLabel: "Visit Project ↗",
    tags: ["HTML5", "CSS3", "JavaScript", "EdTech", "Curriculum Resources"],
    featured: true
  },
  {
    id: "ep-ai",
    number: "02",
    title: "EP AI",
    category: "Artificial Intelligence / Education",
    description: "AI-focused educational assistant and digital learning project engineered to provide intelligent guidance and automated student support.",
    theme: "AI Technology • Smart Tutoring Concept",
    url: "https://edupointai.netlify.app/",
    buttonLabel: "Explore EP AI ↗",
    tags: ["Artificial Intelligence", "Smart Assistant", "Web App", "EdTech"]
  },
  {
    id: "ep-courses",
    number: "03",
    title: "EDUCATION POINT COURSES",
    category: "EdTech / Courses",
    description: "Digital learning platform focused on structured courses, practical knowledge modules, and modern skill development for ambitious students.",
    theme: "Courseware • Skill Acquisition",
    url: "https://epcourse.netlify.app/",
    buttonLabel: "View Courses ↗",
    tags: ["Course Platform", "E-Learning", "Digital Skills", "Modular UI"]
  },
  {
    id: "soulbook",
    number: "04",
    title: "SOULBOOK",
    category: "Social Technology",
    description: "Modern social platform concept featuring user profiles, dynamic posts, interactive reactions, comments, followers, following, and notifications.",
    theme: "Social Network Architecture • User Interaction",
    url: "https://soulbook.netlify.app/",
    buttonLabel: "Explore SoulBook ↗",
    tags: ["Social Engine", "Interactive Feed", "Notifications", "Profiles"]
  },
  {
    id: "nur-islamic",
    number: "05",
    title: "NUR ISLAMIC",
    category: "Islamic Technology",
    description: "Islamic digital platform focused on Holy Quran, Authentic Hadith, prayer timings, daily Adhkar, digital Tasbeeh counter, and sacred resources.",
    theme: "Islamic Technology • Spiritual Utility",
    url: "https://nurislamic.netlify.app/",
    buttonLabel: "Visit NUR Islamic ↗",
    tags: ["Quran & Hadith", "Tasbeeh", "Prayer Times", "Sacred Tech"]
  },
  {
    id: "personal-portfolio",
    number: "06",
    title: "PERSONAL PORTFOLIO",
    category: "Digital Identity",
    description: "Personal digital identity and creative portfolio showcasing founder initiatives, technical capability, and educational architecture.",
    theme: "Editorial Minimalism • 2026 Web Experience",
    url: "https://rizwanep.netlify.app/",
    buttonLabel: "Current Identity ↗",
    tags: ["Minimalist Editorial", "Responsive Architecture", "3D Interactive"]
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "WEB DEVELOPMENT",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Web Design",
      "PWA Concepts"
    ]
  },
  {
    category: "UI/UX & DESIGN",
    skills: [
      "UI/UX Concepts",
      "Digital Design",
      "Modern Interfaces",
      "Website Animation",
      "Creative Direction"
    ]
  },
  {
    category: "TECHNOLOGY",
    skills: [
      "Artificial Intelligence",
      "Educational Technology",
      "Digital Products",
      "Web Technologies"
    ]
  },
  {
    category: "DIGITAL",
    skills: [
      "Digital Branding",
      "Social Media",
      "Community Building",
      "Content Presentation",
      "Basic Digital Marketing",
      "SMM"
    ]
  }
];

export const INTERESTS_DATA: InterestItem[] = [
  {
    id: "tech",
    title: "TECHNOLOGY",
    category: "Core Passion",
    description: "Computers, modern technology, software and digital innovation.",
    iconName: "Cpu"
  },
  {
    id: "web-dev",
    title: "WEB DEVELOPMENT",
    category: "Creation",
    description: "Creating websites and experimenting with modern interfaces.",
    iconName: "Code2"
  },
  {
    id: "ai",
    title: "ARTIFICIAL INTELLIGENCE",
    category: "Future Tech",
    description: "Exploring AI tools, AI assistants and AI-powered digital experiences.",
    iconName: "Sparkles"
  },
  {
    id: "books",
    title: "BOOK READING",
    category: "Intellect",
    description: "Reading books and exploring new ideas and perspectives.",
    iconName: "BookOpen"
  },
  {
    id: "gaming",
    title: "COMPUTER GAMING",
    category: "Interactive",
    description: "Computer gaming, interactive experiences and game technology.",
    iconName: "Gamepad2"
  },
  {
    id: "series",
    title: "WEB SERIES",
    category: "Storytelling",
    description: "Watching different types and genres of web series.",
    iconName: "Film"
  },
  {
    id: "design",
    title: "DIGITAL DESIGN",
    category: "Aesthetics",
    description: "Modern interfaces, animation, visual concepts and creative digital experiences.",
    iconName: "Palette"
  },
  {
    id: "cinematic",
    title: "CINEMATIC VISUALS",
    category: "Visual Arts",
    description: "Photography concepts, cinematic aesthetics, visual storytelling and 3D experiments.",
    iconName: "Camera"
  },
  {
    id: "anime",
    title: "ANIME / CREATIVE VISUALS",
    category: "Creative Expression",
    description: "Interest in anime-inspired aesthetics and creative visual experimentation.",
    iconName: "Wand2"
  },
  {
    id: "communities",
    title: "DIGITAL COMMUNITIES",
    category: "People & Network",
    description: "Social platforms, online communities and digital communication.",
    iconName: "Users"
  },
  {
    id: "edtech",
    title: "EDUCATION TECHNOLOGY",
    category: "Mission",
    description: "Combining technology with education to make learning more accessible.",
    iconName: "GraduationCap"
  }
];
