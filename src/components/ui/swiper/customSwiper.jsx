import React, { useRef, useEffect } from 'react';
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

function CustomSwiper() {
  const starMovie = {
    name: "Iron Man",
    description:
      'The "Iron Man" movie (2008) is about billionaire industrialist and genius inventor Tony Stark who is kidnapped and forced to build a weapon. Instead, he uses his ingenuity to construct a high-tech suit of armor and escapes captivity. After returning, he refines the suit to become the superhero Iron Man to combat a global conspiracy and protect the world.',
    backgroundImgUrl:
      "https://img10.hotstar.com/image/upload/f_auto,q_auto/sources/r1/cms/prod/9337/809337-i",
    genres: ["Action", "Adventure", "Sci-Fi"],
    movieDuration: "03:32:05",
    releaseDate: "2025-11-03",
  };

  const { t, i18n } = useTranslation();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="custom-swiper relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={30}
        effect="fade"
        loop={true}
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
            <div className="absolute inset-0 bg-black/50"></div>
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
        <SwiperSlide className='h-full'>
          <div className="w-full h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${starMovie.backgroundImgUrl})` }}>
            <div className="absolute inset-0 bg-black/50 z-[1]"></div>
            <div className="w-full p-[50px] lg:p-20 gap-5 relative flex-col z-[2] container m-auto h-full text-5xl sm:text-6xl md:text-7xl lg:text-8xl flex justify-center items-start">
              <h1 className="font-semibold max-w-110" style={{ fontFamily: 'Anton, sans-serif' }}>
                {starMovie.name}
              </h1>
              <div class="text-[16px] sm:text-[16px] flex flex-col gap-5 md:text-[20px] lg:text-[24px]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div className='flex-col md:flex-row flex gap-2 md:gap-5'>
                  <span>{starMovie.genres.join(" | ")}</span>
                  <div className='flex gap-6'>
                    <span className='flex items-center gap-2'><CalendarRange size="20" />{starMovie.releaseDate}</span>
                    <span className='flex items-center gap-2'><ClockFading size="20" />{starMovie.movieDuration}</span>
                  </div>
                </div>
                <p className='max-w-[650px] text-[14px] sm:text-[14px] md:text-[16px] lg:text-[20px] text-gray-200'>{starMovie.description}</p>
              </div>
              <button class="flex items-center gap-1 px-6 py-3 text-sm bg-red-800 rounded-full font-medium cursor-pointer">About</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div ref={prevRef} className="swiper-button-prev-custom"><GrPrevious /></div>
      <div ref={nextRef} className="swiper-button-next-custom"><GrNext /></div>
    </div>
  );
}

export default CustomSwiper;