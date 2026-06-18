# UX Implementation Plan: Think Green Tanzania

This plan outlines a phased approach to implementing the recommended UI/UX improvements.

## Phase 1: Foundation & Consistency (Quick Wins)
*Goal: Fix broken styles and standardize shared components.*

1.  **Shared JavaScript:** Create `js/main.js` and move `toggleMenu` and other shared logic there. Update all HTML files to reference it.
2.  **CSS Cleanup:** 
    *   Audit `style.css` and add missing utility classes used in `about.html` or refactor `about.html` to use existing classes.
    *   Standardize the dark-mode color variables.
3.  **Navigation Fixes:** 
    *   Implement a consistent mobile menu with smooth transitions.
    *   Improve the "active" state in the navigation.
4.  **Accessibility (A11y) Check:** 
    *   Fix the "Skip to content" link.
    *   Verify `alt` tags on all key images.

## Phase 2: Homepage Revamp
*Goal: Transform the landing page into a comprehensive story.*

1.  **Impact Section:** Add a "By the Numbers" section with animated metrics (if possible, or just styled numbers).
2.  **Featured Programs:** Create a grid of cards highlighting the top 3 programs.
3.  **About Teaser:** Add a brief "Our Story" section with a link to the full About page.
4.  **CTA & Contact:** Add a prominent "Join the Movement" section before the footer.

## Phase 3: Page-Specific Refinement
*Goal: Enhance the depth and visual appeal of internal pages.*

1.  **About Page Overhaul:** 
    *   Apply the dark-mode design system.
    *   Use the "cards" or "split" layout patterns from `style.css` to break up text.
    *   Replace placeholder team members with real content or better styled placeholders.
2.  **Programs Page:** 
    *   Add more detailed descriptions or links to specific program details.
    *   Ensure all images have consistent aspect ratios.
3.  **Gallery & Blog:** 
    *   Improve loading states with simple placeholders.
    *   Add a "filter" or "search" if content grows significantly (future-proofing).

## Phase 4: Polish & Performance
*Goal: Add the "extra 10%" that makes the site feel premium.*

1.  **Micro-interactions:** 
    *   Hover effects on all interactive elements (buttons, cards, links).
    *   Entrance animations (fade-in, slide-up) on scroll.
2.  **Performance Optimization:** 
    *   Compress and convert images to WebP.
    *   Minify CSS and JS (for production).
3.  **SEO Final Pass:** 
    *   Review all meta tags.
    *   Generate/verify `sitemap.xml` and `robots.txt`.

## Phase 5: Testing & Feedback
*Goal: Ensure quality across devices.*

1.  **Cross-Device Testing:** Verify layout and functionality on mobile, tablet, and desktop.
2.  **Performance Audit:** Use Lighthouse to identify remaining bottlenecks.
3.  **User Feedback:** (Optional) Share with a small group for qualitative feedback on navigation and content clarity.
