
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper"; // Make sure this file exists

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-text-light max-w-2xl mx-auto">
          Have questions about our products or want to collaborate? Reach out and we'll get back to you within 24 hours.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        {/* Left Card - Contact Info */}
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-primary-100">
          <h3 className="text-2xl font-bold text-text-base mb-6">Contact Information</h3>
          <p className="text-text-light mb-8">
            Fill out the form and our team will reach out to you as soon as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <Phone className="h-6 w-6" />
              </div>
              <span className="text-text-base text-lg font-medium">8977729535</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <Mail className="h-6 w-6" />
              </div>
              <span className="text-text-base text-lg font-medium"> info@fertibase.in</span>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="text-text-base text-lg font-medium">
                SY NO. 81, Sultanpur
                <br />
                Hyderabad, India
              </span>
            </div>
          </div>

          <div className="mt-10 border-t border-primary-200 pt-6">
            <p className="text-text-muted text-sm">
              We're available Mon–Sat from 9am to 6pm.
            </p>
          </div>
        </div>

        {/* Right Card - Contact Form */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-primary-100">
          <h3 className="text-2xl font-bold text-text-base mb-6">Send Us a Message</h3>

          <form className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white text-text-base"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white text-text-base"
              />
            </div>

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white text-text-base"
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              required
              className="w-full px-4 py-3 border border-primary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition bg-white text-text-base"
            ></textarea>

           <button
  type="submit"
  className="w-full !bg-[#741A1C] !text-white py-4 rounded-xl font-semibold
             shadow-lg hover:!bg-[#5e1416]
             transform hover:-translate-y-1 transition-all
             flex items-center justify-center space-x-2"
>
  <Send className="h-5 w-5 !text-white" />
  <span className="!text-white">Send Message</span>
</button>


          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
