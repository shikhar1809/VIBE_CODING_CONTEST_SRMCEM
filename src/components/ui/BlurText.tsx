"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "chars" | "lines";
  direction?: "top" | "bottom" | "left" | "right";
  onAnimationComplete?: () => void;
  className?: string;
}

export default function BlurText({
  text,
  delay = 0,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className,
}: BlurTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getInitialPosition = () => {
    switch (direction) {
      case "top":
        return { y: -20, opacity: 0, filter: "blur(10px)" };
      case "bottom":
        return { y: 20, opacity: 0, filter: "blur(10px)" };
      case "left":
        return { x: -20, opacity: 0, filter: "blur(10px)" };
      case "right":
        return { x: 20, opacity: 0, filter: "blur(10px)" };
      default:
        return { y: -20, opacity: 0, filter: "blur(10px)" };
    }
  };

  const getFinalPosition = () => {
    return { x: 0, y: 0, opacity: 1, filter: "blur(0px)" };
  };

  const splitText = () => {
    if (animateBy === "words") {
      return text.split(" ");
    } else if (animateBy === "chars") {
      return text.split("");
    } else {
      return [text];
    }
  };

  const parts = splitText();
  const initial = getInitialPosition();
  const final = getFinalPosition();

  return (
    <div className={cn("inline-flex flex-wrap", className)}>
      {parts.map((part, index) => (
        <motion.span
          key={index}
          initial={initial}
          animate={isVisible ? final : initial}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            if (index === parts.length - 1 && onAnimationComplete) {
              onAnimationComplete();
            }
          }}
          className="inline-block"
        >
          {part}
          {animateBy === "words" && index < parts.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </div>
  );
}

