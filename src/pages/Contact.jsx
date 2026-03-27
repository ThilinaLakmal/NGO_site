import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import contactImage from '../assets/Rectangle 22.png'

function Contact() {
  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Impact', to: '/impact' },
    { label: 'Our Work', to: '/our-work' },
    { label: 'Contact', to: '/contact', active: true },
  ]

  return (
    <div className="min-h-screen bg-white text-ngo-black font-sans antialiased">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-24 py-6">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-ngo-black text-[24px] font-extrabold tracking-widest">LOGO<span className="text-ngo-yellow">.</span></span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-[60px]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-ngo-black text-[14px] font-semibold tracking-wide hover:text-ngo-yellow transition-colors cursor-pointer bg-transparent border-none ${
                  link.active ? 'font-extrabold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Donate Button */}
          <Link to="/donation" className="hidden md:block bg-ngo-yellow text-ngo-black px-6 py-2 rounded text-[14px] font-bold tracking-wide hover:bg-yellow-500 transition-colors cursor-pointer border-none uppercase">
            Donate
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <section className="pt-[100px] pb-[80px] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${contactImage})` }}></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="max-w-[1400px] mx-auto relative z-10 px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left Content */}
            <div className="text-white flex flex-col justify-center bg-black/50 rounded-lg p-12 md:p-16">
              <h1 className="text-[44px] md:text-[52px] font-extrabold leading-tight mb-8">
                We'd love to hear from you
              </h1>

              <p className="text-white/85 text-[15px] leading-[1.8] mb-12">
                Have any question in mind or want to enquire? Please feel free to contact us through the form or the following details.
              </p>

              {/* Let's Talk Section */}
              <div className="space-y-8">
                <div>
                  <p className="text-[13px] font-bold tracking-widest uppercase text-white/70 mb-3">Let's Talk!</p>
                  <p className="text-[14px] font-semibold">+234 0901234514</p>
                  <p className="text-[14px] font-semibold">hello@largerthari.com</p>
                </div>

                {/* Divider */}
                <div className="w-20 h-[1px] bg-white/30"></div>

                <div>
                  <p className="text-[13px] font-bold tracking-widest uppercase text-white/70 mb-3">Headoffice</p>
                  <p className="text-[14px] font-medium leading-relaxed text-white/90">
                    8 Brewery Drive, Lagos,<br />
                    Nigeria.
                  </p>
                </div>

                <div>
                  <p className="text-[13px] font-bold tracking-widest uppercase text-white/70 mb-3">Branch Office</p>
                  <p className="text-[14px] font-medium leading-relaxed text-white/90">
                    Opp Opolo round about, Yenagoa, Bayelsa,<br />
                    Nigeria
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 pt-4">
                  <a href="#" className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white hover:text-ngo-black transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white hover:text-ngo-black transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7-2.25 2-5.4 2.6-7.5 2a4.5 4.5 0 008-4.3c-1.5.6-3 .2-4.5-.2"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white hover:text-ngo-black transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="mt-32 md:mt-40">
              <form className="space-y-5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-[13px] font-bold tracking-wide mb-2 block">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full bg-transparent border border-white/40 rounded px-4 py-3 text-white text-[14px] placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white text-[13px] font-bold tracking-wide mb-2 block">Last Name</label>
                    <input
                      type="text"
                      placeholder="Thomsan"
                      className="w-full bg-transparent border border-white/40 rounded px-4 py-3 text-white text-[14px] placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-white text-[13px] font-bold tracking-wide mb-2 block">Email Address</label>
                  <input
                    type="email"
                    placeholder="John@gmail.com"
                    className="w-full bg-transparent border border-white/40 rounded px-4 py-3 text-white text-[14px] placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-white text-[13px] font-bold tracking-wide mb-2 block">Message</label>
                  <textarea
                    placeholder="Type Message....."
                    rows="6"
                    className="w-full bg-transparent border border-white/40 rounded px-4 py-3 text-white text-[14px] placeholder-white/50 focus:outline-none focus:border-white transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button - Centered */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    className="bg-ngo-yellow text-ngo-black px-8 py-3 rounded font-bold text-[13px] tracking-widest hover:bg-yellow-500 transition-colors uppercase cursor-pointer border-none"
                  >
                    send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[400px] md:h-[500px]">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9522715413657!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f755b5c5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2s8%20Brewery%20Drive%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <Footer />
    </div>
  )
}

export default Contact
