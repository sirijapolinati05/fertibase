import {
  Youtube,
  Instagram,
  Mail,
  Facebook,
  Linkedin,
  Phone,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LOGOS } from "../config/images";
import { useTranslation } from "../i18n/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://www.facebook.com/profile.php?id=61573758428179",
      label: "Facebook",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/fertibase_agri_solutions",
      label: "Instagram",
    },
    {
      icon: <Youtube className="h-5 w-5" />,
      href: "https://www.youtube.com/@FertiBase",
      label: "YouTube",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/company/fertibase/posts/?feedView=all",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:Info@fertibase.in",
      label: "Email",
    },
  ];

  return (
    <footer
      className="relative overflow-hidden pb-8 pt-12 text-text-base md:pt-16"
      style={{ backgroundColor: "#efe3d8" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-3"
            >
              <img
                src={LOGOS.main}
                alt="FertiBase Logo"
                className="h-12 w-auto object-contain bg-transparent transition-transform group-hover:scale-105 md:h-24"
                style={{
                  backgroundColor: "transparent",
                  mixBlendMode: "multiply",
                }}
              />
            </motion.div>

            <p className="text-sm leading-relaxed text-text-light">
              {t(
                "footer_tagline_line_1",
                "Bringing life back to the soil, one microbe at a time."
              )}{" "}
              {t(
                "footer_tagline_line_2",
                "Because strong fields grow from a stronger foundation."
              )}
            </p>

            <div className="mt-5 flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="rounded-full bg-primary-100/70 p-2 transition hover:bg-primary-200 hover:shadow-md"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 border-l-4 border-primary-500 pl-3 text-lg font-semibold text-primary-600">
              {t("footer_quick_links", "Quick Links")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="transition hover:text-primary-600">
                  {t("nav_home", "Home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="transition hover:text-primary-600"
                >
                  {t("footer_about_us", "About Us")}
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className="transition hover:text-primary-600"
                >
                  {t("footer_products", "Products")}
                </Link>
              </li>
              <li>
                <Link
                  to="/CareerPage"
                  className="transition hover:text-primary-600"
                >
                  {t("footer_careers", "Careers")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 border-l-4 border-primary-500 pl-3 text-lg font-semibold text-primary-600">
              {t("footer_company", "Company")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contactus"
                  className="transition hover:text-primary-600"
                >
                  {t("footer_contact_us", "Contact Us")}
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: "/aboutus", hash: "#mission-vision" }}
                  className="transition hover:text-primary-600"
                >
                  {t("footer_our_mission", "Our Mission")}
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: "/aboutus", hash: "#mission-vision" }}
                  className="transition hover:text-primary-600"
                >
                  {t("footer_our_vision", "Our Vision")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 border-l-4 border-primary-500 pl-3 text-lg font-semibold text-primary-600">
              {t("footer_contact", "Contact")}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary-600" />
                8977729535
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-600" />
                info@fertibase.in
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 text-primary-600" />
                <span>
                  {t("footer_address_line_1", "SY NO. 81, Sultanpur")}
                  <br />
                  {t("footer_address_line_2", "Hyderabad, India")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-200 pt-5 text-center text-xs text-text-light">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary-600">FertiBase</span>.{" "}
          {t("footer_rights_reserved", "All rights reserved.")}
        </div>
      </div>
    </footer>
  );
}
