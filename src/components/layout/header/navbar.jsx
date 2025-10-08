import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function NavigationMenuDemo({isOpen}) {
  const { t, i18n } = useTranslation();
  return (
     <div className={`flex flex-col lg:flex-row gap-6 items-center py-10
                         font-medium text-white px-4 lg:px-6 lg:py-3 backdrop-blur bg-black/50 lg:bg-black/10 lg:h-[55px] h-screen
                         border border-gray-300/20 lg:border-0 duration-300
                         max-lg:fixed max-lg:top-[81px] max-lg:left-0
                         max-lg:w-full max-lg:rounded-br-3xl max-lg:rounded-tr-3xl max-lg:transition-all transition-opacity
                        ${isOpen ? 'opacity-100' : 'opacity-0'} ${isOpen ? 'max-sm:w-full sm:w-1/2 md:w-1/3 lg:w-auto' : 'max-sm:w-0 sm:w-0 lg:w-auto'}
                         lg:opacity-100 lg:static lg:w-auto lg:rounded-full
                     `}>
      <Link className="lg:text-[18px] text-[22px]" to="/movies">{t('movies')}</Link>
      <Link className="lg:text-[18px] text-[22px]" to="/theaters">{t('theaters')}</Link>
      <Link className="lg:text-[18px] text-[22px]" to="/contact">{t('contact')}</Link>
      <Link className="lg:text-[18px] text-[22px]" to="/profile">{t('profile')}</Link>
    </div>
  );
}