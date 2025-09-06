/* ===== BASE TYPES ===== */

export interface BaseComponentProps {
  className?: string;
  children?: any;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  style?: React.CSSProperties;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  background?: 'white' | 'gray' | 'primary' | 'secondary';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

/* ===== LANDING PAGE TYPES ===== */

export interface HeroSectionData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface FeatureData {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

/* ===== NAVIGATION TYPES ===== */

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  items: NavigationItem[];
  logo?: string;
  ctaText?: string;
  ctaLink?: string;
}

/* ===== RESOURCE TYPES ===== */
export * from './resources'; 