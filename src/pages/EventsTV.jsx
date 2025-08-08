import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, ExternalLink, MapPin, ArrowLeft } from "lucide-react";
import { eventTimeLine } from "../data/tvData.js";
import Reveal from "../components/Reveal.jsx";
import "./Technovista.css";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import mainPoster from "/events/Technovista2025/main.png";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const imageModalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};
// ✅ Superscript date formatter
function formatCustomDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const weekday = date.toLocaleString("en-US", { weekday: "long" });

  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const suffix = getOrdinalSuffix(day);

  return (
    <>
      {day}
      <sup className="text-[10px] align-super">{suffix}</sup> {month} {year},{" "}
      {weekday}
    </>
  );
}

const ImageViewer = ({ image, onClose }) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-60"
            variants={backdropVariants}
            onClick={onClose}
            aria-label="Close Image Viewer"
          />

          {/* Image Content */}
          <motion.div
            className="relative z-10 max-w-full max-h-full"
            variants={imageModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <img
              src={image}
              alt="Full view"
              className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain shadow-2xl"
            />
            <button
              onClick={onClose}
              className="absolute top-3 md:top-2 right-2 md:right-[-5rem] [ w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white text-3xl grid place-items-center transition-all duration-200"
              title="Close"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EventsTV = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventRefs = useRef({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const cursorRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const scrollToEvent = location.state?.title;

  useEffect(() => {
    if (scrollToEvent) {
      const section = eventRefs.current[scrollToEvent];
      if (section) {
        setTimeout(() => {
          const offsetTop =
            section.getBoundingClientRect().top + window.scrollY;
          const offset = 100;

          window.scrollTo({
            top: offsetTop - offset,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [scrollToEvent]);

  const handleEventClick = (image) => {
    setSelectedImage(image);
  };

  const closeViewer = () => {
    setSelectedImage(null);
  };

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
    <div className="min-h-screen text-white bg">
      {/* Custom Cursor - only on desktop */}
      {!isMobile && (
        <>
          <div
            ref={cursorRef}
            className="fixed w-4 h-4 rounded-full bg-[#daa425] pointer-events-none z-[9999] mix-blend-difference"
            style={{
              transform: "translate(-50%, -50%)",
              left: 0,
              top: 0,
            }}
          />
          <div
            ref={cursorTrailRef}
            className="fixed w-8 h-8 rounded-full bg-[#daa425]/30 pointer-events-none z-[9998] mix-blend-difference"
            style={{
              transform: "translate(-50%, -50%)",
              left: 0,
              top: 0,
            }}
          />
        </>
      )}
      {selectedImage && (
        <ImageViewer image={selectedImage} onClose={closeViewer} />
      )}
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-10 max-w-7xl">
        <div className="relative text-center mb-12">
          <ArrowLeft
            onClick={() => navigate("/technovista")}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-yellow-500 hover:scale-110 transition-transform duration-300 cursor-pointer"
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold inline-block">
            Event <span className="text-yellow-500">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-2" />
        </div>

        <div className="w-[90%] lg:w-full flex flex-col lg:flex-row gap-4 mb-12 bg-gradient-to-r from-black/60 via-black/40 to-transparent rounded-2xl border border-yellow-500/20 backdrop-blur-sm mx-auto">
          <div className="w-full lg:w-1/2 sm:p-4">
            <img
              src={mainPoster}
              alt="Technovista 2025 Event"
              className="h-[40%] lg:h-full object-cover rounded-xl shadow-2xl hover:shadow-yellow-500/20 transition-shadow duration-300"
              onClick={() => handleEventClick(mainPoster)}
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-4">
            <h3 className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-5xl text-white mb-6 scroll-m-20 text-center font-extrabold tracking-tight text-balance">
              We have some{" "}
              <span className="text-[#daa425]">incredible events</span> lined up
              for you!
            </h3>

            <p className="leading-7 [&:not(:first-child)]">
              Dive into a world where innovation meets creativity. Experience
              thrilling challenges, connect with brilliant minds, and discover
              opportunities that will redefine your tomorrow.
            </p>
          </div>
        </div>
        {eventTimeLine.map(({ day, date, events }) => (
          <div key={day} className="space-y-10 mb-10">
            <Reveal>
              <div className="flex flex-col gap-4 items-start mb-6">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#daa425]" />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#daa425]">
                      Day {day}
                    </h2>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {formatCustomDate(date)}
                  </p>
                  <div className="hidden md:block flex-grow h-px bg-gradient-to-r from-[#daa425] to-transparent"></div>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {events.map(
                (
                  {
                    title,
                    subtitle,
                    date,
                    time,
                    description,
                    image,
                    formlink,
                    venue,
                    highlights,
                    icon,
                    url,
                  },
                  index
                ) => (
                  <Reveal key={index}>
                    <div
                      ref={(el) => {
                        if (el) eventRefs.current[title] = el;
                      }}
                      className="max-w-[400px] w-full mx-auto rounded-lg h-full shadow-2xl bg-black border border-yellow-600/40 hover:border-[#daa425] transition-all duration-300 hover:shadow-yellow-500/20 group flex flex-col"
                    >
                      <div
                        onClick={() => handleEventClick(image)}
                        className="relative h-64 overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-64 object-cover rounded-t-lg"
                          draggable={false}
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div className="space-y-2 mb-4">
                          <h3 className="text-xl font-semibold text-[#daa425] group-hover:text-[#f2ca46] transition-colors flex items-center gap-2">
                            <span>{icon}</span>
                            {title}
                          </h3>
                          {subtitle && (
                            <p className="text-md text-yellow-200 italic">
                              {subtitle}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Clock className="w-4 h-4 text-[#daa425]" />
                            {time}
                          </div>
                          {venue && (
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <MapPin className="w-4 h-4 text-[#daa425]" />
                              {venue}
                            </div>
                          )}
                          {description && (
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {description}
                            </p>
                          )}
                          {highlights?.length > 0 && (
                            <div className="overflow-hidden mt-3 w-full">
                              <div className="flex gap-3 animate-marquee whitespace-nowrap">
                                {highlights.map((tag, index) => (
                                  <div
                                    key={index}
                                    title={tag}
                                    className="inline-block bg-white/5 border border-[#daa425] text-yellow-300 text-xs md:text-sm rounded-xl px-3 py-1 backdrop-blur-md hover:scale-105 transition-transform duration-300"
                                  >
                                    {tag}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto">
                          {(() => {
                            const today = new Date();
                            const eventDate = new Date(date);
                            const [startTime] = time.split(" - ");
                            const eventDateTime = new Date(
                              `${date} ${startTime}`
                            );
                            if (url) {
                              return (
                                <Link
                                  to={url}
                                  className="block w-full text-center bg-gradient-to-r from-[#daa425] to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-4 py-2 rounded-2xl transition-all duration-[400ms] hover:scale-105 hover:shadow-yellow-500/20 shadow"
                                >
                                  Know more
                                </Link>
                              );
                            } else if (!formlink) {
                              return (
                                <span className="block w-full text-center border border-yellow-300 text-yellow-400 font-medium px-4 py-2 rounded-2xl backdrop-blur-2xl bg-white/5">
                                  Stay Tuned
                                </span>
                              );
                            } else if (eventDateTime < today) {
                              return (
                                <span
                                  className="block w-full text-center border border-yellow-300 text-yellow-400 font-medium px-4 py-2 rounded-2xl backdrop-blur-2xl bg-white/5"
                                >
                                  Event concluded
                                </span>
                              );
                            } else {
                              return (
                                <button
                                  onClick={() =>
                                    window.open(formlink, "_blank")
                                  }
                                  className="w-full bg-gradient-to-r from-[#daa425] to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-4 py-2 rounded-2xl transition-all duration-[400ms] hover:scale-105 hover:shadow-yellow-500/20 shadow"
                                >
                                  <div className="flex items-center justify-center gap-2">
                                    <ExternalLink className="w-4 h-4" />
                                    Register Now
                                  </div>
                                </button>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsTV;
