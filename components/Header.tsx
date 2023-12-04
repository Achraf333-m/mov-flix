import logo from "@/public/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MdOutlineManageAccounts } from "react-icons/md";

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
        scrolled && "bg-black/90"
      } fixed top-0 left-0 right-0 z-10 transition-all duration-500 flex items-center space-x-16 px-8 py-8`}
    >
      <div className="flex items-center justify-around space-x-4 w-full">
        <Link href="/">
          <Image
            className="h-auto w-auto cursor-pointer"
            src={logo}
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
        <ul className="flex space-x-4">
          <li className="nav-link">Movies</li>
          <li className="nav-link">Series</li>
          <li className="nav-link">Documentaries</li>
          <li className="nav-link">Tv</li>
          <li className="nav-link">New!</li>
          <li className="nav-link">Kids</li>
          <li className="nav-link">Movie Night</li>
        </ul>
        <Link href="/account">
          <MdOutlineManageAccounts className="w-10 h-10 cursor-pointer nav-link" />
        </Link>
      </div>
    </nav>
  );
}

export default Header;
