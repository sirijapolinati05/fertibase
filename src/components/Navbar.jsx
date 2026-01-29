import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LOGOS } from "../config/images";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Product", path: "/product" },
    { name: "Resources", path: "/resources" },
    { name: "About", path: "/aboutus" },
    { name: "Career", path: "/CareerPage" },
    { name: "Contact", path: "/contactus" },
  ];

  const closeMenu = () => setIsOpen(false);

  const isProductsPage = location.pathname === "/products" || location.pathname.startsWith("/products/");

  return (
  <nav
    className={`fixed top-0 left-0 right-0 w-full z-[100] shadow-md transition-all duration-300 backdrop-blur-md border-b-2 ${
      isProductsPage ? "border-[#8b3a2a]" : "border-[#c9a89a]"
    }`}
    style={{ backgroundColor: "#efe3d8" }}
  >
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 pl-0 md:pr-1">
      
      {/* Logo */}
      <Link to="/" onClick={closeMenu} className="flex items-center group bg-transparent">
        <img
          src={LOGOS.main}
          alt="FertiBase Logo"
          className="h-12 w-auto object-contain md:h-24 transition-transform group-hover:scale-105 bg-transparent"
          style={{
            backgroundColor: "transparent",
            mixBlendMode: "multiply",
          }}
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 text-text-base font-medium text-md">
        {navLinks.map((link) => {
          const isActive =
            location.pathname === link.path ||
            (link.path === "/products" && isProductsPage);

          return link.path.startsWith("http") ? (
            <a
              key={link.name}
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative px-3 py-2 transition-all duration-300 hover:text-[#a04a38] ${
                isActive ? "text-[#8b3a2a] font-semibold" : "text-text-base"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b3a2a] rounded-full"></span>
              )}
            </a>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-3 py-2 transition-all duration-300 hover:text-[#a04a38] ${
                isActive ? "text-[#8b3a2a] font-semibold" : "text-text-base"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b3a2a] rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-text-base hover:text-[#8b3a2a] focus:outline-none transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-[#f3ede6] border-t-2 border-[#c9a89a] shadow-lg" style={{ backgroundColor: "#faf7f4" }}>
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/products" && isProductsPage);

            return link.path.startsWith("http") ? (
              <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-[#8b3a2a] font-semibold bg-[#f7e6de] border-l-4 border-[#8b3a2a]"
                    : "text-text-base hover:bg-[#f7e6de] hover:text-[#8b3a2a]"
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={closeMenu}
                className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-[#8b3a2a] font-semibold bg-[#f7e6de] border-l-4 border-[#8b3a2a]"
                    : "text-text-base hover:bg-[#f7e6de] hover:text-[#8b3a2a]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    )}
  </nav>
);
}