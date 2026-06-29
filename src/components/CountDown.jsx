import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { EVENT_START, getEventState } from "../data/tvData";

function CountDown({ isVisible }) {
  const navigate = useNavigate();
  
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = EVENT_START - now;

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [eventState, setEventState] = useState(getEventState());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      const newEventState = getEventState();

      setTimeLeft(newTimeLeft);
      setEventState(newEventState);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (eventState === "post-event") {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center max-w-7xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`text-5xl md:text-8xl font-bold text-center mb-4 ${
                eventState === "live-event" 
                  ? "text-[#dba72e]" 
                  : "text-green-500"
              }`}
              style={{
                textShadow: eventState === "live-event" 
                  ? "0 2px 8px rgba(219, 167, 46, 0.5)" 
                  : "0 2px 8px rgba(234, 179, 8, 0.3)",
              }}
            >
              {eventState === "live-event"
                ? "The Tech Fest is Live!"
                : "COUNTDOWN"}
            </motion.h1>
          </motion.div>

          {eventState === "pre-event" && timeLeft && (
            <>
              <div className="grid grid-cols-4 gap-6 md:gap-8 w-full">
                {Object.entries(timeLeft).map(([unit, value], index) => (
                  <motion.div
                    key={unit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.5,
                    }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="rounded-lg p-3 md:p-4 w-full aspect-square flex flex-col items-center justify-center">
                      <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-green-500 mb-1">
                        {value.toString().padStart(2, "0")}
                      </span>
                      <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-gray-400">
                        {unit}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center items-center mb-6">
                <button
                  className="font-sans cta-button px-6 sm:px-8 py-3 sm:py-4  text-lg sm:text-xl md:text-xl bg-[#00FF41] text-black rounded-2xl shadow-[0_0_15px_rgba(255,215,0,0.5)] font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.8)] transition-all duration-300 ease-in-out mt-20 sm:mt-16"
                  onClick={() => navigate("/technovista/register")}
                >
                  Register Now
                </button>
              </div>
            </>
          )}

          {eventState === "live-event" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center mt-6"
            >
              <div className="relative inline-block group">
                <a
                  href="https://maps.app.goo.gl/69xL8NXPXzC3zQPk8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono inline-block px-6 py-4 rounded-lg border border-[#dba72e] text-[#dba72e] font-bold text-lg md:text-xl hover:bg-[#dba72e] hover:text-black transition duration-300 shadow-lg transform hover:scale-105"
                >
                  Venue →
                </a>
                
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out hidden md:block z-50">
                  <div className="bg-black border border-[#dba72e] rounded-lg shadow-2xl w-80 h-64 overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11075.568485372974!2d78.3888612092676!3d17.539494326822695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e0ab28e0975%3A0x7b048b2858fdee94!2sVallurupalli%20Nageswara%20Rao%20Vignana%20Jyothi%20Institute%20of%Engineering%20%26Technology!5e0!3m2!1sen!2sin!4v1750646504693!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="VNR VJIET Location"
                    />
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#dba72e]"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

CountDown.propTypes = {
  isVisible: PropTypes.bool,
};

CountDown.defaultProps = {
  isVisible: true,
};

export default CountDown;
