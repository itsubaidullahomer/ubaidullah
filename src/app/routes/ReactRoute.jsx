import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import UpGlobalLoader from "../components/upComponents/upGlobalLoader/UpGlobalLoader.jsx";
import { routesConfig } from "./RouteConstants.jsx";
import NotFound from "../components/notFound/NotFound.jsx";
import Footer from "../components/footer/Footer.jsx";
function ReactRoute() {
  console.log(routesConfig, "routesConfig");
  return (
    <div className="bg-[#011627] h-full w-full overflow-y-auto border-[1px] border-[#1E2D3D] rounded-[8px] flex flex-col items-center justify-between">
      <Navbar />
      <Suspense fallback={<UpGlobalLoader />}>
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
