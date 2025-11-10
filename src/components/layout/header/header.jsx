import React, { useState } from "react";
import { NavigationMenuDemo } from "./navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LanguageSelect } from "./lang.select";
import { Squash as Hamburger } from "hamburger-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 2.0 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        window.lenis?.scrollTo(0, { duration: 2.0 });
      }, 600);
    }
  };

  return (
    <header className='w-full h-20 fixed top-0 left-0 z-50 max-sm:p-2.5 max-md:p-[8px_20px] max-lg:p-[10px_30px] md:h-[90px] max-xl:p-2.5 xl:p-[10px_30px]'>
      <nav className='container m-auto bg-transparent flex items-center justify-between h-full'>
        <Link to="/"
          onClick={handleLogoClick}
          className="h-full max-lg:order-first shrink-0 cursor-pointer"
        ><img src="/img/logo.png" alt="logo" className="h-full" />
        </Link>
        <div className="lg:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            size={18}
            color="#fff"
            rounded
            duration={0.5}
            label="Toggle menu"
          />
        </div>
        <NavigationMenuDemo isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <div className='flex items-center max-lg:order-first gap-2.5'>
          <LanguageSelect />
        </div>
      </nav>
    </header>
  );
}

export default Header;