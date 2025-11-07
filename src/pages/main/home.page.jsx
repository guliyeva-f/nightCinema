import React, { useRef, useEffect } from "react";
import CustomSwiper from "@/components/ui/swiper/customSwiper";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();
  const moviesRef = useRef(null);

  useEffect(() => {
    const tryRegisterScroll = () => {
      if (window.lenis && moviesRef.current) {
        window.scrollToMovies = () => {
          window.lenis.scrollTo(moviesRef.current, { duration: 2.2 });
        };
      } else {
        setTimeout(tryRegisterScroll, 300);
      }
    };
    tryRegisterScroll();
  }, []);

  return (
    <main className="bg-neutral-900 text-white">
      <section className="h-screen">
        <CustomSwiper />
      </section>
      <section
        id="movies-section"
        ref={moviesRef}
        className="h-screen flex items-center text-2xl justify-center bg-[#AA0000] bg-[radial-gradient(circle,_rgba(170,0,0,1)_0%,_rgba(31,28,24,1)_60%,_rgba(0,0,0,1)_100%)]"
      >{t("Movies")}
      </section>
    </main>
  );
}


export default HomePage;