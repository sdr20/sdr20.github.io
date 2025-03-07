import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
} from "react-icons/fa";
import { SiFlutter, SiTailwindcss } from "react-icons/si";

const Home = () => {
  const tools = [
    { name: "React.js", icon: <FaReact className="text-4xl text-blue-400" /> },
    { name: "Flutter", icon: <SiFlutter className="text-4xl text-blue-600" /> },
    { name: "Vue.js", icon: <FaVuejs className="text-4xl text-green-500" /> },
    { name: "HTML", icon: <FaHtml5 className="text-4xl text-orange-500" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-4xl text-blue-500" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-4xl text-green-600" /> },
    { name: "Figma", icon: <FaFigma className="text-4xl text-purple-500" /> },
    { name: "MongoDB", icon: <FaDatabase className="text-4xl text-green-700" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-4xl text-teal-500" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Hero />
      <section className="container mx-auto px-4">
        <div className="py-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6 text-center"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            I am a Bachelor of Science in Information Technology graduate with a strong passion for full-stack development. I specialize in React, Vue, Flutter, and have experience with MongoDB, SQL, and Firebase. I enjoy creating dynamic and efficient applications, both web and mobile, and am always eager to learn and take on new challenges!
          </motion.p>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
            className="mt-6 px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition mx-auto block"
          >
            Download Resume
          </motion.button>
        </div>
        <div className="py-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6 text-center"
          >
            Tools & Skills
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center"
          >
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-4 bg-gray-800 rounded-lg flex flex-col items-center"
              >
                {tool.icon}
                <span className="text-lg mt-2">{tool.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <Timeline />
      </section>
    </>
  );
};

export default Home;