import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoGrm from '/assets/logo-grm.svg';

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const productos = [
      { name: 'Condominio', path: '/condominio' },
      { name: 'Facturación Digital', path: '/facturacion-digital' },
      { name: 'Equipos y máquinas fiscales', path: '/equipos' },
    ];

    const servicios = [
        { name: 'Saint e integraciones' , path: '/saint' },
        { name: 'Soporte Técnico', path: '/soporte' },
        { name: 'Asesoría Integral', path: '/asesoria' },
    ];

    const navItems = [
        { name: 'Conócenos', path: '/about-us' },
        { name: 'Productos', dropdown: productos },
        { name: 'Servicios', dropdown: servicios },
        { name: 'Blog', path: '#' },
        { name: 'Contáctanos', path: '/contact' },
    ];

    const handleMouseEnter = (itemName) => {
        setOpenDropdown(itemName);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    return (
    <header className="bg-primary text-white sticky top-0 z-50 h-[88px]">
      <div className="w-full h-full mx-auto px-6 py-4 flex justify-between items-center">
        <div className="w-20 h-auto">
           <Link to="/"><img src={logoGrm} alt="GRM Logo" className="w-full h-full" /></Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.dropdown ? (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  {item.name}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="w-48 bg-white text-dark rounded-md shadow-lg">
                      {item.dropdown.map((subItem, index) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className={`block px-4 py-2 hover:bg-secondary hover:text-light transition-colors ${index === 0 ? 'rounded-t-md' : ''} ${index === item.dropdown.length - 1 ? 'rounded-b-md' : ''}`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : item.path.startsWith('#') ? (
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
