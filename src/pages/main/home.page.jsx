import React, { useRef, useEffect, useState } from "react";
import CustomSwiper from "@/components/ui/swiper/customSwiper";
import { MovieCard } from "@/components/layout/main/flip-card";
import $axios from "@/api/accessor";
import { $api } from "@/api/api";
import { API } from "@/api/endpoints";
import { PacmanLoader } from "react-spinners";

function HomePage() {
  const moviesRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await $axios.get($api(API["all-movie"]));
        setMovies(res.data.data || []);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            setErrorMsg("İnternet bağlantınız yoxdur..");
          } else if (error.response.status === 503) {
            setErrorMsg("Server bağlıdır, backendçi ilə əlaqə saxlayın..");
          } else {
            setErrorMsg("Naməlum xəta baş verdi");
          }
        } else {
          setErrorMsg("Serverə qoşulmaq mümkün olmadı..");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
      <section id="movies-section" ref={moviesRef}
        className="bg-[#AA0000] relative flex justify-center py-12 bg-[radial-gradient(circle,rgba(170,0,0,1)_0%,rgba(31,28,24,1)_60%,rgba(0,0,0,1)_100%)]">
        <div className="absolute m-0 inset-0 flex z-2 bg-linear-to-b from-[#100000] to-transparent pointer-events-none"></div>
        {loading ? (
          <PacmanLoader color="#ffffff" size={30} speedMultiplier={1}/>
        ) : errorMsg ? (
          <p className="text-white text-xl font-semibold text-center z-5">
            {errorMsg}
          </p>
        ) : (
          <MovieCard movies={movies} />
        )}
      </section>
    </main>
  );
}
export default HomePage;