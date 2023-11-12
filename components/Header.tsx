function Header() {
  return (
    <div className="flex space-x-16 px-8 py-8">
      <div className="flex space-x-16">
        <img src="https://rb.gy/ulxxee" width={100} height={100} alt="logo" />
        <ul className="flex space-x-4">
          <li className="hover:opacity-40 cursor-pointer">Movies</li>
          <li className="hover:opacity-40 cursor-pointer">Series</li>
        </ul>
      </div>
      {/* insert the logo for user here */}
    </div>
  );
}

export default Header;
