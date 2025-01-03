"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// CursorFollowEffect component
const CursorFollowEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "50px",
        height: "50px",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        pointerEvents: "none", // To ensure it doesn't block other elements
      }}
      animate={{
        x: mousePosition.x - 25, // Positioning the box at the cursor
        y: mousePosition.y - 25, // Adjusting the box's position to center it on the cursor
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    />
  );
};

export default CursorFollowEffect;
