/**
 * OpenContracts Design Tokens
 *
 * Core design values for the component library.
 * CSS custom properties are defined in tokens.css
 */

export interface ColorScale {
  accent: string;
  accentHover: string;
  accentActive: string;
  fgPrimary: string;
  fgSecondary: string;
  fgTertiary: string;
  fgInverse: string;
  bgCanvas: string;
  bgSurface: string;
  bgSurfaceHover: string;
  bgSidebar: string;
  borderDefault: string;
  borderStrong: string;
  success: string;
  warning: string;
  error: string;
  successBg: string;
  warningBg: string;
  errorBg: string;
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface RadiusScale {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

export interface ShadowScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner: string;
  accent: string;
  accentLg: string;
}

export interface FontSizeScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface AnimationScale {
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
  durationSpin: string;
  easingDefault: string;
  easingEnter: string;
  easingExit: string;
  easingSpring: string;
}

export interface ZIndexScale {
  dropdown: string;
  sticky: string;
  overlay: string;
  modal: string;
  popover: string;
  tooltip: string;
}

export interface OpacityScale {
  disabled: string;
  loading: string;
  hover: string;
  focusRing: string;
  overlay: string;
}

export interface LineHeightScale {
  tight: string;
  normal: string;
  relaxed: string;
}

export interface BreakpointScale {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Tokens {
  colors: ColorScale;
  spacing: SpacingScale;
  radius: RadiusScale;
  shadows: ShadowScale;
  fontSizes: FontSizeScale;
  animation: AnimationScale;
  zIndex: ZIndexScale;
  opacity: OpacityScale;
  lineHeight: LineHeightScale;
  breakpoints: BreakpointScale;
}

export const tokens: Tokens = {
  colors: {
    // Accent: Deep Teal (professional, legal-focused)
    accent: '#0F766E',
    accentHover: '#0D9488',
    accentActive: '#115E59',
    // Foreground: Slate scale
    fgPrimary: '#1E293B',
    fgSecondary: '#475569',
    fgTertiary: '#94A3B8',
    fgInverse: '#FFFFFF',
    // Background: Warm neutral surfaces
    bgCanvas: '#FAFAFA',
    bgSurface: '#FFFFFF',
    bgSurfaceHover: '#F8FAFC',
    bgSidebar: '#0F172A',
    // Borders: Cool slate
    borderDefault: '#E2E8F0',
    borderStrong: '#CBD5E1',
    // Semantic colors
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
    successBg: '#ECFDF5',
    warningBg: '#FFFBEB',
    errorBg: '#FEF2F2',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  radius: {
    // Refined, slightly softer corners
    sm: '6px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  shadows: {
    // Subtle, clean shadows
    sm: '0 1px 2px rgba(15, 23, 42, 0.04)',
    md: '0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 6px rgba(15, 23, 42, 0.03)',
    lg: '0 4px 6px rgba(15, 23, 42, 0.05), 0 10px 15px rgba(15, 23, 42, 0.04)',
    xl: '0 8px 16px rgba(15, 23, 42, 0.06), 0 20px 25px rgba(15, 23, 42, 0.05)',
    inner: 'inset 0 1px 2px rgba(15, 23, 42, 0.03)',
    // Accent shadows for primary elements (deep teal)
    accent: '0 4px 14px rgba(15, 118, 110, 0.2)',
    accentLg: '0 8px 24px rgba(15, 118, 110, 0.25)',
  },
  fontSizes: {
    // Slightly tighter scale for refined typography
    xs: '11px',
    sm: '13px',
    md: '15px',
    lg: '17px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },
  animation: {
    durationFast: '0.15s',
    durationNormal: '0.2s',
    durationSlow: '0.3s',
    durationSpin: '0.8s',
    easingDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easingEnter: 'cubic-bezier(0, 0, 0.2, 1)',
    easingExit: 'cubic-bezier(0.4, 0, 1, 1)',
    easingSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  zIndex: {
    dropdown: '100',
    sticky: '200',
    overlay: '300',
    modal: '400',
    popover: '500',
    tooltip: '600',
  },
  opacity: {
    disabled: '0.5',
    loading: '0.7',
    hover: '0.04',
    focusRing: '0.2',
    overlay: '0.6',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};
