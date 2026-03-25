import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import aboutImg from '../assets/image_12.png'

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
            <span className="text-ngo-black text-[24px] font-extrabold tracking-widest">LOGO</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-[60px]">
            {['About', 'Impact', 'Our Work', 'Contact'].map((link) => (
              <button
                key={link}
                className="text-ngo-black text-[14px] font-semibold tracking-wide hover:text-ngo-yellow transition-colors cursor-pointer bg-transparent border-none"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Donate Button */}
          <button className="hidden md:block bg-ngo-yellow text-ngo-black px-6 py-2 rounded text-[14px] font-bold tracking-wide hover:bg-yellow-500 transition-colors cursor-pointer border-none uppercase">
            Donate
          </button>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros molestie tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </p>
            </div>

            {/* Vision */}
            <div>
              <p className="text-[12px] font-bold tracking-widest uppercase text-white/60 mb-6">Our Vision</p>
              <h2 className="text-[36px] md:text-[40px] font-extrabold text-ngo-yellow leading-tight mb-6">
                Provide more inclusive care to children around the world
              </h2>
              <p className="text-white/80 text-[14px] leading-[1.8]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros molestie tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
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
                <svg className="w-24 h-24 text-gray-800" viewBox="0 0 100 100" fill="none">
                  {/* Laurel Wreath */}
                  <path d="M30 60 Q20 50 25 40 Q30 30 40 35 Q50 25 60 35 Q70 30 75 40 Q80 50 70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M30 60 Q20 50 25 40 Q30 30 40 35 Q50 25 60 35 Q70 30 75 40 Q80 50 70 60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(180 50 50)"/>
                </svg>
                {/* Star Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-ngo-yellow rounded-full w-12 h-12 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
                <svg className="w-24 h-24 text-gray-800" viewBox="0 0 100 100" fill="none">
                  {/* Laurel Wreath */}
                  <path d="M30 60 Q20 50 25 40 Q30 30 40 35 Q50 25 60 35 Q70 30 75 40 Q80 50 70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M30 60 Q20 50 25 40 Q30 30 40 35 Q50 25 60 35 Q70 30 75 40 Q80 50 70 60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(180 50 50)"/>
                </svg>
                {/* Trophy Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-ngo-yellow rounded-full w-12 h-12 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 2C6.9 2 6 2.9 6 4v2c0 1.1-.9 2-2 2s-2-.9-2-2V4C2 2.9 2.9 2 4 2h4zm8 0c1.1 0 2 .9 2 2v2c0 1.1.9 2 2 2s2-.9 2-2V4c0-1.1-.9-2-2-2h-4zM7 13c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-6zm2 0h6v6H9v-6z" />
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
                <svg className="w-24 h-24 text-gray-800" viewBox="0 0 100 100" fill="none">
                  {/* Laurel Wreath */}
                  <path d="M30 60 Q20 50 25 40 Q30 30 40 35 Q50 25 60 35 Q70 30 75 40 Q80 50 70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M30 60 Q20 50 25 40 Q30 30 40 35 Q50 25 60 35 Q70 30 75 40 Q80 50 70 60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(180 50 50)"/>
                </svg>
                {/* Medal Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-ngo-yellow rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-gray-800 font-bold text-xl">🏅</span>
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
                <svg className="w-24 h-24 text-gray-800" viewBox="0 0 100 100" fill="none">
                  {/* Laurel Wreath */}
                  <path d="M30 60 Q20 50 25 40 Q30 30 40 35 Q50 25 60 35 Q70 30 75 40 Q80 50 70 60" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M30 60 Q20 50 25 40 Q30 30 40 35 Q50 25 60 35 Q70 30 75 40 Q80 50 70 60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(180 50 50)"/>
                </svg>
                {/* Medal Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-ngo-yellow rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-gray-800 font-bold text-xl">🏅</span>
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
              src={aboutImg}
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
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text over since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text over since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <img
              src={aboutImg}
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

