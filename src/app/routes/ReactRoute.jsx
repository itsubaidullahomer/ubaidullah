import React, { Suspense, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import UpGlobalLoader from "../components/upComponents/upGlobalLoader/UpGlobalLoader.jsx";
import { routesConfig } from "./RouteConstants.jsx";
import NotFound from "../components/notFound/NotFound.jsx";
import Footer from "../components/footer/Footer.jsx";

// Enhanced loading component with minimal delay for better UX
const RouteLoader = () => {
  const [showLoader, setShowLoader] = useState(false);
  
  useEffect(() => {
    // Only show loader after 150ms to avoid flash for fast loads
    const timer = setTimeout(() => setShowLoader(true), 150);
    return () => clearTimeout(timer);
  }, []);
  
  return showLoader ? <UpGlobalLoader /> : <div className="h-4" />;
};

function ReactRoute() {
  const location = useLocation();
  
  // Add route transition optimization
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-[#011627] h-full w-full overflow-y-auto border-[1px] border-[#1E2D3D] rounded-[8px] flex flex-col items-center justify-between">
      <Navbar />
      <Suspense fallback={<RouteLoader />}>
        <div className="flex-1 w-full">
          <Routes>
            <Route path={"*"} element={<NotFound />} />
            {routesConfig.map((route) => (
              <Route 
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </div>
      </Suspense>
      <Footer/>
    </div>
  );
}

export default ReactRoute;