export const theme = {
  colors: {
    primary: '#6366F1', // Indigo
    primaryLight: '#818CF8',
    accent: '#10B981', // Emerald
    
    backgroundDark: '#090D16',
    surfaceDark: '#131B2E',
    borderDark: '#1E293B',
    textDark: '#F8FAFC',
    textSecondaryDark: '#94A3B8',
    
    backgroundLight: '#F8FAFC',
    surfaceLight: '#FFFFFF',
    borderLight: '#E2E8F0',
    textLight: '#0F172A',
    textSecondaryLight: '#64748B'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    full: 9999
  }
} as const;