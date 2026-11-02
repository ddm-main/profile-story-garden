# Bring the "profile" portfolio into this project

The repository is a single-page cinematic portfolio (React + Tailwind, framer-motion, Lenis smooth scroll). It has no database, login or payments, so it's a straight copy and adapt job.

## What will be copied
- Sections: Header, Hero (with background video), About, Experience, Projects (scroll-stack cards), Skills, Contact, scroll progress bar, reveal text animations
- Styles from `index.css` and `ScrollStack.css`, plus fonts
- Public files: portraits, favicon, resume.pdf, hero video, robots.txt, sitemap.xml
- The insignia SVG asset

## Adaptation
- The single page goes on the home page (`/`), replacing the placeholder
- Page title, description and social tags move from `index.html` into the home page's head settings
- Add `framer-motion` and `lenis` packages
- Lenis smooth scroll and any window-dependent code start only in the browser, after the page loads
- The repo's `.env` file is ignored (nothing in it gets copied)

## Check
- Preview loads with no errors, all sections render, video and images show, resume link works, then a screenshot comparison with the original layout
