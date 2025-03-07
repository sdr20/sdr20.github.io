import { motion } from "framer-motion";
import { FaMobileAlt } from "react-icons/fa";

const ProjectCard = ({ title, image, desc, tech, duration, liveLink, repoLink, isMobile }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover rounded mb-4" />
        {isMobile && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            whileHover={{ rotate: 10, scale: 1.2 }}
            className="absolute top-2 right-2 bg-blue-500 p-2 rounded-full"
          >
            <FaMobileAlt className="text-2xl text-white" />
          </motion.div>
        )}
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{desc}</p>
      <p className="text-sm text-gray-400 mb-2">Duration: {duration}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((item, idx) => (
          <span key={idx} className="text-sm bg-blue-500 px-2 py-1 rounded">
            {item}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            Live Demo
          </a>
        )}
        {repoLink && (
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline hover:text-blue-300 transition"
          >
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;