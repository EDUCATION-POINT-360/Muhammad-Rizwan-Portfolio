export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  theme: string;
  url: string;
  buttonLabel: string;
  tags: string[];
  featured?: boolean;
  role?: string;
  problem?: string;
  concept?: string;
  solution?: string;
  keyFeatures?: string[];
  outcome?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  percentage: number;
  description: string;
  period: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
  tagline: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface InterestItem {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  iconName: string;
  type: 'personal' | 'educationPoint';
}
