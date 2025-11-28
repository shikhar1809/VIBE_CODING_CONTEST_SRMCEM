"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
}

export default function TextType({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className,
}: TextTypeProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % text.length);
      } else {
        const deleteTimer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, typingSpeed / 2);
        return () => clearTimeout(deleteTimer);
      }
    } else {
      const currentFullText = text[currentTextIndex];
      if (currentText === currentFullText) {
        setIsPaused(true);
      } else {
        const typeTimer = setTimeout(() => {
          setCurrentText((prev) => currentFullText.slice(0, prev.length + 1));
        }, typingSpeed);
        return () => clearTimeout(typeTimer);
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isPaused, text, typingSpeed, pauseDuration]);

  return (
    <span className={cn("inline-block", className)}>
      {currentText}
      {showCursor && (
        <span className="animate-pulse inline-block ml-1">{cursorCharacter}</span>
      )}
    </span>
  );
}

