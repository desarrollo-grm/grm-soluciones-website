import { Link } from 'react-router-dom';
import logoGrm from '/assets/logo-grm.svg';

const Header = () => {
    const navItems = [
        { name: 'Conócenos', path: '/about-us' },
        { name: 'Productos', path: '#' },
        { name: 'Servicios', path: '#' },
        { name: 'Blog', path: '#' },
        { name: 'Contáctanos', path: '/contact' },
    ];

    return (
    <header className="bg-primary text-white sticky top-0 z-50 h-[88px]">
      <div className="w-full h-full mx-auto px-6 py-4 flex justify-between items-center">
        <div className="w-20 h-auto">
           <Link to="/"><img src={logoGrm} alt="GRM Logo" className="w-full h-full" /></Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.path.startsWith('#') ? (
              <a key={item.name} href={item.path} className="hover:text-orange-400 transition-colors">
                {item.name}
              </a>
            ) : (
              <Link key={item.name} to={item.path} className="hover:text-orange-400 transition-colors">
                {item.name}
              </Link>
            )
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
