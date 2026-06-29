import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WhatWeGot from "../components/WhatWeGot";
import Intro from "../components/Intro";
import EventShowcase from "../components/EventShowcase";
import Countdown from "../components/CountDown";
import FooterTV from "../components/FooterTV";
import "./Technovista.css";
import Sponsors from "../components/Sponsors";
import EventConcluded from "../components/EventConcluded";
import NavbarTv from "../components/NavbarTv";
import WhatToExpectTV from "../components/WhatToExpectTV";
import ScrollingGallery from "../components/ScrollingGallery";
import { gsap } from "gsap";

const Technovista = () => {
  const [introPlay, setIntroPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const navigate = useNavigate();

  // Cursor refs
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const triggerPoint = window.innerHeight - rect.height * 0.6;
      const isInView = rect.top <= triggerPoint;
      if (isInView && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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
    // Hide cursor on mobile
    if (isMobile) {
      if (cursorRef.current) cursorRef.current.style.display = "none";
      if (cursorTrailRef.current) cursorTrailRef.current.style.display = "none";
      return;
    }

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    if (!introPlay) {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "instant" });
        }
      }
    }
  }, [introPlay]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg min-h-[250vh] relative">
      {introPlay && (
        <Intro introPlay={introPlay} onFinish={() => setIntroPlay(false)} />
      )}

      {/* Custom Cursor - only on desktop */}
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

      <div className="relative z-10">
        <NavbarTv />
        <div className="flex flex-col pt-16">
          <WhatWeGot />

          <div
            ref={sectionRef}
            className="select-none flex flex-col items-center justify-center gap-12 pb-6"
          >
            <motion.div className="w-full px-4 py-2 flex flex-col items-center justify-center">
              <Countdown isVisible={isVisible} />
            </motion.div>
          </div>
          <WhatToExpectTV />
          <EventShowcase />
          <Sponsors />
          <EventConcluded />
          <div className="py-16">
            <section className="md:w-[90%] h-full mx-auto">
              <h4 className="font-bold text-center text-[40px] md:text-[30px] lg:text-[50px] text-white">
                Technovista-2k24{" "}
                <span className="text-[#13EC49]">Glimpses</span>
              </h4>
              <div className="pt-4">
                <div className="w-full mx-auto">
                  <ScrollingGallery />
                </div>
              </div>
            </section>
          </div>

          <div className="w-full overflow-hidden text-center select-none box-border">
            <h1 className="inline-block max-w-full text-[clamp(48px,14vw,200px)] sm:text-[clamp(64px,16vw,280px)] leading-none font-bold text-green-700/40 tracking-tight overflow-hidden">
              TECHNOVISTA
            </h1>
          </div>
          <FooterTV />
        </div>
      </div>
    </div>
  );
};

export default Technovista;
