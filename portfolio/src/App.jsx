// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function App() {
  const useMouseX = () => {
    const [mouseX, setMouseX] = useState(0);
    useEffect(() => {
      const updateMouseX = (e) => setMouseX(e.clientX);
      window.addEventListener("mousemove", updateMouseX);
      return () => window.removeEventListener("mousemove", updateMouseX);
    }, []);
    return mouseX;
  };

  const useMouseY = () => {
    const [mouseY, setMouseY] = useState(0);
    useEffect(() => {
      const updateMouseY = (e) => setMouseY(e.clientY);
      window.addEventListener("mousemove", updateMouseY);
      return () => window.removeEventListener("mousemove", updateMouseY);
    }, []);
    return mouseY;
  };

  const mouseX = useMouseX();
  const mouseY = useMouseY();

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden font-sans">
          <motion.div
            className="fixed top-0 left-0 w-6 h-6 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
            animate={{ x: mouseX - 12, y: mouseY - 12 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <Navbar />
          <div className="relative z-10 pt-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;