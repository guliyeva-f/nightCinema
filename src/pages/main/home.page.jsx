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
        className="h-screen flex items-center justify-center text-4xl bg-neutral-900"
      >{t("movies")}
      </section>
    </main>
  );
}

export default HomePage;