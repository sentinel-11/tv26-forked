import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ASCIIReveal from "../components/ASCIIReveal";

const LandingTV = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after the animation completes (approx 4.5 seconds)
    const timer = setTimeout(() => {
      navigate("/technovista");
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section 
      className="min-h-screen w-full relative overflow-hidden bg-black flex items-center justify-center px-4 py-16 cursor-pointer select-none"
      onClick={() => navigate("/technovista")}
    >
      <div className="w-[90%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-w-[1000px] text-center flex justify-center items-center">
        <ASCIIReveal
          image={{ src: "/events/Technovista2025/tv25-icons/landing-page-text.svg", alt: "Technovista Title" }}
          trigger="auto"
          columns={60}
          fontSize={14}
          textColor="#ffffff"
          backgroundColor="transparent"
          revealDelayMs={500}
        />
      </div>
    </section>
  );
};

export default LandingTV;
