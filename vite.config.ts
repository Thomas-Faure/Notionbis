import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration using React and TypeScript.  The configuration
// exports a default function defined with a single argument (an
// options object) to satisfy the user's preference for a single
// parameter.  This function returns the Vite configuration and
// illustrates how to set up plugins without resorting to shorthand
// flags.  Tailwind CSS integration happens via PostCSS (see
// postcss.config.js).
export const getViteConfig = (/* no options yet */ {}: {}) => {
  return defineConfig({
    plugins: [react()],
    server: {
      open: true,
    },
  });
};

export default getViteConfig({});
