// components/Footer.jsx
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-12 bg-gradient-to-t from-gray-900 to-blue-950 text-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Glassmorphic Container */}
        <div className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 shadow-lg">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()} Steven Dhaniel Ruelo. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <motion.a
              href="https://github.com/sdr2"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 360, color: "#60A5FA" }}
              className="text-gray-300 transition-colors"
            >
              <FaGithub size={28} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/steven-dhaniel-ruelo-5796b42a7/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -360, color: "#60A5FA" }}
              className="text-gray-300 transition-colors"
            >
              <FaLinkedin size={28} />
            </motion.a>
          </div>
          <p className="text-xs md:text-sm text-gray-400 mt-4">
            Crafted with <span className="text-blue-400">React.js</span>,{" "}
            <span className="text-teal-400">Tailwind CSS</span>,{" "}
            <span className="text-purple-400">Three.js</span>, and{" "}
            <span className="text-orange-400">Vite</span>
          </p>
        </div>
      </div>
      {/* Subtle Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
          <defs>
            <pattern id="footer-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#60A5FA" />
            </pattern>
          </defs>
        </svg>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;