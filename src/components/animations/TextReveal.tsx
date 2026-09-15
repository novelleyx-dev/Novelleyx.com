"use client";
import { motion } from "framer-motion";
import { ElementType } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: ElementType;
}

export function TextReveal({ text, className = "", as: Component = "div" }: TextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const child: import("framer-motion").Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: "100%",
    },
  };

  return (
    <Component className={`${className}`}>
      <motion.span
        className="flex flex-wrap"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {words.map((word, index) => (
          <span key={index} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span variants={child} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
