import { motion } from "framer-motion";
import { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3s
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-8 text-center">Get in Touch</h2>
      {submitted ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center text-green-400 text-2xl"
        >
          Message Sent Successfully!
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-4 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-4 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            required
            className="w-full p-4 bg-gray-700 rounded h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </motion.form>
      )}
    </section>
  );
};

export default Contact;