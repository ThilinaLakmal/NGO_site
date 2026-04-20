import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import aboutImg from '../assets/whatsapp21.jpeg'
import storyImg from '../assets/whatsapp11.png'
import chosenImg from '../assets/whatsapp5.png'

const AboutUs = () => {
  const supporters = [
    { name: 'logoipsum' },
    { name: 'logoipsum' },
    { name: 'logoipsum' },
    { name: 'logoipsum' },
    { name: 'logoipsum' },
    { name: 'logoipsum' },
  ]

  return (
    <div className="min-h-screen font-sans antialiased">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-24 py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-ngo-black text-[24px] font-extrabold tracking-widest">LOGO</Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-[60px]">
            {[
              { label: 'About', to: '/about' },
              { label: 'Impact', to: '/impact' },
              { label: 'Our Work', to: '/our-work' },
              { label: 'Contact', to: '/contact' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-ngo-black text-[14px] font-semibold tracking-wide hover:text-ngo-yellow transition-colors cursor-pointer bg-transparent border-none"
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

      {/* Hero Section */}
      <section className="bg-white pt-[120px] pb-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-0">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-ngo-black"></div>
                <p className="text-ngo-black text-[12px] font-bold tracking-widest uppercase">Know About Us</p>
              </div>
              <h1 className="text-[48px] md:text-[52px] font-extrabold text-ngo-black leading-tight mb-6">
                We are a non-governmental organization
              </h1>
              <p className="text-black/70 text-[15px] leading-[1.8] max-w-[500px]">
                We focus on food insecurity and community support. From providing fresh produce to organizing large-scale donation events, we work tirelessly to bridge the gap for families and individuals in need. We are committed to fostering resilience and hope through shared effort.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative rounded-[8px] overflow-hidden h-[380px] md:h-[440px]">
              <img
                src={aboutImg}
                alt="About Us"
                className="w-full h-full object-cover"
              />
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-6 h-6 text-ngo-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-ngo-black text-white py-[100px] px-6 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px] items-start">
            {/* Mission */}
            <div>
              <p className="text-[12px] font-bold tracking-widest uppercase text-white/60 mb-6">Our Mission</p>
              <h2 className="text-[36px] md:text-[40px] font-extrabold text-ngo-yellow leading-tight mb-6">
                We make sure to provide inclusive care for children with special needs
              </h2>
              <p className="text-white/80 text-[14px] leading-[1.8]">
                Our mission is to ensure that every child, regardless of ability or background, receives the care, education, and support they deserve. We work with families, caregivers, and communities to provide specialized programs that nurture growth, independence, and a sense of belonging for children with special needs.
              </p>
            </div>

            {/* Vision */}
            <div>
              <p className="text-[12px] font-bold tracking-widest uppercase text-white/60 mb-6">Our Vision</p>
              <h2 className="text-[36px] md:text-[40px] font-extrabold text-ngo-yellow leading-tight mb-6">
                Provide more inclusive care to children around the world
              </h2>
              <p className="text-white/80 text-[14px] leading-[1.8]">
                We envision a world where every child has access to compassionate, high-quality care — no matter where they live. By expanding our reach globally, we aim to partner with communities and organizations worldwide to build inclusive systems that protect, educate, and empower the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supporters Section */}
      <section className="bg-ngo-black py-[60px] px-6 md:px-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[12px] font-bold tracking-widest uppercase text-white/60 mb-12">Our Supporters</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12">
            {supporters.map((supporter, index) => (
              <div key={index} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-white/60 text-[14px] font-medium">🔲 {supporter.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognitions Section */}
      <section className="bg-white py-[80px] px-6 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[40px] md:text-[48px] font-extrabold text-ngo-black text-center mb-16">
            Awards & Recognitions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {/* Award 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <svg className="w-24 h-24 text-gray-200" viewBox="0 0 100 100" fill="none">
                  {/* Outer circle/wreath replacement */}
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                {/* Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-ngo-yellow rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-ngo-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[20px] font-bold text-ngo-black mb-2">2021</p>
              <p className="text-[16px] font-semibold text-ngo-black mb-2">Best NGO Award</p>
              <p className="text-[13px] text-black/60 font-medium">BERLIN, GERMANY</p>
            </div>

            {/* Award 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <svg className="w-24 h-24 text-gray-200" viewBox="0 0 100 100" fill="none">
                  {/* Outer circle/wreath replacement */}
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                {/* Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-ngo-yellow rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-ngo-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[20px] font-bold text-ngo-black mb-2">2018</p>
              <p className="text-[16px] font-semibold text-ngo-black mb-2">Global Award</p>
              <p className="text-[13px] text-black/60 font-medium">NEW YORK, USA</p>
            </div>

            {/* Award 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <svg className="w-24 h-24 text-gray-200" viewBox="0 0 100 100" fill="none">
                  {/* Outer circle/wreath replacement */}
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                {/* Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-ngo-yellow rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-ngo-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[20px] font-bold text-ngo-black mb-2">2014</p>
              <p className="text-[16px] font-semibold text-ngo-black mb-2">CSN Award</p>
              <p className="text-[13px] text-black/60 font-medium">NEW DELHI, INDIA</p>
            </div>

            {/* Award 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <svg className="w-24 h-24 text-gray-200" viewBox="0 0 100 100" fill="none">
                  {/* Outer circle/wreath replacement */}
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                {/* Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-ngo-yellow rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-ngo-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M12 15c-3.31 0-6-2.69-6-6V4h12v5c0 3.31-2.69 6-6 6Z"></path>
                      <path d="M12 15v7"></path>
                      <path d="M7 22h10"></path>
                      <path d="M15.5 4H18a2 2 0 0 1 2 2v1.5a4.5 4.5 0 0 1-4.5 4.5H15.5"></path>
                      <path d="M8.5 4H6a2 2 0 0 0-2 2v1.5A4.5 4.5 0 0 0 8.5 12h0"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-[20px] font-bold text-ngo-black mb-2">2010</p>
              <p className="text-[16px] font-semibold text-ngo-black mb-2">NGO of the year Award</p>
              <p className="text-[13px] text-black/60 font-medium">VIENNA, AUSTRIA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story & Why Chosen Us Section */}
      <section>
        {/* Our Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left - Image */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <img
              src={storyImg}
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right - Black Background with Text */}
          <div className="bg-ngo-black flex items-center justify-center px-6 md:px-16 py-20 md:py-0 h-[400px] md:h-[500px]">
            <div className="max-w-md">
              <h2 className="text-[40px] md:text-[48px] font-extrabold text-ngo-yellow mb-6 leading-tight">
                Our Story
              </h2>
              <p className="text-white/80 text-[14px] md:text-[15px] leading-[1.8]">
                Founded with a deep commitment to serving those in need, our organization began as a small community effort to address food insecurity and lack of access to basic resources. Over the years, we have grown into a dedicated team of volunteers and professionals working together to uplift families and individuals across our region. Every initiative we undertake is driven by empathy, transparency, and the belief that collective action creates lasting change.
              </p>
            </div>
          </div>
        </div>

        {/* Why Chosen Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left - Yellow Background with Text */}
          <div className="bg-ngo-yellow flex items-center justify-center px-6 md:px-16 py-20 md:py-0 h-[400px] md:h-[500px]">
            <div className="max-w-md">
              <h2 className="text-[40px] md:text-[48px] font-extrabold text-ngo-black mb-6 leading-tight">
                Why chosen us
              </h2>
              <p className="text-ngo-black/80 text-[14px] md:text-[15px] leading-[1.8]">
                We are chosen by communities and partners because of our unwavering dedication to transparency, accountability, and measurable impact. Every donation we receive is directed where it matters most. Our team works on the ground, building trust with the people we serve and ensuring that aid reaches the most vulnerable without delay.
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <img
              src={chosenImg}
              alt="Why Chosen Us"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUs

