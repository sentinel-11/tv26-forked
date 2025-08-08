import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getEventState } from "../data/tvData";

function EventConcluded() {
  const [eventState, setEventState] = useState(getEventState());

  useEffect(() => {
    const timer = setInterval(() => {
      setEventState(getEventState());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (eventState !== "post-event") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full py-16 px-6 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 text-[#dba72e]"
          style={{
            textShadow: "0 2px 8px rgba(219, 167, 46, 0.3)",
          }}
        >
          Event Concluded
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-lg md:text-xl text-[#dba72e] mb-4">
            Thank you for participating in Technovista 2025.
          </p>
          <p className="text-lg md:text-xl text-[#dba72e] mb-4">
            See you next year.
          </p>
          <p className="text-base md:text-lg text-gray-400">
            Learn more at{" "}
            <a
              href="https://www.vjdataquesters.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dba72e] hover:text-yellow-400 underline transition-colors duration-300"
            >
              vjdataquesters.com
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default EventConcluded;