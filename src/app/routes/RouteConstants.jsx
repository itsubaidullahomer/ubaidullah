import { lazy } from "react";

const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about/About"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const Contact = lazy(() => import("../pages/contact/Contact"));
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
