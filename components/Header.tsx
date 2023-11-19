import logo from '@/public/Logo.png'
import Image from 'next/image';


function Header() {
  return (
    <nav className="flex items-center space-x-16 px-8 py-8 bg-transparent">
      <div className="flex items-center space-x-16">
        <Image className='h-auto w-auto' src={logo} width={100} height={100} alt="logo" />
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

export default Header