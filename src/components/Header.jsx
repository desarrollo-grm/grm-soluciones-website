import logoGrm from '../../assets/logo-grm.svg';

const Header = () => {
    const navItems = ['Conócenos', 'Productos', 'Servicios', 'Blog', 'Contáctanos'];

    return (
    <header className="bg-primary text-white sticky top-0 z-50 h-[88px]">
      <div className="w-full h-full mx-auto px-6 py-4 flex justify-between items-center">
        <div className="w-20 h-auto">
           <a href="/"><img src={logoGrm} alt="GRM Logo" className="w-full h-full" /></a>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a key={item} href="#" className="hover:text-orange-400 transition-colors">
              {item}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
