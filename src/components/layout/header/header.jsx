import React from 'react'
import { NavigationMenuDemo } from './navbar'
import { Link } from 'react-router-dom'
import { LanguageSelect } from './lang.select'
import { ModeToggle } from '@/components/mode-toggle'

function Header() {
  return (
    <header>
       <nav className='flex items-center justify-between container  mx-auto'>
        <Link to={'/'} className='text-[30px] font-medium'>Logo</Link>
         <NavigationMenuDemo/>
        <div className='flex items-center gap-[10px]'>
           <LanguageSelect/>
           <ModeToggle/>
        </div>
       </nav>
    </header>
  )
}

export default Header