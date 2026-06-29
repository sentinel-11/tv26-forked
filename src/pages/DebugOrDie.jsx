import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FooterTV from "../components/FooterTV";

const DebugOrDie = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-black min-h-screen text-white font-sans pt-12">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-10">
            <div className="relative text-center mb-4">
              <button
                onClick={() => navigate("/technovista/events")}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:text-green-600 hover:bg-gray-950 cursor-pointer flex items-center justify-center"
                aria-label="Go Back"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-[#13EC49] mb-2">
              🕵️‍♂️ Debug or Die
            </h1>
            <p className="text-center text-lg text-gray-300 mb-6">
              As part of Technovista – The Technical Fest
            </p>
            <div className="mt-4">
              <p className="text-gray-200 text-lg leading-relaxed p-4 text-justify">
                Step into the world of mystery, code, and logic with Debug or
                Die, a thrilling escape-room-style tech challenge where
                participants act as{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  "code detectives"
                </span>
                . Each team faces the ultimate test of their{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  problem-solving skills
                </span>
                , racing against the clock to crack codes, solve puzzles, and
                debug their way out of a simulated lab lockdown. This event
                tests both{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  technical skills
                </span>{" "}
                and{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  critical thinking
                </span>{" "}
                under pressure.
              </p>
            </div>
          </div>
          {/* Call to Action */}
<div className="text-center mb-16 px-4 sm:px-0">
  <div className="bg-gradient-to-r from-[#00FF41]/10 to-green-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-6xl mx-auto">
    <p className="text-lg sm:text-2xl text-yellow-200 font-bold mb-4 flex items-center justify-center">
      <span className="mr-2 sm:mr-3">⚡</span>
      Ready for the Challenge?
    </p>
    <p className="text-gray-300 mb-6 text-sm sm:text-lg leading-relaxed text-left sm:text-justify">
      Test your <span className="text-green-400 font-semibold bg-green-400/20 px-1.5 py-0.5 rounded-md">problem-solving skills</span>,{" "}
      <span className="text-green-400 font-semibold bg-green-400/20 px-1.5 py-0.5 rounded-md">coding abilities</span>, and{" "}
      <span className="text-green-400 font-semibold bg-green-400/20 px-1.5 py-0.5 rounded-md">teamwork</span> in this high-pressure escape-room challenge!
    </p>
    <p className="text-base sm:text-xl font-bold text-[#13EC49] mb-6">
      🕵️‍♂️ Debug or Die - Technovista 2025
    </p>
    <div className="inline-block bg-gradient-to-r from-[#00FF41]/20 to-green-500/20 border border-[#00FF41]/40 text-[#13EC49] font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-lg backdrop-blur-sm">
      <span className="flex items-center">
        <span className="mr-2">✓</span>
        Event Concluded
      </span>
    </div>
  </div>
</div>


          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">📅</div>
              <p className="text-green-400 font-semibold mb-2 text-xl">Date</p>
              <p className="text-gray-200 text-lg font-bold">1st August 2025</p>
              <p className="text-gray-300 text-sm">(Friday)</p>
            </div>
            <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🕙</div>
              <p className="text-green-400 font-semibold mb-2 text-xl">Time</p>
              <p className="text-gray-200 text-lg font-bold">
                10:00 AM – 4:30 PM
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">💰</div>
              <p className="text-green-400 font-semibold mb-2 text-xl">
                Prize Pool
              </p>
              <p className="text-gray-200 text-lg font-bold">₹3,500</p>
            </div>
          </div>

          {/* Event Type */}
          <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
              <span className="mr-3">🎯</span>
              Event Type
            </h3>
            <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6 text-center">
              <p className="text-green-400 font-bold text-2xl">
                Critical Thinking Challenge
              </p>
              <p className="text-gray-300 mt-2">
                Escape-room-style tech challenge
              </p>
            </div>
          </div>

          {/* Team Formation */}
          <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
              <span className="mr-3">👥</span>
              Team Formation & Participation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">👤</span>
                  <span className="font-semibold text-green-400 text-lg">
                    Team Size:
                  </span>
                </div>
                <p className="text-gray-200 text-2xl font-bold">
                  3 members per team
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">🎫</span>
                  <span className="font-semibold text-green-400 text-lg">
                    Eligibility:
                  </span>
                </div>
                <p className="text-gray-200 text-lg">
                  All participants must hold a Technovista Pass
                </p>
              </div>
            </div>
          </div>

          {/* Tools & Skills */}
          <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
              <span className="mr-3">🧰</span>
              Tools & Skills You Can Use
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">💻</span>
                  <span className="font-semibold text-green-400 text-lg">
                    Basic Programming Knowledge
                  </span>
                </div>
                <p className="text-gray-200">
                  Essential coding skills to solve challenges
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">🔐</span>
                  <span className="font-semibold text-green-400 text-lg">
                    Cryptography & Decoding
                  </span>
                </div>
                <p className="text-gray-200">
                  Code breaking and cipher solving
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">⚡</span>
                  <span className="font-semibold text-green-400 text-lg">
                    Circuit Building
                  </span>
                </div>
                <p className="text-gray-200">Basic electronics knowledge</p>
              </div>
              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">🖼️</span>
                  <span className="font-semibold text-green-400 text-lg">
                    Steganography Tools
                  </span>
                </div>
                <p className="text-gray-200">
                  Finding hidden messages in files
                </p>
              </div>
            </div>
          </div>

          {/* Event Process */}
          <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
              <span className="mr-3">📋</span>
              Event Process
            </h3>
            <div className="space-y-4">
              {[
                {
                  number: "1",
                  title: "Registration",
                  description:
                    "A Google Form will be released for team registrations. Teams must register with accurate member information.",
                },
                {
                  number: "2",
                  title: "WhatsApp Group Addition",
                  description:
                    "All registered teams will be added to an official WhatsApp group for event-related updates.",
                },
                {
                  number: "3",
                  title: "Event Day Execution",
                  description:
                    "Each team will be allotted a time slot on 1st August 2025. Teams participate in their allotted slot to solve the challenge.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6"
                >
                  <div className="flex items-start">
                    <span className="bg-[#00FF41] text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2 text-lg">
                        {step.title}
                      </h4>
                      <p className="text-gray-200">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Guidelines */}
          <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
              <span className="mr-3">📝</span>
              Evaluation Guidelines
            </h3>
            <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>
                    Teams will be monitored while solving the challenge
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>Completion time will be recorded for each team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">•</span>
                  <span>
                    The team that completes the challenge in the shortest time
                    wins
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Communication Channel */}
          <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
              <span className="mr-3">📲</span>
              Communication Channel
            </h3>
            <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center">
                <span className="text-4xl mr-4">💬</span>
                <div>
                  <p className="text-green-400 font-semibold text-lg">
                    WhatsApp Group
                  </p>
                  <p className="text-gray-300">
                    All registered participants will be added to a WhatsApp
                    group for official communications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
        </div>
      </div>
      <FooterTV />
    </>
  );
};

export default DebugOrDie;
