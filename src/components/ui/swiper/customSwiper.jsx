import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { GrPrevious, GrNext } from "react-icons/gr";
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';

import { useTranslation } from 'react-i18next';
import BlurText from '../blurText';
import { CalendarRange, ClockFading } from 'lucide-react';
import $axios from '@/api/accessor';
import { $api } from '@/api/api';
import { API } from '@/api/endpoints';

function CustomSwiper() {
  const { t, i18n } = useTranslation();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchStarMovies = async () => {
      try {
        const res = await $axios.get($api(API["star-movie"]));

        if (res.data.success && Array.isArray(res.data.data)) {
          setMovies(res.data.data);
        }
      } catch (err) {
        console.error("Star movie-lər alınmadı:", err);
      }
    };

    fetchStarMovies();
  }, []);

  useEffect(() => {
  if (
    swiperRef.current &&
    prevRef.current &&
    nextRef.current
  ) {
    swiperRef.current.params.navigation.prevEl = prevRef.current;
    swiperRef.current.params.navigation.nextEl = nextRef.current;
    swiperRef.current.navigation.destroy();
    swiperRef.current.navigation.init();
    swiperRef.current.navigation.update();
  }
}, [movies]);

  return (
    <div className="custom-swiper relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        effect="fade"
        loop={movies.length + 1 >= 2}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="h-full">
          <div className="w-full h-screen bg-[url('/img/hero.jpg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="w-full container m-auto relative z-10 flex items-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center md:text-left w-full"
              >
                <BlurText
                  key={`${i18n.language}-${t('Welcome to Night Cinema')}`}
                  text={t('Welcome to Night Cinema')}
                  delay={500}
                  animateBy="words"
                  direction="top"
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 px-[50px] lg:px-20"
                />
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        {movies.map((movie, index) => (
          <SwiperSlide className='h-full'>
            <div className="w-full h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${movie.backgroundImgUrl})` }}>
              <div className="absolute inset-0 bg-black/70 z-1"></div>
              <div className="w-full p-[50px] lg:p-20 gap-5 relative flex-col z-1 container m-auto h-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl flex justify-center items-start">
                <h1 className="font-semibold max-w-110 text-white" style={{ fontFamily: 'Anton, sans-serif' }}>
                  {movie.name}
                </h1>
                <div className="text-[16px] sm:text-[16px] flex flex-col gap-5 md:text-[20px] lg:text-[24px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <div className='flex-col md:flex-row flex gap-2 md:gap-5'>
                    <span>{movie.genreString
                        ?.split(',')
                        .map(g => g.charAt(0) + g.slice(1).toLowerCase())
                        .join(' | ')}
                    </span>
                    <div className='flex gap-6'>
                      <span className='flex items-center gap-2'><CalendarRange size="20" />{movie.releaseDate}</span>
                      <span className='flex items-center gap-2'><ClockFading size="20" />{movie.movieDuration}</span>
                    </div>
                  </div>
                  <p className='max-w-[650px] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-gray-200'>{movie.description}</p>
                </div>
                <button className="flex items-center gap-1 px-6 py-3 text-sm bg-red-800 rounded-full font-medium cursor-pointer">About</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={prevRef} className="swiper-button-prev-custom"><GrPrevious /></div>
      <div ref={nextRef} className="swiper-button-next-custom"><GrNext /></div>
    </div>
  );
}

export default CustomSwiper;