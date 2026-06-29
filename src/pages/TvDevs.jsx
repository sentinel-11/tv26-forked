import React, { useState, useEffect } from "react";
import NavbarTv from "../components/NavbarTv";
import FooterTV from "../components/FooterTV";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Skeleton } from "../components/ui/Skeleton"; // Custom skeleton component

const developers = [
  {
    id: 1,
    name: "Praneesh",
    role: "Full Stack Developer",
    image:
      "https://cdn.jsdelivr.net/gh/vjdataquesters/cdnstorage@main/devs/Praneesh.png",
    linkedin: "https://www.linkedin.com/in/parshipraneesh/",
    github: "https://github.com/PPraneesh",
    fullName: "Parshi Praneesh",
  },
  {
    id: 2,
    name: "Karthikeya",
    role: "Full Stack Developer",
    image:
      "https://cdn.jsdelivr.net/gh/vjdataquesters/cdnstorage@main/devs/Karthikeya.png",
    linkedin: "https://www.linkedin.com/in/karthikeyaveruturi/",
    github: "https://github.com/karthikeyaspace/",
    fullName: "Karthikeya",
  },
  {
    id: 3,
    name: "Jagadeeswar",
    role: "Full Stack Developer",
    image:
      "https://cdn.jsdelivr.net/gh/vjdataquesters/cdnstorage@main/devs/Jagadeeswar.png",
    linkedin: "https://www.linkedin.com/in/jagadeeswarj/",
    github: "https://github.com/JagadeeswarJ",
    fullName: "J. Jagadeeswar",
  },
  {
    id: 4,
    name: "Pranav",
    role: "Frontend Developer",
    image:
      "https://cdn.jsdelivr.net/gh/vjdataquesters/cdnstorage@main/devs/Pranav.png",
    linkedin: "https://www.linkedin.com/in/pranav-babu-tungani-146707287/",
    github: "https://github.com/PranavBabuTungani",
    fullName: "T. Pranav Babu",
  },
  {
    id: 5,
    name: "Anish",
    role: "UI Designer",
    image:
      "https://cdn.jsdelivr.net/gh/vjdataquesters/cdnstorage@main/devs/Anish.png",
    linkedin: "https://www.linkedin.com/in/anish-reddy2931/",
    github: "https://github.com/Anishs2931",
    fullName: "S. Anish Reddy",
  },
  {
    id: 6,
    name: "Srishanth",
    role: "Full Stack Developer",
    image:
      "https://cdn.jsdelivr.net/gh/vjdataquesters/cdnstorage@main/devs/Srishanth.png",
    linkedin: "https://www.linkedin.com/in/padala-srishanth-4a0a4328b/",
    github: "https://github.com/Padala-Srishanth",
    fullName: "P. Srishanth",
  },
  {
    id: 7,
    name: "Sipun",
    role: "UI Designer",
    image:
      "https://cdn.jsdelivr.net/gh/vjdataquesters/cdnstorage@main/devs/Sipun.png",
    linkedin: "https://www.linkedin.com/in/sipun-kumar-panda-8747b127b/",
    github: "#",
    fullName: "Sipun Kumar",
  },
];

const TvDevs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const firstRow = developers.filter((dev) => dev.id === 1 || dev.id === 2);
  const secondRow = developers.filter((dev) =>
    [3, 4, 5, 6, 7].includes(dev.id)
  );

  const DevCardSkeleton = () => (
    <div className="w-[220px] h-[340px] rounded-3xl bg-gradient-to-br from-[#00FF41] to-[#00cc33] p-[1px] shadow-lg shadow-[#00FF41]/20">
      <div className="w-full h-full bg-black rounded-3xl overflow-hidden flex flex-col">
        <div className="flex-1 relative">
          <Skeleton variant="technovista" className="w-full h-full rounded-t-3xl" />
        </div>
        <div className="p-4 text-center bg-black rounded-b-3xl space-y-3">
          <Skeleton variant="technovista" className="h-5 w-[120px] mx-auto" />
          <Skeleton variant="technovista" className="h-3 w-[100px] mx-auto" />
          <div className="flex justify-center space-x-4 mt-3 md:hidden">
            <Skeleton variant="technovista" className="w-5 h-5 rounded-full" />
            <Skeleton variant="technovista" className="w-5 h-5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDevCard = (dev, index) => {
    return (
      <div
        key={dev.id}
        className="relative group"
        onClick={() => {
          if (isMobile) {
            setActiveIndex(index);
          }
        }}
      >
        {!loadedImages[index] && <DevCardSkeleton />}

        {/* Main Card - hide until image is loaded */}
        <div
          className={`w-[220px] h-[340px] rounded-3xl bg-gradient-to-br from-[#00FF41] to-[#00cc33] p-[1px] transition-all duration-300 ease-in-out shadow-lg shadow-[#00FF41]/20 hover:shadow-xl hover:shadow-[#00FF41]/30 ${
            !loadedImages[index] ? "absolute opacity-0 pointer-events-none" : ""
          }`}
        >
          <div className="w-full h-full bg-black rounded-3xl overflow-hidden flex flex-col">
            <div className="flex-1 relative">
              <img
                src={dev.image}
                alt={dev.name}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                className="w-full h-full object-cover rounded-t-3xl"
              />
            </div>

            <div className="p-2 text-center bg-black rounded-b-3xl">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {dev.name}
              </h3>
              <p className="text-xs text-[#13EC49] mb-2">{dev.role}</p>
              <div className="flex justify-center space-x-4 mt-2 md:hidden">
                {dev.linkedin && (
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#13EC49] transition-colors"
                  >
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                )}
                {dev.github && (
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#13EC49] transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {!isMobile && loadedImages[index] && (
          <div className="absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none scale-90 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 z-10 flex flex-col justify-center items-center text-center border border-[#00FF41] shadow-2xl shadow-[#00FF41]/30 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-6 transition-all duration-300 ease-in-out">
            <div className="w-[100px] h-[100px] bg-gradient-to-br from-[#00FF41] to-[#00cc33] rounded-full flex justify-center items-center p-[2px] mb-4 shadow-md">
              <div className="w-[96px] h-[96px] rounded-full overflow-hidden border-2 border-[#1a1a1a]">
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#13EC49] mb-1">
                {dev.fullName}
              </h3>
              <p className="text-sm text-white mb-1">{dev.role}</p>
            </div>

            <div className="flex gap-3">
              <a
                href={dev.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#00FF41]/20 rounded-full flex items-center justify-center transition hover:bg-[#00FF41]/40"
              >
                <FaLinkedinIn className="text-white text-xl" />
              </a>
              <a
                href={dev.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#00FF41]/20 rounded-full flex items-center justify-center transition hover:bg-[#00FF41]/40"
              >
                <FaGithub className="text-white text-xl" />
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarTv />

      <div className="pt-24 pb-16 px-6">
        <h1 className="text-[40px] sm:text-[50px] md:text-[60px] font-bold text-center text-[#13EC49]">
          Developed with 💛 by Our Team
        </h1>
        <p className="text-gray-400 text-lg text-center mt-2">
          Meet the creative minds behind Technovista 2K25
        </p>

        <div className="flex flex-wrap justify-center gap-10 mt-12 max-w-7xl mx-auto">
          {firstRow.map((dev, idx) => renderDevCard(dev, idx))}
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-10 max-w-7xl mx-auto">
          {secondRow.map((dev, idx) =>
            renderDevCard(dev, idx + firstRow.length)
          )}
        </div>
      </div>

      <FooterTV />
    </div>
  );
};

export default TvDevs;
