// Color utility classes that can be imported by components
// These correspond to the colors defined in tailwind.config.ts

export const colors = {
  // Primary brand colors
  primary: {
    icon: "text-primary-500",
    bg: "bg-primary-500",
    border: "border-primary-500",
    hover: "hover:bg-primary-600",
    light: "bg-primary-50",
    gradient: "bg-gradient-primary",
  },
  
  // Secondary colors
  secondary: {
    icon: "text-secondary-500",
    bg: "bg-secondary-500",
    border: "border-secondary-500",
    hover: "hover:bg-secondary-600",
    light: "bg-secondary-50",
    gradient: "bg-gradient-secondary",
  },
  
  // Accent colors
  accent: {
    icon: "text-accent-500",
    bg: "bg-accent-500",
    border: "border-accent-500",
    hover: "hover:bg-accent-600",
    light: "bg-accent-50",
    gradient: "bg-gradient-accent",
  },
  
  // Success colors
  success: {
    icon: "text-success-500",
    bg: "bg-success-500",
    border: "border-success-500",
    hover: "hover:bg-success-600",
    light: "bg-success-50",
    text: "text-success-700",
  },
  
  // Warning colors
  warning: {
    icon: "text-warning-500",
    bg: "bg-warning-500",
    border: "border-warning-500",
    hover: "hover:bg-warning-600",
    light: "bg-warning-50",
    text: "text-warning-700",
  },
  
  // Error colors
  error: {
    icon: "text-error-500",
    bg: "bg-error-500",
    border: "border-error-500",
    hover: "hover:bg-error-600",
    light: "bg-error-50",
    text: "text-error-700",
  },
  
  // Neutral colors
  neutral: {
    icon: "text-neutral-500",
    bg: "bg-neutral-500",
    border: "border-neutral-500",
    hover: "hover:bg-neutral-600",
    light: "bg-neutral-50",
    text: "text-neutral-700",
  },
  
  // Background colors
  background: {
    primary: "bg-background-primary",
    secondary: "bg-background-secondary",
    white: "bg-background-white",
    card: "bg-background-card",
    overlay: "bg-background-overlay",
  },
  
  // Text colors
  text: {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    muted: "text-text-muted",
    inverse: "text-text-inverse",
    link: "text-text-link",
  },
  
  // Border colors
  border: {
    light: "border-border-light",
    default: "border-border-default",
    dark: "border-border-dark",
  },
  
  // Status colors
  status: {
    online: "bg-status-online",
    offline: "bg-status-offline",
    busy: "bg-status-busy",
    away: "bg-status-away",
  },
  
  // Common combinations
  common: {
    card: "bg-background-card border-border-default",
    button: "bg-primary-500 hover:bg-primary-600 text-text-inverse",
    buttonSecondary: "bg-neutral-100 hover:bg-neutral-200 text-text-primary",
    input: "bg-background-white border-border-default focus:border-primary-500",
  }
};

// Component-specific color schemes
export const componentColors = {
  // Dashboard header
  header: {
    gradient: "bg-gradient-primary",
    text: "text-text-inverse",
    button: "bg-background-white hover:bg-neutral-50 text-text-primary",
  },
  
  // Cards
  card: {
    background: "bg-background-card",
    border: "border-border-default",
    shadow: "shadow-soft",
    hover: "hover:shadow-medium",
  },
  
  // Buttons
  button: {
    primary: "bg-primary-500 hover:bg-primary-600 text-text-inverse",
    secondary: "bg-neutral-100 hover:bg-neutral-200 text-text-primary",
    ghost: "hover:bg-neutral-50 text-text-primary",
    danger: "bg-error-500 hover:bg-error-600 text-text-inverse",
  },
  
  // Status indicators
  status: {
    completed: "bg-success-100 text-success-700",
    inProgress: "bg-accent-100 text-accent-700",
    pending: "bg-warning-100 text-warning-700",
    error: "bg-error-100 text-error-700",
  },
  
  // Progress bars
  progress: {
    background: "bg-neutral-200",
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    accent: "bg-accent-500",
    success: "bg-success-500",
  }
};

// Export individual color values for use in style objects
export const colorValues = {
  primary: {
    50: '#F5F6FF',
    100: '#E8E7FF',
    200: '#D1CFFF',
    300: '#B3A7FF',
    400: '#8B7FE8',
    500: '#736FC3',
    600: '#5B5FC7',
    700: '#4A4A9C',
    800: '#3A3A7A',
    900: '#2A2A58',
  },
  secondary: {
    50: '#FFF5F0',
    100: '#FCD2AC',
    200: '#FDA95E',
    300: '#F7931E',
    400: '#E67E00',
    500: '#CC6B00',
    600: '#B35900',
    700: '#994700',
    800: '#7A3800',
    900: '#5C2900',
  },
  accent: {
    50: '#F0FFFD',
    100: '#DCF2FA',
    200: '#ACEDEE',
    300: '#2BD3D1',
    400: '#34D1CB',
    500: '#2BB8B3',
    600: '#229F9A',
    700: '#1A8681',
    800: '#116D68',
    900: '#08544F',
  },
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  neutral: {
    50: '#FAF9FE',
    100: '#F0EFF6',
    200: '#E5E4EB',
    300: '#D1D0D7',
    400: '#A3A2A9',
    500: '#73727A',
    600: '#52515A',
    700: '#3F3E47',
    800: '#2A2933',
    900: '#1A1920',
  }
};
