import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed w-8 h-8 bg-blue-500 rounded-full pointer-events-none z-50 opacity-50 blur-md"
      animate={{
        x: mousePosition.x - 16, // Offset to center the orb
        y: mousePosition.y - 16,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    />
  );
};

export default CursorFollower;