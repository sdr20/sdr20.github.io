import { motion } from "framer-motion";

const Timeline = () => {
  const events = [
    { year: "2023", desc: "Developed a chat app using React.js." },
{ year: "2024", desc: "Created a Flutter application and IoT device for agriculture." },
{ year: "2024", desc: "Built an e-commerce app using Flutter." },
{ year: "2025", desc: "Implemented a payroll system using the MEVN stack (MongoDB, Express, Vue.js, Node.js)." },
{ year: "2025", desc: "Created this portfolio using React.js." },

  ];

  return (
    <div className="py-10">
      <h2 className="text-4xl font-bold mb-8 text-center">My Journey</h2>
      <div className="space-y-8">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="flex items-center"
          >
            <div className="w-1/4 text-right pr-6">
              <span className="text-xl font-semibold text-blue-400">{event.year}</span>
            </div>
            <div className="w-3/4 border-l-4 border-blue-500 pl-6">
              <p className="text-lg">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;