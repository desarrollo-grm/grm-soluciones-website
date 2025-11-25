import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoGrm from '/assets/logo-grm.svg';
import { getProductsForNav, getServicesForNav } from '/src/data/services.js';

const Header = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const productos = getProductsForNav();
    const servicios = getServicesForNav();

    const navItems = [
        { name: 'Conócenos', path: '/about-us' },
        { name: 'Productos', dropdown: productos },
        { name: 'Servicios', dropdown: servicios },
        { name: 'Blog', path: '/blog' },
        { name: 'Contáctanos', path: '/contact' },
    ];

    const handleMouseEnter = (itemName) => {
        setOpenDropdown(itemName);
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    const handleDropdownClick = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setOpenDropdown(null); // Close any open dropdowns when toggling menu
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    };

    const toggleDropdown = (itemName) => {
        setOpenDropdown(openDropdown === itemName ? null : itemName);
    };

    // Close mobile menu on route change
    useEffect(() => {
        closeMobileMenu();
    }, [location.pathname]);

    // Handle Escape key to close mobile menu
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isMobileMenuOpen) {
                closeMobileMenu();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [isMobileMenuOpen]);

    // Close dropdown when clicking outside (only for desktop)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown && !isMobileMenuOpen && !event.target.closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openDropdown, isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

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
                className="relative group dropdown-container"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button 
                  onClick={() => handleDropdownClick(item.name)}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
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
                          onClick={() => setOpenDropdown(null)}
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
          <button 
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Open menu"
          >
            {/* Hamburger Icon */}
            <svg 
              className="w-6 h-6 transition-transform duration-300"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-primary z-50 md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Close Button Inside Menu */}
        <div className="absolute top-6 right-6">
          <button 
            onClick={closeMobileMenu}
            className="text-white focus:outline-none"
            aria-label="Close menu"
          >
            <svg 
              className="w-8 h-8 transition-transform duration-300 hover:rotate-90"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center h-full px-8 space-y-6">
          {/* Home Link */}
          <Link 
            to="/"
            onClick={closeMobileMenu}
            className="text-white text-2xl font-medium hover:text-secondary transition-colors"
          >
            Inicio
          </Link>
          
          {navItems.map((item) => (
            item.dropdown ? (
              <div key={item.name} className="w-full">
                <button 
                  onClick={() => toggleDropdown(item.name)}
                  className="w-full text-white text-2xl font-medium hover:text-secondary transition-colors flex items-center justify-center gap-2"
                >
                  {item.name}
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : 'rotate-0'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {/* Accordion Dropdown */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openDropdown === item.name ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col space-y-3">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        onClick={closeMobileMenu}
                        className="text-white text-lg hover:text-secondary transition-colors text-center"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={closeMobileMenu}
                className="text-white text-2xl font-medium hover:text-secondary transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
