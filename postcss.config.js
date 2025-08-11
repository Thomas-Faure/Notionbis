/*
 * This PostCSS configuration wires Tailwind CSS into your build.  It
 * intentionally avoids shorthand CLI flags and keeps the structure
 * simple.  The configuration exports a single object using CommonJS
 * syntax to maximise compatibility with Node.js.  Tailwind CSS
 * version 4 adopts a CSS-first approach, however using PostCSS
 * continues to be a valid integration path when you want to
 * customise the processing pipeline.  Autoprefixer ensures vendor
 * prefixes are added where needed.
 */

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
