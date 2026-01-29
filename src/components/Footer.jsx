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

export default function Footer() {
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
      className="relative text-text-base pt-12 md:pt-16 pb-8 overflow-hidden"
      style={{ backgroundColor: "#efe3d8" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* Brand */}
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
                className="h-12 w-auto object-contain md:h-24 transition-transform group-hover:scale-105 bg-transparent"
                style={{
                  backgroundColor: "transparent",
                  mixBlendMode: "multiply",
                }}
              />
            </motion.div>

            <p className="text-sm text-text-light leading-relaxed">
              Bringing life back to the soil, one microbe at a time.
              Because strong fields grow from a stronger foundation.
            </p>

            <div className="flex gap-3 mt-5">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="p-2 bg-primary-100/70 rounded-full hover:bg-primary-200 hover:shadow-md transition"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-l-4 border-primary-500 pl-3 text-primary-600">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="hover:text-primary-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-600 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary-600 transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-l-4 border-primary-500 pl-3 text-primary-600">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contactus" className="hover:text-primary-600 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#mission" className="hover:text-primary-600 transition">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-primary-600 transition">
                  Our Vision
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-l-4 border-primary-500 pl-3 text-primary-600">
              Contact
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
                <MapPin className="h-4 w-4 text-primary-600 mt-1" />
                <span>
                  SY NO. 81, Sultanpur
                  <br />
                  Hyderabad, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-200 pt-5 text-center text-xs text-text-light">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-primary-600">FertiBase</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
