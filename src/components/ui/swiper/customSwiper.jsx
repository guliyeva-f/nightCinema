import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { GrPrevious, GrNext } from "react-icons/gr";

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
          <div className="w-full h-screen bg-[url('/hero.jpg')] p-16 bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="w-full container m-auto z-10 flex items-center h-full">
              <BlurText
                key={`${i18n.language}-${t('welcome')}`}
                text={t('welcome')}
                delay={500}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-8xl mb-8"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-screen bg-[url('/hero2.jpg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/50 z-50"></div>
            <div className="w-full container m-auto z-99 flex items-center h-full">
              <h1 className="text-white text-6xl font-bold w-1/2">bura star movie gelecek (ad, janr, ili,description, muddeti)</h1>
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
