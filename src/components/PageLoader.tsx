import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";

const PageLoader = () => {
  const location = useLocation();
  const [isShown, setIsShown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const fadeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setIsShown(true);
    setIsVisible(false);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (fadeRef.current) {
      window.clearTimeout(fadeRef.current);
    }
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }

    const minDuration = 1000;
    const fadeDuration = 300;

    rafRef.current = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      fadeRef.current = window.setTimeout(() => {
        setIsShown(false);
      }, fadeDuration);
    }, minDuration);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (fadeRef.current) {
        window.clearTimeout(fadeRef.current);
      }
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [location.pathname]);

  if (!isShown) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={logoIcon}
        alt="DagEnglish loading"
        className="h-24 w-auto animate-pulse"
      />
    </div>
  );
};

export default PageLoader;
