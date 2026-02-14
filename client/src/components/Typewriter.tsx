import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 50, className = "", onComplete }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    const cursorTimer = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      <span className={`${isCursorVisible ? "opacity-100" : "opacity-0"} ml-1 text-primary`}>█</span>
    </span>
  );
}
