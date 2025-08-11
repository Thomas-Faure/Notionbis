import type { Config } from 'tailwindcss';

/*
 * Tailwind CSS configuration for this project.  In version 4 the
 * framework encourages a CSS‑first configuration using the
 * `@theme` rule, but for developers who prefer a TypeScript
 * configuration file the traditional approach remains fully
 * supported.  This file exports the configuration as both a named
 * constant and the default export, satisfying the user's desire
 * for explicit exports and type safety.  The `content` array tells
 * Tailwind where to look for classes to include in the generated
 * CSS.  Feel free to extend the `theme` as your project grows.
 */

export const tailwindConfig = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default tailwindConfig;
