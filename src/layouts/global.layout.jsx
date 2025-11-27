import React, { useEffect, useRef } from "react";
import Lenis from 'lenis';
import { Outlet } from "react-router-dom";

function GlobalLayout() {
  const lenis = useRef(null);
  useEffect(() => {
    lenis.current = new Lenis({
      duration: 2.2,
      easing: (t) => 1 - Math.pow(1 - t, 5),
      smooth: true,
      smoothTouch: true,
    });

    window.lenis = lenis.current;
    function raf(time) {
      lenis.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.current.destroy();
      window.lenis = null;
    };
  }, []);

  return <Outlet />;
}

export default GlobalLayout;