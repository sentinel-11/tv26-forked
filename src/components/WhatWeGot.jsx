import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";

function WhatWeGot() {
  const translations = [
    { lang: "English", text: " Technovista" },
    { lang: "Hindi", text: " टेक्नोविस्टा" },
    { lang: "Telugu", text: " టెక్నోవిస్టా" },
    { lang: "Malayalam", text: " ടെക്നോവിസ്റ്റ" },
  ];

  const stats = [
    {
      icon: "fas fa-user-graduate",
      title: "500+ Participants",
      desc: "Where Hyderabad's Brightest Minds Converge to Code, Create, and Conquer!",
      highlight: "from 10+ colleges",
      color: "from-amber-500/20 to-amber-600/10",
      border: "border-amber-500/30",
    },
    {
      icon: "fas fa-calendar-alt",
      title: "8 Events",
      desc: "Diverse events spanning workshops, lectures, competitions, and a 24-hour hackathon",
      highlight: "3 days of non-stop action",
      color: "from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/30",
    },
    {
      icon: "fas fa-award",
      title: "50K+ Prize Pool",
      desc: "Exciting rewards for top performers",
      highlight: "across all events",
      color: "from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30",
    },
  ];

  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(translations[0].text);

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let currentText = "";
    let timeoutId;
    const fullText = translations[index].text;

    const typeEffect = () => {
      if (!isDeleting) {
        currentText = fullText.substring(0, charIndex + 1);
        setDisplayedText(currentText);
        charIndex++;

        if (charIndex === fullText.length) {
          isDeleting = true;
          timeoutId = setTimeout(typeEffect, 900);
          return;
        }
      } else {
        currentText = fullText.substring(0, charIndex - 1);
        setDisplayedText(currentText);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          setIndex((prevIndex) => (prevIndex + 1) % translations.length);
          timeoutId = setTimeout(typeEffect, 300);
          return;
        }
      }

      timeoutId = setTimeout(typeEffect, 100);
    };

    timeoutId = setTimeout(typeEffect, 100);

    return () => clearTimeout(timeoutId);
  }, [index]);

  const isMalayalam = translations[index].lang === "Malayalam";

  return (
    <div className="mb-4 lg:m-6 min-h-screen bg-none overflow-hidden px-4 pt-4 flex flex-col items-center justify-center text-white text-center select-none">
      <div className="max-w-6xl w-full flex flex-col items-center mb-6 md:mb-8">
        {/* Title Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="font-sans text-3xl sm:text-5xl md:text-6xl font-extrabold my-4 leading-tight">
            WHAT WE'VE GOT FOR YOU
          </h1>
          <motion.span
            className={`
              inline-block text-center break-words leading-tight max-w-full px-2 font-bold text-[#00FF41] pt-2
              ${
                isMalayalam
                  ? "text-2xl sm:text-5xl md:text-7xl"
                  : "text-4xl sm:text-6xl md:text-7xl"
              }
            `}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {displayedText}&nbsp;2K25
          </motion.span>
        </div>

        {/* Stats Cards Section */}
        <div className="mb-6 md:mb-8 max-w-6xl px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              className={`relative rounded-xl overflow-hidden p-0.5 bg-gradient-to-br ${stat.color}`}
            >
              <div
                className={`relative bg-black/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 h-full flex flex-col items-center justify-center border ${stat.border}`}
              >
                {/* Animated icon with gradient */}
                <div className="relative mb-4 sm:mb-6">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${stat.color} blur-md opacity-70`}
                  ></div>
                  <i
                    className={`${stat.icon} text-3xl sm:text-4xl md:text-5xl relative z-10 text-[#00FF41]`}
                  />
                </div>

                <h3 className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                  {stat.title}
                </h3>

                <p className="font-mono text-xs sm:text-sm md:text-base text-gray-300 mb-2 sm:mb-3 text-center">
                  {stat.desc}
                </p>

                <p className="font-mono text-xs sm:text-sm font-medium bg-gradient-to-r from-[#00FF41] to-[#00FF41] bg-clip-text text-transparent text-center">
                  {stat.highlight}
                </p>

                {/* Animated border effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Description Section */}
      <section className="lg:m-6 from-yellow-900/20 to-black/50 rounded-xl py-4 sm:p-6 md:p-8 max-w-[90%] md:max-w-6xl w-full text-left">
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-[#13EC49] mb-4 tracking-wide">
          A Data Science Tech Carnival
        </h2>
        <p className="lg:mt-10 text-justify font-mono text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
          The annual technical fest{" "}
          <span className="font-bold text-white">"TechnoVista"</span> is a
          flagship initiative organized by the{" "}
          <span className="text-[#13EC49] font-semibold">
            Data Science Branch of CSE – (CyS, DS)
          </span>{" "}
          <span className="text-[#13EC49] font-semibold">
            and the AI&amp;DS Department of VNRVJIET
          </span>
          . Since its inception, it has emerged as a high-energy platform that
          blends <span className="text-[#13EC49]">innovation</span>,{" "}
          <span className="text-[#13EC49]">skill</span>, and{" "}
          <span className="text-[#13EC49]">creativity</span>. The{" "}
          <span className="text-white font-semibold">2025 edition</span>,
          scheduled from{" "}
          <span className="text-white">July 31st to August 2nd</span>, showcases{" "}
          <span className="text-white font-semibold">8 exciting events</span>{" "}
          including{" "}
          <span className="text-[#13EC49]">machine learning challenges</span>, a{" "}
          <span className="text-[#13EC49]">creative blogathon</span>,{" "}
          <span className="text-[#13EC49]">data science problem-solving</span>,
          a <span className="text-[#13EC49]">coding contest</span>,{" "}
          <span className="text-[#13EC49]">hands-on workshops</span>,{" "}
          <span className="text-[#13EC49]">expert guest lectures</span>, and a
          thrilling <span className="text-[#13EC49]">24-hour hackathon</span>.
          With{" "}
          <span className="text-white font-semibold">
            600+ tech enthusiasts
          </span>{" "}
          expected,{" "}
          <span className="font-bold text-white">TechnoVista 2K25</span>{" "}
          promises a vibrant confluence of{" "}
          <span className="text-[#13EC49]">ideas</span>,{" "}
          <span className="text-[#13EC49]">competition</span>, and{" "}
          <span className="text-[#13EC49]">collaboration</span> — celebrating
          the spirit of technology like never before.
        </p>
      </section>
    </div>
  );
}

export default WhatWeGot;