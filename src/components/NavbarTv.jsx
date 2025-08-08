import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Bars from "../assets/bars.svg"; // Make sure this path is valid

function NavbarTv() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50  border-b border-yellow-500/10 backdrop-blur-lg box-border">
      <div className="mx-auto max-w-screen px-3 sm:px-5 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logos and cross */}
          <div className="flex items-center space-x-3 gap-4">
            <a href="https://vnrvjiet.ac.in/" target="_blank" rel="noreferrer">
              <img
                src="/events/Technovista2025/tv25-icons/VNRVJIET-logo-files-03.png"
                alt="Logo 2"
                className="h-12 w-auto object-contain"
              />
            </a>
            <a
              href="https://www.vjdataquesters.com/home"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/events/Technovista2025/tv25-icons/dq-vector.png"
                alt="Logo 1"
                className="h-[4rem] w-auto object-contain p-1"
              />
            </a>
          </div>

          {/* Right: Desktop Links */}
          <div className="hidden md:flex space-x-2">
            {location.pathname !== "/technovista" && (
              <button
                onClick={() => handleNavigate("/technovista")}
                className="font-mono text-[#daa425] px-5 py-1.5 rounded-lg font-semibold hover:bg-[#121210] transition-all duration-300"
              >
                Home
              </button>
            )}
            <button
              onClick={() => handleNavigate("/technovista/events")}
              className="font-mono text-[#daa425] px-5 py-1.5 rounded-lg font-semibold hover:bg-[#121210] transition-all duration-300"
            >
              All Events
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div
            ref={menuButtonRef}
            className="md:hidden cursor-pointer"
            onClick={handleMenuToggle}
          >
            <img src={Bars} alt="Menu" className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-16 right-4 max-w-[90vw] w-48 z-50 rounded-xl shadow-xl border border-yellow-500/10 backdrop-blur-lg bg-[#1a1a1a]"
        >
          <div className="flex flex-col divide-y divide-yellow-500/10">
            {location.pathname !== "/technovista" && (
              <button
                onClick={() => handleNavigate("/technovista")}
                className="px-4 py-3 text-left font-mono text-white hover:text-yellow-400 transition-all"
              >
                Home
              </button>
            )}
            <button
              onClick={() => handleNavigate("/technovista/events")}
              className="px-4 py-3 text-left font-mono text-white hover:text-yellow-400 transition-all"
            >
              All Events
            </button>
            {location.pathname !== "/technovista/register" && (
              <button
                onClick={() => handleNavigate("/technovista/register")}
                className="px-4 py-3 text-left font-mono text-white hover:text-yellow-400 transition-all"
              >
                Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarTv;
