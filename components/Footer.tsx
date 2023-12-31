import Image from "next/image";
import logo from "@/public/Logo.png";

function Footer() {
  return (
    <div className="h-80 flex flex-col space-y-8 items-center justify-center">
      <Image
        className="h-auto w-auto"
        src={logo}
        width={100}
        height={100}
        alt="logo"
      />
     
        <ul className="flex space-x-4">
          <li onClick={() => alert('This feature has not been implemented yet, sorry :(')} className="nav-link">Movies</li>
          <li onClick={() => alert('This feature has not been implemented yet, sorry :(')} className="nav-link">Series</li>
          <li onClick={() => alert('This feature has not been implemented yet, sorry :(')} className="nav-link">Documentaries</li>
          <li onClick={() => alert('This feature has not been implemented yet, sorry :(')} className="nav-link">Tv</li>
        </ul>
      <h2 className="font-extralight text-sm text-green-800">All rights reserved &copy;</h2>
      <h3 className="text-xs text-green-900/70 text-center max-w-sm">*****This is simply a project I made to showcase my skills in web development, it is not a real app and the payment page only accepts "test" credit cards*****</h3>
    </div>
  );
}

export default Footer;
