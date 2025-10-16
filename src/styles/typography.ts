// Font configuration for Poppins font family
// This file centralizes all font-related configurations

export const FontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
} as const;

export const FontFamily = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extraBold: 'Poppins-ExtraBold',
  black: 'Poppins-Black',
} as const;

// Typography scale based on common design patterns
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

// Pre-defined text styles for consistency
export const TextStyles = {
  // Headers
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes['4xl'],
    lineHeight: 44,
  },
  h2: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes['3xl'],
    lineHeight: 38,
  },
  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes['2xl'],
    lineHeight: 32,
  },
  h4: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.xl,
    lineHeight: 28,
  },

  // Body text
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.lg,
    lineHeight: 28,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.base,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },

  // Special text
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xs,
    lineHeight: 16,
  },
  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.base,
    lineHeight: 24,
  },
  buttonSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
} as const;

// Helper function to get font family by weight
export const getFontFamily = (weight: keyof typeof FontFamily): string => {
  return FontFamily[weight];
};

// Helper function to create text style with custom font weight
export const createTextStyle = (
  fontSize: number,
  fontWeight: keyof typeof FontFamily,
  lineHeight?: number,
  color?: string,
) => ({
  fontFamily: FontFamily[fontWeight],
  fontSize,
  lineHeight: lineHeight || fontSize * 1.5,
  ...(color && {color}),
});
