import { useState, useRef, useEffect } from "react";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Zamykanie menu po kliknięciu poza jego obszar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Zamykanie menu przy zmianie rozdzielczości
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false); // Zamknij menu, jeśli przekroczy szerokość dla desktop
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Dodawanie klasy 'scrolled' po przewinięciu
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="w-full text-gray-700 bg-white">
        {/* Menu wrapper */}
        <div
          className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${
            scrolled ? "bg-white shadow-lg border-b border-gray-200" : ""
          }`}>
          <div className="container flex flex-row items-center justify-between py-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:px-0">
            {/* Logo + Menu */}
            <div className="relative flex items-center justify-between w-full md:w-auto">
              <a
                href="#_"
                className="flex items-center font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center">
                <span className="text-xl font-black leading-none text-gray-900 select-none">
                  AUFY<span className="text-indigo-600">.PL</span>
                </span>
              </a>

              {/* Hamburger Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden block text-gray-900 focus:outline-none ml-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center space-x-6 ml-12">
                <a
                  href="#_"
                  className="text-base font-medium leading-6 text-gray-600 hover:text-gray-900">
                  Strona główna
                </a>
                <a
                  href="#_"
                  className="text-base font-medium leading-6 text-gray-600 hover:text-gray-900">
                  Usługi
                </a>
                <a
                  href="#_"
                  className="text-base font-medium leading-6 text-gray-600 hover:text-gray-900">
                  Cennik
                </a>
                <a
                  href="#_"
                  className="text-base font-medium leading-6 text-gray-600 hover:text-gray-900">
                  Kontakt
                </a>
              </nav>
            </div>

            {/* Desktop Logowanie i Rejestracja */}
            <div className="hidden md:inline-flex items-center space-x-6">
              <a
                href="#"
                className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Logowanie
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Rejestracja
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out`}>
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-900 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="flex flex-col p-6 space-y-4">
            <a
              href="#_"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium leading-6 text-gray-600 hover:text-gray-900">
              Strona główna
            </a>
            <a
              href="#_"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium leading-6 text-gray-600 hover:text-gray-900">
              Usługi
            </a>
            <a
              href="#_"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium leading-6 text-gray-600 hover:text-gray-900">
              Cennik
            </a>
            <a
              href="#_"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-medium leading-6 text-gray-600 hover:text-gray-900">
              Kontakt
            </a>
            <div className="border-t border-gray-200 pt-4">
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Logowanie
              </a>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center px-4 py-2 text-lg font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Rejestracja
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main content with padding to compensate for sticky menu */}
      <div className="pt-20"></div>
    </>
  );
};

export default Hero;
