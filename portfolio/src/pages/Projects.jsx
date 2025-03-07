import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects.json";

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        My Projects
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projectsData.map((project, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <ProjectCard
              title={project.title}
              image={project.image}
              desc={project.desc}
              tech={project.tech}
              duration={project.duration}
              liveLink={project.liveLink}
              repoLink={project.repoLink}
              isMobile={project.isMobile}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;