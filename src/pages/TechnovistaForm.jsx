// TechnovistaForm.js
import { useEffect, useRef, useState } from "react";
import FormBanner from "../components/FormBanner";
import TForm from "../components/RegistrationForm";
import { gsap } from "gsap";

const TechnovistaForm = () => {
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (cursorRef.current && cursorTrailRef.current) {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(cursorTrailRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    }
  };

  useEffect(() => {
    if (isMobile) {
      if (cursorRef.current) cursorRef.current.style.display = "none";
      if (cursorTrailRef.current) cursorTrailRef.current.style.display = "none";
      return;
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Custom Cursor - Only for desktop */}
      {!isMobile && (
        <>
          <div
            ref={cursorRef}
            className="fixed w-4 h-4 rounded-full bg-[#00FF41] pointer-events-none z-[9999]"
            style={{
              mixBlendMode: "normal",
              transform: "translate(-50%, -50%)",
              left: 0,
              top: 0,
            }}
          />
          <div
            ref={cursorTrailRef}
            className="fixed w-8 h-8 rounded-full bg-[#00FF41]/30 pointer-events-none z-[9998]"
            style={{
              mixBlendMode: "normal",
              transform: "translate(-50%, -50%)",
              left: 0,
              top: 0,
            }}
          />
        </>
      )}

      {/* Mobile Layout */}
      <div className="lg:hidden pt-4 px-2 mt-16 mb-6">
          <TForm />
      </div>

      <div className="hidden lg:flex justify-center items-center pt-8 min-h-[calc(100vh-5rem)]">
        <div className="flex w-full max-w-6xl mx-4 h-full mt-16 mb-6">
          {/* Left Section - Form Banner */}
          <div className="w-1/2 pr-4 h-full">
            <FormBanner />
          </div>
          {/* Right Section - Registration Form */}
          <div className="w-1/2 pl-4 h-full">
            <TForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnovistaForm;
