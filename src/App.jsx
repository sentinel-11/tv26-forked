import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import router from "./pages";
import ScrollToTop from "./components/ScrollToTop";
import { PromoDiv } from "./components/PromoDiv";

function PromoSection() {
  const { pathname } = useLocation();
  return (
    pathname !== "/technovista/register" &&
    pathname !== "/technovista/updates" && (
      <div className="fixed bottom-2 md:bottom-6 right-2 flex flex-col gap-2 z-[99999]">
        <PromoDiv link="/technovista/updates" />
      </div>
    )
  );
}

function LayoutWrapper() {
  return (
    <>
      <Analytics />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-blue-50/70">
        <Routes>
          {router.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </div>
      {/* <PromoSection /> */}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
