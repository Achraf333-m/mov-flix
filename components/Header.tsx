import logo from "@/public/Logo.png";
import Image from "next/image";
import { useState, useEffect } from "react";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      });
    };
  }, []);
  return (
    <nav
      className={`${
        scrolled && "bg-black/70"
      } fixed top-0 left-0 right-0 z-10 transition-all duration-500 flex items-center space-x-16 px-8 py-8 bg-transparent`}
    >
      <div className="flex items-center space-x-16">
        <Image
          className="h-auto w-auto"
          src={logo}
          width={100}
          height={100}
          alt="logo"
        />
        <ul className="flex space-x-4">
          <li className="nav-link">Movies</li>
          <li className="nav-link">Series</li>
          <li className="nav-link">Documentaries</li>
          <li className="nav-link">Tv</li>
        </ul>
      </div>
      {/* insert the logo for user here */}
    </nav>
  );
}

export default Header;
