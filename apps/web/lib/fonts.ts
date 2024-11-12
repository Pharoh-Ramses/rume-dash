import { Quicksand } from 'next/font/google';

/**
 * @sans
 * @description Define here the sans font.
 * Using Quicksand from Google Fonts.
 */
const sans = Quicksand({
  subsets: ['latin'],
  variable: '--font-sans',
  fallback: ['system-ui', 'Helvetica Neue', 'Helvetica', 'Arial'],
  preload: true,
  // Quicksand available weights are 300, 400, 500, 600, 700
  weight: ['300', '400', '500', '600', '700'],
});

/**
 * @heading
 * @description Define here the heading font.
 */
const heading = sans;

// we export these fonts into the root layout
export { sans, heading };
