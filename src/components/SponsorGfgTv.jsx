import { motion } from "framer-motion";

const SponsorGfgTv = () => {
  // Fine-tuning variables
  const sponsorBgColor = "bg-transparent";
  
  return (
    <div className="text-center">
      <div className="text-[#13EC49] font-mono font-semibold mb-2 text-base tracking-wide">
        Knowledge Partner
      </div>
      <div className={`${sponsorBgColor} p-2 rounded flex justify-center`}>
        <img
          src="/events/Technovista2025/tv25-icons/GFG.png"
          alt="GeeksforGeeks Logo"
          className="h-8 lg:h-12 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default SponsorGfgTv;
