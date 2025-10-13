import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { GrPrevious, GrNext } from "react-icons/gr";
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';

import { useTranslation } from 'react-i18next';
import BlurText from '../blurText';

function CustomSwiper() {
  const { t, i18n } = useTranslation();
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

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
        pagination={{ clickable: true }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="h-full">
          <div className="w-full h-screen bg-[url('/img/hero.jpg')] p-16 bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="w-full container m-auto z-10 flex items-center h-full">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center md:text-left w-full"
              >
                <BlurText
                  key={`${i18n.language}-${t('welcome')}`}
                  text={t('welcome')}
                  delay={500}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 px-4"
                />
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-screen bg-[url('/img/hero2.jpg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/50 z-50"></div>
            <div className="w-full container m-auto z-99 flex items-center justify-center lg:justify-start h-full">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-white max-w-xl text-center lg:text-left"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                  {'Star Movie gələcək'}
                </h1>
                <p className="text-lg sm:text-xl opacity-90 leading-relaxed">
                  {'Adi, janri, il, müddət, description və s.'}
                </p>
              </motion.div>
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
