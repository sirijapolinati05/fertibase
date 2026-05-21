import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LOGOS } from "../config/images";
import { useTranslation } from "../i18n/useTranslation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, supportedLanguages, t } =
    useTranslation();

  const location = useLocation();

  const navLinks = [
    { key: "nav_home", path: "/" },
    { key: "nav_product", path: "/product" },
    { key: "nav_resources", path: "/resources" },
    { key: "nav_about", path: "/aboutus" },
    { key: "nav_career", path: "/CareerPage" },
    { key: "nav_contact", path: "/contactus" },
  ];

  const closeMenu = () => setIsOpen(false);

  const isProductsPage =
    location.pathname === "/product" ||
    location.pathname.startsWith("/product/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        right-0

        z-[100]

        transition-all
        duration-500
        ease-in-out

        backdrop-blur-2xl

        ${
          isScrolled
            ? `
              bg-white/22
              shadow-[0_10px_35px_rgba(0,0,0,0.12)]
            `
            : `
              bg-white/12
              shadow-[0_6px_20px_rgba(0,0,0,0.05)]
            `
        }

        border-b

        ${
          isProductsPage
            ? "border-[#8b3a2a]/30"
            : "border-white/20"
        }
      `}
      style={{
        WebkitBackdropFilter:
          "blur(24px)",
      }}
    >

      {/* overlay */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-b
          from-white/20
          to-white/5

          pointer-events-none
        "
      />

      <div
        className="
          relative
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between

          px-4
          py-2

          md:py-3
        "
      >

        {/* LOGO */}
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
              w-auto

              object-contain

              sm:h-10
              md:h-14
              lg:h-16
            "
            style={{
              mixBlendMode:
                "multiply",
            }}
          />

        </Link>

        {/* DESKTOP */}
        <div
          className="
            hidden
            items-center
            space-x-7
            md:flex
          "
        >

          {navLinks.map((link) => {
            const isActive =
              location.pathname ===
                link.path ||
              (link.path ===
                "/product" &&
                isProductsPage);

            return (
              <Link
                key={link.key}
                to={link.path}
                className={`
                  relative

                  px-3
                  py-1

                  text-[15px]

                  transition-all
                  duration-300

                  hover:text-[#8b3a2a]
                  hover:scale-[1.03]

                  ${
                    isActive
                      ? "text-[#8b3a2a] font-semibold"
                      : "text-[#2b2b2b]"
                  }
                `}
              >

                {t(link.key)}

                {isActive && (
                  <span
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-1

                      h-[2px]

                      rounded-full

                      bg-[#8b3a2a]
                    "
                  />
                )}

              </Link>
            );
          })}

          <label className="sr-only" htmlFor="language-switcher">
            {t("nav_language", "Language")}
          </label>
          <select
            id="language-switcher"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-full border border-white/30 bg-white/60 px-3 py-1 text-[14px] text-[#2b2b2b] outline-none backdrop-blur-md"
            aria-label={t("nav_language", "Language")}
          >
            {supportedLanguages.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>

        </div>

        {/* MOBILE */}
        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
          className="
            text-[#333]
            md:hidden
          "
          aria-label={t("nav_menu", "Menu")}
        >

          {isOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}

        </button>

      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className="
            md:hidden

            border-t
            border-white/20

            bg-white/20

            backdrop-blur-3xl
          "
        >

          <div className="space-y-3 px-4 py-4">

            {navLinks.map((link) => {
              const isActive =
                location.pathname ===
                  link.path ||
                (link.path ===
                  "/product" &&
                  isProductsPage);

              return (
                <Link
                  key={link.key}
                  to={link.path}
                  onClick={closeMenu}
                  className={`
                    block

                    rounded-xl

                    px-4
                    py-3

                    transition

                    backdrop-blur-md

                    ${
                      isActive
                        ? `
                          border
                          border-white/30
                          bg-white/40
                          text-[#8b3a2a]
                        `
                        : `
                          hover:bg-white/20
                        `
                    }
                  `}
                >

                  {t(link.key)}

                </Link>
              );
            })}

            <div className="pt-2">
              <label
                htmlFor="mobile-language-switcher"
                className="mb-2 block text-sm font-medium text-[#2b2b2b]"
              >
                {t("nav_language", "Language")}
              </label>
              <select
                id="mobile-language-switcher"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3 text-[#2b2b2b] outline-none"
              >
                {supportedLanguages.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

        </div>
      )}

    </nav>
  );
}
