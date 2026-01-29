import { X } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose }) {
  const links = ['Home', 'About', 'Products', 'Benefits', 'Contact'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">Ferti</span>
            <button onClick={onClose}><X className="h-6 w-6" /></button>
          </div>
        </div>
        <div className="p-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={onClose}
              className="block py-3 text-lg text-gray-700 hover:text-primary hover:bg-green-50 rounded-lg px-4 transition"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}