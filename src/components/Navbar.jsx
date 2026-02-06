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

  const isProductsPage =
    location.pathname === "/products" ||
    location.pathname.startsWith("/products/");

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-[100]
        border-b-2 shadow-sm backdrop-blur-md
        ${isProductsPage ? "border-[#8b3a2a]" : "border-[#c9a89a]"}
      `}
      style={{ backgroundColor: "#efe3d8" }}
    >
      <div
        className="
          max-w-7xl mx-auto
          flex items-center justify-between
          px-4
          py-2
          md:py-3
        "
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center"
        >
          <img
            src={LOGOS.main}
            alt="FertiBase Logo"
            className="
              h-9
              sm:h-10
              md:h-14
              lg:h-16
              w-auto
              object-contain
            "
            style={{
              backgroundColor: "transparent",
              mixBlendMode: "multiply",
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-text-base font-medium">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/products" && isProductsPage);

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  relative px-2 py-1 transition-colors duration-300
                  hover:text-[#a04a38]
                  ${isActive ? "text-[#8b3a2a] font-semibold" : ""}
                `}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8b3a2a] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-base hover:text-[#8b3a2a]"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#c9a89a] bg-[#faf7f4]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === "/products" && isProductsPage);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`
                    block px-4 py-2 rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-[#f7e6de] text-[#8b3a2a] font-semibold border-l-4 border-[#8b3a2a]"
                        : "hover:bg-[#f7e6de]"
                    }
                  `}
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
