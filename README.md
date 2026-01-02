# Product Carousel & Cart

## Tech stack

- **Vite + React + TypeScript**  
  The application is bootstrapped using the official Vite React TypeScript template for fast dev startup, modern bundling, and type safety.

- **Tailwind CSS** (+ `tailwindcss-animate` / utility-first approach)  
  Used as the main styling solution to build UI quickly and consistently with minimal custom CSS.

- **lucide-react**  
  Used as the icon pack for clean, tree-shakable SVG icons that integrate well with React and Tailwind.

- **Utility libraries**
  - `clsx` — for conditional and readable className composition
  - `gh-pages` — helper for easy deployment to GitHub Pages

---

## Technical decisions

**For this particular technical task considered enough to have:**

- A single `useReducer`-based cart state (wrapped with `useState`/Context)  
  This keeps cart logic centralized, predictable, and easy to reason about without introducing heavier state managers.

- Tailwind CSS as the primary styling tool  
  It provides speed and consistency for a small-to-medium task.  
  For better long-term maintainability and scalability, **CSS Modules can be used alongside Tailwind** for more complex or isolated components.

- A simple and flat folder structure  
  Instead of applying Feature-Sliced Design (FSD) or other layered architectures, a straightforward structure was chosen to reduce cognitive overhead and keep the project easy to navigate.

- Basic image and performance optimizations  
  Techniques like `loading="lazy"`, `fetchPriority`, and proper image sizing are applied to improve Web Vitals and perceived performance, especially on initial load.

---

## Notes

The focus of this project is **clarity, correctness, and UX** rather than over-engineering.  
All architectural and tooling decisions were made to match the scope of the task.

## Link to demo

[https://ivandenysenko.github.io/wmt-store/](https://ivandenysenko.github.io/wmt-store/)
