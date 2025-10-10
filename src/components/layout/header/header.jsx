import React from 'react'
import { NavigationMenuDemo } from './navbar'
import { Link } from 'react-router-dom'
import { LanguageSelect } from './lang.select'
import { ModeToggle } from '@/components/mode-toggle'
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='w-full h-[80px] fixed top-0 left-0 z-50 max-sm:p-[10px] max-md:p-[8px_20px] max-lg:p-[10px_30px] md:h-[90px] max-xl:p-[10px] xl:p-[10px_30px]'>
      <nav className='container m-auto bg-transparent flex items-center justify-between h-full'>
        <Link to={'/'} className='h-full max-lg:order-first shrink-0'><img src="/img/logo.png" alt="logo" className='h-full' /></Link>
        <div className="lg:hidden">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={18} color="#fff"
            rounded duration={0.5} label="Toggle menu"
          />
        </div>
        <NavigationMenuDemo isOpen={isOpen} />
        <div className='flex items-center max-lg:order-first gap-[10px]'>
          <LanguageSelect />
          {/* <ModeToggle /> */}
        </div>
      </nav>
    </header>
  )
}

export default Header