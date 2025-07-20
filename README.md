## Icon Array Visualization Project

This repository contains code for large-scale icon array visualization. The key idea is to create interactive visualizations using web technologies, then embed the resulting web pages (e.g. via `<iframe>`) into third-party platforms such as Qualtrics for survey integration.

---

## Development

- **Setup**

  - This project is built using TypeScript and React (Next.js). You'll need some basic tools installed before you can run or edit the code.
    - Node.js – JavaScript runtime that lets you run development tools. ([Download](https://nodejs.org/en/download))
    - VS Code – A powerful code editor (recommended). ([VS Code Download](https://code.visualstudio.com/download))
  - Once the tools above are installed, you can clone the repo and run the following command in the project's root directory to install the necessary dependencies.
    - `npm install`
  - To launch the project locally in your browser, run the command below - the default address is `http://localhost:3000/` for Next.js projects. You can open that link in your browser to see the app and begin development. As you make changes to the code, the page will automatically update.
    - `npm run dev`

- **Resources**
  - MDN Web Docs is a great starting point for learning the core languages of the web — HTML, CSS, and JavaScript.
    - [MDN Web Docs](https://developer.mozilla.org/en-US/)
  - TypeScript and Tailwind CSS are technologies used in this project that build on top of JavaScript and CSS, respectively. Their official documentation is helpful for understanding their syntax and features.
    - [TypeScript Documentation](https://www.typescriptlang.org/)
    - [Tailwind Documentation](https://tailwindcss.com/)
  - React.js and Next.js are modern frontend frameworks that make building complex user interfaces easier. They build on the foundations of HTML, CSS, and JavaScript, and are widely used in the industry. Because of their popularity, they have extensive documentation, strong community support, and many beginner-friendly tutorials. I would recommend watching some YouTube beginner tutorials on them when just getting started.
    - [React.js Documentation](https://react.dev/)
    - [Next.js Documentation](https://nextjs.org/docs)

---

## Project Structure

Next.js uses [file-system based routing](https://nextjs.org/docs/app/getting-started/layouts-and-pages), where each `page.tsx` file inside the app directory corresponds to a specific route on the website. I recommend starting at the homepage `http://localhost:3000/` and navigating through the site to explore how each page looks. As you browse, you can refer to the URL path to locate the corresponding code in the project and better understand how the routing structure is organized.

The structure below covers the major source code areas and their purposes:

```
icon-array-studies/
│
├── app/                          # Main application source
│   ├── layout.tsx                # App-wide layout and wrapper
│   ├── page.tsx                  # Home page
│   ├── archive/                  # Legacy & experimental visualizations
│   │   ├── iconarray/            # Interactive icon array generator (prototype idea)
│   │   │   └── page.tsx
│   │   ├── first/                # Visualization for 'start' icon array (Uses row virtualization)
│   │   │   └── page.tsx
│   │   ├── mid/                  # Visualization for 'middle' icon array (Uses row virtualization)
│   │   │   └── page.tsx
│   │   ├── last/                 # Visualization for 'end' icon array (Uses row virtualization)
│   │   |   └── page.tsx
│   │   └── zoom/                 # Visualization for 'zoom' icon array (Does not zoom out completely)
│   │       └── page.tsx
│   ├── view/[arrayId]/           # Dynamic route for viewing a specific icon array by encoded ID
│   │   └── page.tsx
│   ├── gradient                  # Control gradient page
│   │   └── page.tsx
│   ├── video                     # Video page
│   │   └── page.tsx
│   └── ...                       # Other app-specific routes or pages
│
├── components/                   # Shared and custom React components
│   ├── custom/                   # UI components for building the home page of the website
│   │   ├── MainPanel.tsx
│   │   ├── SubPanel.tsx
│   │   ├── Panels.tsx
│   │   └── ...
│   ├── icon-array.tsx            # Scroll icon arrays component (core visualization)
│   ├── zoom-canvas.tsx           # Zoom icon arrays component (core visualization)
│   ├── zoom-video.tsx            # Video viewer component (core visualization)
│   └── scroll-listener.tsx       # Listener for informing Qualtrics when user finished scrolling
│
├── data/
│   └── arrays.ts                 # Predefined icon array configurations
│
├── types/
│   └── types.ts                  # TypeScript interfaces for icon arrays and points
│
├── utils/
│   ├── hashId.ts                 # Utilities for encoding/decoding array IDs
│   └── ...                       # Other helpers/utilities
│
└── ... (other config and support files)
```

---

## How to Navigate and Extend

- **Review the Data Model**
  - Start with `types/types.ts` to understand how icon arrays and points are currently defined.
- **Explore Predefined Arrays**
  - Look in `data/arrays.ts` for a list of the created icon arrays.
- **Visualize Arrays**
  - Use `/view/[arrayId]` to view the created icon arrays.
- **Add/Modify Visualizations**
  - Modify `icon-array.tsx` and `zoom-array.tsx` to customize rendering strategies for scroll and zoom arrays.
- **Extend Data Model**
  - Add new fields to `IconArray` as needed for new features (e.g., color, label, zoom).

---

## Example: Creating a New Icon Array

1. Add a new object in `data/arrays.ts`:
   ```typescript
   {
     id: 5,
     name: "Custom Example",
     rows: 5000,
     cols: 100,
     remainder: 0,
     total: 500000,
     highlightCount: 10,
     highlightPoints: [{ row: 0, col: 0 }, ...],
     zoom: false,
   }
   ```
2. Use the home page UI panel or navigate to `/view/[arrayId]` with the correct encoded ID to visualize.

---

## Deploying

The easiest way to deploy a Next.js app is to use the Vercel Platform from the creators of Next.js. However, [GitHub Pages](https://pages.github.com/) is sufficient for purposes of this project and what is currently being used.
