import { motion, useAnimation, useScroll, useSpring } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaHome, FaProjectDiagram, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const location = useLocation();

  // Smooth scroll tracking
  const y = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    y.on("change", (latest) => {
      setIsScrolled(latest > 100);
      if (latest > 100) {
        controls.start({ y: -80, transition: { duration: 0.3 } });
      } else if (latest < 100) {
        controls.start({ y: 0, transition: { duration: 0.3 } });
      }
    });

    return () => y.clearListeners();
  }, [y, controls]);

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Contact", path: "/contact", icon: <FaEnvelope /> },
  ];

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
    mini: { height: 60, padding: "0.5rem 1rem", transition: { duration: 0.3 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, color: "#60A5FA", transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate={controls}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 bg-opacity-90 backdrop-blur-lg shadow-xl z-50 border-b border-blue-500/30"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5, textShadow: "0 0 10px #60A5FA" }}
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 tracking-wide"
        >
          [Your Name] {/* Replace with your name */}
        </motion.div>

        {/* Hamburger Menu for Mobile */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-blue-300 transition-colors p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 md:bg-transparent p-4 md:p-0 rounded-b-lg md:rounded-none shadow-lg md:shadow-none transition-all duration-300`}
        >
          {navItems.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-lg font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-blue-200 bg-blue-900/50 rounded-md px-3 py-1"
                      : "text-gray-300 hover:text-blue-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.icon}
                    <span>{item.name}</span>
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;