import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState, useLayoutEffect } from "react";

const CARDS_DATA = [
  {
    id: 1,
    title: "Inspiring Talks",
    subtitle: "Ideas That Spark Innovation",
    img: (
      <img
        src="/events/Technovista2025/tv25-icons/guest_lecture.png"
        alt="Guest Lecture"
        style={{ width: 60, height: 60 }}
      />
    ),
  },
  {
    id: 2,
    title: "Coding Battles",
    subtitle: "Compete with the Best Minds",
    img: (
      <img
        src="/events/Technovista2025/tv25-icons/code_fest.png"
        alt="Code Fest"
        style={{ width: 50, height: 40 }}
      />
    ),
  },
  {
    id: 3,
    title: "Creative Writing",
    subtitle: "Pen Your Tech Vision",
    img: (
      <img
        src="/events/Technovista2025/tv25-icons/blogathon.png"
        alt="Blogathon"
        style={{ width: 75, height: 50 }}
      />
    ),
  },
  {
    id: 4,
    title: "Hands-on Workshops",
    subtitle: "Build Skills That Matter",
    img: (
      <img
        src="/events/Technovista2025/tv25-icons/ml_challenge.png"
        alt="ML Challenge"
        style={{ width: 60, height: 50 }}
      />
    ),
  },
  {
    id: 5,
    title: "Networking & Fun",
    subtitle: "Connect, Collaborate, Celebrate",
    img: (
      <img
        src="/events/Technovista2025/tv25-icons/networking.png"
        alt="Networking"
        style={{ width: 50, height: 50 }}
      />
    ),
  },
];

const CARD_DIMENSIONS = {
  height: 400,
  width: 400,
};

/**
 * Individual card component
 */
const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className={`
        group relative flex flex-col justify-between p-6 rounded-2xl 
        transition-transform duration-300 ease-in-out 
        border border-neutral-200
        ${card.id % 2 === 1 ? "bg-gray-50" : "bg-white"}
        shadow-md
      `}
      style={{
        height: `${CARD_DIMENSIONS.height}px`,
        width: `${CARD_DIMENSIONS.width}px`,
        flexShrink: 0,
      }}
    >
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-1 leading-snug">
        <h3 className="text-3xl font-extrabold text-black">{card.title}</h3>
        <p className="text-base font-medium text-black/70">{card.subtitle}</p>
      </div>

      {/* Bottom Icon */}
      {card.img && (
        <div className="mt-6">
          <div className="w-fit rounded-xl p-2">{card.img}</div>
        </div>
      )}
    </div>
  );
};

/**
 * Horizontal scrolling carousel component
 */
const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const carouselRef = useRef(null); // Ref for the motion.div

  // State to store the dynamic horizontal offset
  const [carouselEnd, setCarouselEnd] = useState(0);

  // Use useLayoutEffect to measure DOM elements after they are rendered
  useLayoutEffect(() => {
    const calculateCarouselEnd = () => {
      if (targetRef.current && carouselRef.current) {
        // The container's width (the visible part)
        const containerWidth = targetRef.current.offsetWidth;
        // The full scrollable width of the carousel content
        const carouselWidth = carouselRef.current.scrollWidth;
        // Calculate position to center the last card
        const lastCardCenterOffset = (containerWidth - CARD_DIMENSIONS.width) / 2;
        // The distance to scroll is the difference minus the center offset
        setCarouselEnd(containerWidth - carouselWidth - lastCardCenterOffset);
      }
    };

    calculateCarouselEnd(); // Calculate on initial render

    // Recalculate on window resize
    window.addEventListener("resize", calculateCarouselEnd);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateCarouselEnd);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform scroll progress to horizontal movement using the dynamic value
  const x = useTransform(scrollYProgress, [0, 1], ["0px", `${carouselEnd}px`]);
  const smoothX = useSpring(x, {
    stiffness: 80,
    damping: 35,
    mass: 1,
  });

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Add the new ref here */}
        <div className="w-full overflow-hidden"></div>
        <motion.div
          ref={carouselRef}
          style={{ x: smoothX }}
          className="flex items-center gap-28 will-change-transform"
        >
          {/* Enhanced Heading */}
          <div className="text-center px-8 min-w-fit flex-shrink-0 flex items-center select-none">
            <div className="relative item">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/10 to-[#00FF41]/30 blur-3xl rounded-full transform scale-150"></div>
              <h2 className="relative font-bold font-sans text-4xl sm:text-6xl lg:text-7xl text-white leading-tight tracking-tight">
                <span className="block">What can you</span>
                <span className="block">expect?</span>
              </h2>
            </div>
          </div>

          {/* Cards */}
          {CARDS_DATA.map((card) => (
            <Card card={card} key={card.id} />
          ))}
          <div className="p-28"></div>
        </motion.div>
        <div />
      </div>
    </section>
  );
};

// Main component to be exported and used in your application
const WhatToExpectSection = () => {
  return (
    <div className="">
      <HorizontalScrollCarousel />
    </div>
  );
};

export default WhatToExpectSection;
