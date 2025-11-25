export interface ExperienceItem {
  id: number;
  company: string;
  description: string;
  role: string;
  period: string;
  link: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string; // Used for grid view or fallback
  // Optional fields for detailed view
  year?: string;
  role_detail?: string;
  team?: string;
  tags?: string;
  subtitle?: string;
}