import { lazy } from "react";

// Preload critical routes immediately
const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about/About"));

const Projects = lazy(() => import("../pages/projects/Projects"));
const Contact = lazy(() => import("../pages/contact/Contact"));

// Preload routes after initial load
const preloadRoutes = () => {
  // Preload About page after 2 seconds (when user likely finished reading home)
  setTimeout(() => {
    import("../pages/about/About");
  }, 2000);
  
  // Preload other routes after 4 seconds
  setTimeout(() => {
    import("../pages/projects/Projects");
    import("../pages/contact/Contact");
  }, 4000);
};

// Call preload function
if (typeof window !== 'undefined') {
  preloadRoutes();
}

export const routesPath = {
  home: "/",
  about: "/about",
  projects: "/projects",
  contact: "/contact",
};

export const routesConfig = [
  {
    path: routesPath.home,
    component: Home,
  },
  {
    path: routesPath.about,
    component: About,
  },
  {
    path: routesPath.projects,
    component: Projects,
  },
  {
    path: routesPath.contact,
    component: Contact,
  },
];