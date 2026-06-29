import { useState } from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { eventTimeLine } from "../data/tvData";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Flatten all events
const allEvents = eventTimeLine
  .flatMap((day) => day.events)
  .sort((a, b) => a.priority - b.priority);

export default function EventShowcase() {
  const [activeEvent, setActiveEvent] = useState(allEvents[0]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full bg text-white max-w-[90%] mx-auto px-4 select-none">
      <h2 className="text-center font-bold font-sans text-5xl sm:text-6xl  text-white mb-5 pb-5">
        Featured <span className="text-[#13EC49]">Events</span>
      </h2>

      {/* Desktop View */}
      <div className="hidden lg:flex border border-white/10">
        {/* Left: Event List */}
        <div className="w-3/5 border-r border-white/10 overflow-y-auto">
          {allEvents.map((event) => {
            const isActive = activeEvent.id === event.id;
            return (
              <div
                key={event.id}
                onMouseEnter={() => setActiveEvent(event)}
                className={`group border-b border-white/10 cursor-pointer
                            flex justify-between items-start gap-4 px-4
                            text-white/40 hover:bg-white/20
                            transition-all duration-300 ease-in-out
                            h-[68px]
                            overflow-hidden relative
                            ${isActive ? "text-white h-[75px]" : ""}
                            last:border-b-0
                            ${event.url ? "cursor-pointer hover:underline" : ""}
                          `}
                onClick={() => {
                  if (event.url) {
                    navigate(event.url);
                  }
                }}
              >
                {/* Left: Title and Subtitle */}
                <div className="flex flex-col justify-center font-sans transition-all duration-300 ease-in-out py-2">
                  <h3
                    className={`text-lg mt-1 transition-all duration-300 ease-in-out ${isActive
                      ? "translate-y-[4px] text-white font-semibold"
                      : "group-hover:translate-y-0 translate-y-[4px] font-light"
                      }`}
                  >
                    {event.title}
                  </h3>

                  <p
                    className={`text-sm text-white/60 leading-tight mt-1 ${isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                      } transition-all duration-300 ease-in-out`}
                  >
                    {event.subtitle}
                  </p>
                </div>

                {/* Right: Date and Register — only if active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex flex-col justify-center gap-y-1 font-mono text-xs text-white/60 p-1 mt-1"
                    >
                      {/* Date */}
                      <div className="flex items-center justify-end gap-1">
                        <Calendar size={14} className="text-[#13EC49]" />
                        <span className="font-mono leading-none pt-[1px]">
                          {new Date(event.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>

                      {/* Register/Know more link */}
                      {/* {event.url ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(event.url);
                          }}
                          className="flex items-center justify-end gap-1 text-white/60 hover:underline mt-1"
                        >
                          <ExternalLink size={14} className="text-[#13EC49]" />
                          <span className="font-mono leading-none pt-[1px]">
                            Know more
                          </span>
                        </button>
                      ) : event.formlink && (
                        <a
                          href={event.formlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-end gap-1 text-white/60 hover:underline mt-1"
                        >
                          <ExternalLink size={14} className="text-[#13EC49]" />
                          <span className="font-mono leading-none pt-[1px]">
                            Register
                          </span>
                        </a>
                      )} */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right: Event Preview */}
        <div
          className="w-2/5 flex items-center justify-center text-center p-4 cursor-pointer"
          onClick={() =>
            navigate("/technovista/events", {
              state: {
                title: activeEvent.title,
              },
            })
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.35, ease: "easeInOut" },
              }}
              className="flex flex-col space-y-4"
            >
              <img
                src={activeEvent.cartoon}
                alt={activeEvent.title}
                className="rounded-2xl object-contain h-[350px] w-auto mx-auto"
              />
              <p className=" px-4 text-justify">{activeEvent.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 p-0 lg:hidden">
        {allEvents.map((event) => (
          <div
            key={event.id}
            className="group border border-white/10 p-2 flex flex-col items-center text-center hover:bg-white/5 hover:border-white/20 transition-all duration-300 rounded-2xl cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20"
            onClick={() =>
              navigate("/technovista/events", {
                state: {
                  title: event.title,
                },
              })
            }
          >
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img
                src={event.cartoon}
                alt={event.title}
                className="w-36 h-36 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="space-y-2 flex flex-col justify-between">
              <h3 className="font-bold text-white font-sans text-base leading-tight group-hover:text-green-500 transition-colors duration-300">
                {event.title}
              </h3>

              <p className="text-sm text-white/70 font-sans leading-relaxed">
                {event.subtitle}
              </p>

              <p className="text-xs text-white/50 font-medium tracking-wide">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
