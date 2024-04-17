import { useState, useEffect } from "react";

export const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Очистка подписки
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};
