import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FooterTV from "../components/FooterTV";

const Hackathon = () => {
  const [showVideo, setShowVideo] = React.useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-black min-h-screen text-white font-sans pt-12">
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
              Technovista Hackathon 2025
            </h1>
            <div className="mt-4">
              <p className="text-gray-200 text-lg leading-relaxed p-4">
                The software industry is undergoing a monumental shift, evolving
                from traditional code to{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  AI-driven systems
                </span>
                . We are now entering the era of{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  Software 3.0
                </span>
                , where{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  Large Language Models
                </span>{" "}
                are emerging as a new computing paradigm, programmable with
                natural language. This hackathon is your opportunity to be at
                the forefront of this transformation, building innovative
                applications on this new platform. Join us to explore the
                limitless possibilities of{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  vibe coding
                </span>{" "}
                and create the{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  next generation
                </span>{" "}
                of software. Let's build the future together, where{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  everyone can be a programmer
                </span>
                .
              </p>

              {!showVideo && (
                <button
                  onClick={() => setShowVideo(!showVideo)}
                  className="bg-black text-green-500 px-4 py-2 rounded-lg font-semibold underline transition-colors duration-300"
                >
                  Know more
                </button>
              )}
              {showVideo && (
                <div className="mt-3 rounded-xl px-4">
                  <div className="py-3">
                    <h4 className="text-blue-300 font-semibold text-lg mb-2">
                      Watch Andrej Karpathy talk about Software 3.0 at
                      YCombinator
                    </h4>
                  </div>
                  <div className="relative w-full h-0 pb-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/LCEmiRjPEtQ?si=-7C0O-UcfuTen-ny&amp;start=15"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Problem Statements Section */}
          <div className="mb-10">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/10 hover:from-[#00FF41]/30 hover:to-green-500/20 transition-all duration-300 hover:scale-102 hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-[#13EC49] mb-4 flex items-center justify-center">
                <span className="mr-2 text-2xl">📋</span>
                Problem Statements Released!
              </h3>
              <div className="text-center">
                <p className="text-gray-200 text-base mb-4 leading-relaxed">
                  The hackathon problem statements are now available. Click
                  below to view all the exciting challenges waiting for you!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <a
                    href="https://drive.google.com/file/d/1BtYjuKpWoWRf0TXRuJ1HnLi1hGAaBsbK/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-[#00FF41] to-green-500 text-black px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:from-green-500 hover:to-[#00FF41] transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
                  >
                    <span className="mr-2 text-lg">🔗</span>
                    View Problem Statements
                    {/* <span className="ml-2 text-lg">📄</span> */}
                  </a>
                  <div className="inline-flex items-center bg-gradient-to-r from-[#00FF41]/20 to-green-500/20 border border-[#00FF41]/40 text-[#13EC49] px-5 py-2 rounded-lg font-bold text-sm shadow-lg backdrop-blur-sm">
                    <span className="mr-2">✓</span>
                    Event Concluded
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Formation */}
          <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
              <span className="mr-3">💰</span>
              Prize Pool
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-green-400 font-semibold mb-2 text-xl">
                  Total Prize Pool
                </p>
                <p className="text-gray-200 text-3xl font-bold">₹30,000</p>
              </div>
              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <div className="text-3xl mb-3 text-center">🎯</div>
                <p className="text-green-400 font-semibold mb-3 text-lg">
                  Prize Distribution
                </p>
                <p className="text-gray-200 leading-relaxed">
                  Each problem statement will have one winner, and the prize
                  pool will be split equally among all the problem statement
                  winners.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-12">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
                <span className="mr-3"></span>
                Team Formation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
                  <span className="font-semibold text-green-400 text-lg">
                    Team Size:
                  </span>
                  <p className="text-gray-200 mt-1 text-4xl">4</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
                  <span className="font-semibold text-green-400 text-lg">
                    Flexibility:
                  </span>
                  <p className="text-gray-200 mt-1">
                    Inter-college, inter-branch, inter-year
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
                  <span className="font-semibold text-green-400 text-lg">
                    Requirement:
                  </span>
                  <p className="text-gray-200 mt-1">
                    All members must be Technovista pass holders
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
                  <span className="font-semibold text-green-400 text-lg">
                    Eligibility:
                  </span>
                  <p className="text-gray-200 mt-1">
                    Open to students from any college, year, or branch
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 1 and Phase 2 Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Phase 1 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
                <span className="mr-3"></span>
                Phase 1: Ideation Round
              </h3>

              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6 mb-6">
                <p className="text-yellow-200 font-semibold mb-3 text-lg flex items-center">
                  <span className="mr-2">🗓</span>
                  Timeline:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-gray-300">
                      Problem Statements Released:
                    </span>
                    <span className="text-green-400 font-semibold">
                      14th July
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-gray-300">Submission Deadline:</span>
                    <span className="text-green-400 font-semibold">
                      26th July (extended)
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-gray-300">Results Announcement:</span>
                    <span className="text-green-400 font-semibold">
                      27th July
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <p className="text-yellow-200 font-semibold mb-4 text-lg flex items-center">
                  <span className="mr-2"></span>
                  What You Need to Do:
                </p>
                <ol className="space-y-3 text-gray-200">
                  <li className="flex items-start">
                    <span className="bg-[#00FF41] text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      1
                    </span>
                    <span>
                      Pick a problem statement when they are released, form a
                      team, prepare PPT, and record a 6-8 min presentation video
                      ( Zoom is convenient for this ).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#00FF41] text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="mb-2">
                        Then fill the submission form which requires:
                      </p>
                      <ul className="ml-4 mt-1 space-y-1">
                        <li>• Team Name</li>
                        <li>• Team members details</li>
                        <li>• The presentation video (Uploaded to drive)</li>
                        <li>• PPT file link</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-[#00FF41] text-black rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="mb-2">Wait for the results</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl font-bold text-[#13EC49] mb-6 flex items-center">
                <span className="mr-3"></span>
                Phase 2: Build & Solve
              </h3>

              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6 mb-6">
                <p className="text-yellow-200 font-semibold mb-3 text-lg flex items-center">
                  <span className="mr-2">🗓</span>
                  Timeline:
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-gray-300">
                      Problem statements Released:
                    </span>
                    <span className="text-green-400 font-semibold">
                      28th July
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-gray-300">Preference Form:</span>
                    <span className="text-green-400 font-semibold">
                      28th July - 29th July
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-gray-300">
                      Problem Statement Assignment:
                    </span>
                    <span className="text-green-400 font-semibold">
                      31st July
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                    <span className="text-gray-300">Hackathon Starts:</span>
                    <span className="text-green-400 font-semibold">
                      1st August
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-700/10 to-green-500/5 backdrop-blur-lg border border-green-500/20 rounded-xl p-6">
                <p className="text-yellow-200 font-semibold mb-4 text-lg flex items-center">
                  <span className="mr-2"></span>
                  Key Info:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-gray-200">
                      Only shortlisted teams from Phase 1 proceed
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-gray-200">
                      Preference form for Phase 2 problem statements
                      (first-come, first-served)
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-gray-200">
                      Phase 2 problem statements are entirely different from
                      Phase 1
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#00FF41]/10 to-green-500/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <p className="text-2xl text-yellow-200 font-bold mb-4 flex items-center justify-center">
                <span className="mr-3">🔗</span>
                Stay Ready. Stay Sharp.
              </p>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Bring your{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  creativity
                </span>
                ,{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  coding
                </span>
                , and{" "}
                <span className="text-green-400 font-semibold bg-green-400/20 px-2 py-1 rounded-lg">
                  communication
                </span>{" "}
                skills to the table.
              </p>
              <p className="text-xl font-bold text-[#13EC49] mb-6">
                Technovista Hackathon 2025
              </p>
              <div className="inline-flex items-center bg-gradient-to-r from-[#00FF41]/20 to-green-500/20 border border-[#00FF41]/40 text-[#13EC49] px-6 py-3 rounded-xl font-bold text-base shadow-lg backdrop-blur-sm">
                <span className="mr-2 text-lg">✓</span>
                Event Concluded
                <span className="ml-2 text-lg">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterTV />
    </>
  );
};

export default Hackathon;
