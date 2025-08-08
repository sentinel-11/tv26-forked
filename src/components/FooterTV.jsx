import React from "react";
import { FaLinkedinIn, FaInstagram, FaGlobe } from "react-icons/fa";
import "./TvComponents.css";

const FooterTV = () => {
  return (
    <footer className="relative bg-black text-white w-full overflow-hidden border-t border-yellow-400/30">
      {/* Top golden horizontal shimmer line */}
      <div className="absolute top-0 left-0 w-full">
        <div className="golden-line-horizontal top-line"></div>
      </div>

      {/* Background image (blurred and dimmed) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(Map.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
          filter: "brightness(0.5) contrast(1.2)",
          transform: "scale(1.1)",
        }}
      />

      {/* Animated floating golden lines and threads */}
      <div className="absolute inset-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`golden-line-${n}`}></div>
        ))}

        <div className="golden-thread-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`golden-thread thread-${i}`} />
          ))}
        </div>
      </div>

      {/* Coordinators Section - Above Footer */}
      <div className="relative z-10 w-full px-3 sm:px-6 py-8 border-b border-yellow-400/20" id="coordinators">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-yellow-400 text-center">
            Coordinators
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-4 md:px-8 lg:px-12">
            {/* --- Faculty Coordinators Section --- */}
            <div className="relative flex flex-col items-center text-center p-4 sm:p-6 lg:p-8">
              <div className="golden-corner-top-left" />
              <h3 className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-yellow-400">
                Faculty Coordinators
              </h3>
              <div className="w-full space-y-2 sm:space-y-3 max-w-md mx-auto">
                <div className="bg-gray-900/10 rounded-lg p-2 sm:p-3 border border-yellow-400/20">
                  <p className="font-mono text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">
                    Dr. N. SUNANDA
                  </p>
                  <p className="font-mono text-xs sm:text-sm lg:text-base text-gray-300 break-words mb-2">
                    Dept. of CSE - (CyS, DS) and AI&DS
                  </p>
                  <a
                    href="mailto:sunanda_n@vnrvjiet.in"
                    className="font-mono text-xs sm:text-sm lg:text-base text-yellow-400 hover:text-yellow-300 hover:underline break-all"
                  >
                    sunanda_n@vnrvjiet.in
                  </a>
                </div>
                <div className="bg-gray-900/10 rounded-lg p-4 sm:p-5 border border-yellow-400/20">
                  <p className="font-mono text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">
                    Mr. P. VEERANJANEYULU
                  </p>
                  <p className="font-mono text-xs sm:text-sm lg:text-base text-gray-300 break-words mb-2">
                    Dept. of CSE - (CyS, DS) and AI&DS
                  </p>
                  <a
                    href="mailto:veeranjaneyulu_p@vnrvjiet.in"
                    className="font-mono text-xs sm:text-sm lg:text-base text-yellow-400 hover:text-yellow-300 hover:underline break-all"
                  >
                    veeranjaneyulu_p@vnrvjiet.in
                  </a>
                </div>
              </div>
              <div className="golden-corner-bottom-right" />
            </div>

            {/* --- Student Coordinators Section --- */}
            <div className="relative flex flex-col items-center text-center p-4 sm:p-6 lg:p-8">
              <div className="golden-corner-top-left" />
              <h3 className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-yellow-400">
                Student Coordinators
              </h3>
              <div className="text-white w-full text-center space-y-4 sm:space-y-5 max-w-md mx-auto">
                <div className="bg-gray-900/10 rounded-lg p-4 sm:p-5 border border-yellow-400/20">
                  <p className="font-mono text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">
                    Avinash
                  </p>
                  <p className="font-mono text-xs sm:text-sm lg:text-base text-yellow-400">
                    +91 89194 09686
                  </p>
                </div>
                <div className="bg-gray-900/10 rounded-lg p-4 sm:p-5 border border-yellow-400/20">
                  <p className="font-mono text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">
                    Vardhan
                  </p>
                  <p className="font-mono text-xs sm:text-sm lg:text-base text-yellow-400">
                    +91 93467 06032
                  </p>
                </div>
                <div className="bg-gray-900/10 rounded-lg p-4 sm:p-5 border border-yellow-400/20">
                  <p className="font-mono text-sm sm:text-base lg:text-lg font-semibold text-white mb-2">
                    Sai Charan
                  </p>
                  <p className="font-mono text-xs sm:text-sm lg:text-base text-yellow-400">
                    +91 73966 31151
                  </p>
                </div>
              </div>
              <div className="golden-corner-bottom-right" />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 w-full px-3 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-none px-2 sm:px-4 md:px-8 lg:px-12">
          {/* --- Contact Section --- */}
          <div className="relative flex flex-col items-center text-center p-4 sm:p-6 lg:p-8">
            <div className="golden-corner-top-left" />
            <h2 className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-yellow-400">
              Contact Us
            </h2>
            <div className="text-white w-full text-center space-y-3 sm:space-y-4">
              {/* Email */}
              <p className="font-mono text-sm sm:text-base lg:text-lg">
                <span className="font-semibold text-yellow-400">Email:</span>
                <br />
                <span className="break-all text-sm sm:text-base">
                  vjdataquesters.club@gmail.com
                </span>
              </p>

              {/* Address */}
              <div className="flex flex-col items-center justify-center">
                <p className="font-mono text-sm sm:text-base lg:text-lg">
                  <span className="font-semibold text-yellow-400">
                    Address:
                  </span>
                  <br />
                  <span className="text-sm sm:text-base">
                    VNR VJIET, Bachupally, Hyderabad
                  </span>
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center space-x-4 sm:space-x-6 lg:space-x-8 mt-4 sm:mt-6">
              <a
                href="https://www.instagram.com/vjdataquesters.club/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transform transition-transform hover:scale-110"
              >
                <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
              <a
                href="https://www.linkedin.com/company/vj-data-questers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transform transition-transform hover:scale-110"
              >
                <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
              <a
                href="https://www.vjdataquesters.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300 transform transition-transform hover:scale-110"
              >
                <FaGlobe className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
            </div>
            <div className="golden-corner-bottom-right" />
          </div>

          {/* --- Quick Links Section --- */}
          <div className="relative flex flex-col items-center text-center p-4 sm:p-6 lg:p-8">
            <div className="golden-corner-top-left" />
            <h2 className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-yellow-400">
              Quick Links
            </h2>
            <div className="w-full flex justify-center">
              <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-5 w-full max-w-xs">
                <a
                  href="https://www.vjdataquesters.com/about"
                  target="_blank"
                  className="font-mono text-sm sm:text-base lg:text-lg hover:text-yellow-400 transform transition-all duration-300 hover:translate-x-1 text-center"
                >
                  About Us
                </a>
                <a
                  href="/technovista/events"
                  className="font-mono text-sm sm:text-base lg:text-lg hover:text-yellow-400 transform transition-all duration-300 hover:translate-x-1 text-center"
                >
                  Events
                </a>
                <a
                  href="/technovista/devs"
                  className="font-mono text-sm sm:text-base lg:text-lg hover:text-yellow-400 transform transition-all duration-300 hover:translate-x-1 text-center"
                >
                  Developed by
                </a>
                <a
                  href="/technovista/terms-and-conditions"
                  target="_blank"
                  className="font-mono text-sm sm:text-base lg:text-lg hover:text-yellow-400 transform transition-all duration-300 hover:translate-x-1 text-center"
                >
                  Terms and Conditions
                </a>
              </div>
            </div>
            <div className="golden-corner-bottom-right" />
          </div>

          {/* --- Location / Map Section --- */}
          <div className="relative flex flex-col items-center text-center p-4 sm:p-6 lg:p-8 sm:col-span-2 lg:col-span-1">
            <div className="golden-corner-top-left" />
            <h2 className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-yellow-400">
              Location
            </h2>
            <div className="w-full aspect-video rounded-lg overflow-hidden border-2 border-[#daa425] shadow-md max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11075.568485372974!2d78.3888612092676!3d17.539494326822695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e0ab28e0975%3A0x7b048b2858fdee94!2sVallurupalli%20Nageswara%20Rao%20Vignana%20Jyothi%20Institute%20of%20Engineering%20%26Technology!5e0!3m2!1sen!2sin!4v1750646504693!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/69xL8NXPXzC3zQPk8"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono mt-3 sm:mt-4 inline-block px-3 py-2 rounded-lg border border-[#daa425] text-[#f2ca46] font-medium text-sm sm:text-base hover:bg-[#daa425] hover:text-black transition duration-300 shadow-md"
            >
              Open in Maps →
            </a>
            <div className="golden-corner-bottom-right" />
          </div>
        </div>

        {/* --- Footer Bottom Copyright */}
        <div className="text-center mt-8 pt-6 w-full relative">
          <div className="golden-line-horizontal" />
          <p className="font-mono text-base sm:text-lg lg:text-xl mt-5 text-yellow-400/80">
            © 2025 TechnoVista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterTV;
