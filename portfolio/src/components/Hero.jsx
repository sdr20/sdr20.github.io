// components/Hero.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profilePic from "../assets/spooderman.gif"; 

const Hero = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a galaxy/space background
    const starCount = 2000; // More stars for galaxy feel
    const stars = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    // Generate stars with varied colors for cosmic feel
    for (let i = 0; i < starCount * 3; i += 3) {
      // Use spherical distribution for galaxy shape
      const radius = 100 + Math.random() * 900;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      // Apply spiral galaxy shape
      const spiralFactor = 5 * Math.random();
      
      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta + spiralFactor);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta + spiralFactor);
      starPositions[i + 2] = radius * Math.cos(phi) * 0.5; // Flatten the galaxy a bit

      // Various star colors - blue, white, yellow, red
      const colorChoice = Math.random();
      if (colorChoice < 0.2) {
        // Blue stars
        starColors[i] = 0.5 + Math.random() * 0.2;
        starColors[i + 1] = 0.7 + Math.random() * 0.3;
        starColors[i + 2] = 0.9 + Math.random() * 0.1;
      } else if (colorChoice < 0.5) {
        // White stars
        starColors[i] = 0.9 + Math.random() * 0.1;
        starColors[i + 1] = 0.9 + Math.random() * 0.1;
        starColors[i + 2] = 0.9 + Math.random() * 0.1;
      } else if (colorChoice < 0.8) {
        // Yellow/orange stars
        starColors[i] = 0.9 + Math.random() * 0.1;
        starColors[i + 1] = 0.7 + Math.random() * 0.3;
        starColors[i + 2] = 0.4 + Math.random() * 0.2;
      } else {
        // Red stars
        starColors[i] = 0.9 + Math.random() * 0.1;
        starColors[i + 1] = 0.2 + Math.random() * 0.3;
        starColors[i + 2] = 0.2 + Math.random() * 0.1;
      }
      
      // Varied star sizes for depth
      starSizes[i/3] = Math.random() * 3 + 1;
    }

    stars.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    stars.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    // Create points for stars
    const starSystem = new THREE.Points(stars, starMaterial);
    scene.add(starSystem);

    // Add a subtle nebula effect (particles with different colors)
    const nebulaCount = 500;
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    // Generate nebula particles
    for (let i = 0; i < nebulaCount * 3; i += 3) {
      // Use disc-like distribution for nebula
      const radius = 200 + Math.random() * 600;
      const theta = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 300;
      
      nebulaPositions[i] = radius * Math.cos(theta);
      nebulaPositions[i + 1] = height;
      nebulaPositions[i + 2] = radius * Math.sin(theta);

      // Purple/blue nebula colors
      nebulaColors[i] = 0.5 + Math.random() * 0.5;
      nebulaColors[i + 1] = 0.1 + Math.random() * 0.3;
      nebulaColors[i + 2] = 0.8 + Math.random() * 0.2;
    }

    nebulaGeometry.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute("color", new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 15,
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    camera.position.set(0, 0, 800);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      starSystem.rotation.y += 0.0005; // Slow rotation for galaxy
      nebula.rotation.y += 0.0003; // Even slower rotation for nebula
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      starMaterial.dispose();
      stars.dispose();
      nebulaMaterial.dispose();
      nebulaGeometry.dispose();
      scene.remove(starSystem);
      scene.remove(nebula);
    };
  }, []);

  const handleExploreClick = () => {
    navigate("/projects");
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center text-white"
      >
        <motion.img
          src={profilePic}
          alt="Profile"
          onError={(e) => {
            console.error("Failed to load profile image");
            e.target.src = "https://via.placeholder.com/150"; // Fallback image
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(59, 130, 246, 0.7)" }}
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full mx-auto mb-8 border-4 border-blue-400 object-cover shadow-xl"
        />
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
          Hi, I'm Steven Dhaniel Ruelo
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-2xl mx-auto"
        >
          Your Friendly Neighborhood Spooder-Man
        </motion.p>
        <div className="flex justify-center gap-6 mb-8">
          <motion.a
            href="https://github.com/sdr20"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, color: "#60A5FA" }}
            className="text-gray-300"
          >
            <FaGithub size={32} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/steven-dhaniel-ruelo-5796b42a7/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.3, color: "#60A5FA" }}
            className="text-gray-300"
          >
            <FaLinkedin size={32} />
          </motion.a>
        </div>
        <motion.button
          onClick={handleExploreClick}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)" }}
          whileTap={{ scale: 0.95 }}
        >
          Explore My Work
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;