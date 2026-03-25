import React from 'react'
import ctaImg from '../assets/image_12.png'

const CTASection = () => {
  return (
    <section className="relative h-[400px] bg-ngo-black text-white flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaImg}
          alt="CTA Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[800px] px-6">
        <h2 className="text-[40px] md:text-[48px] font-extrabold mb-6 leading-tight">
          Your Contribution Can Change a Life Today
        </h2>
        <p className="text-white/90 text-[16px] md:text-[18px] leading-[1.8] mb-10 font-medium max-w-[600px] mx-auto">
          Even a small donation can create meaningful change. Support verified NGOs and help us build stronger communities.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="bg-ngo-yellow text-ngo-black px-10 py-4 rounded font-bold text-[16px] tracking-wide uppercase hover:bg-yellow-500 transition-colors cursor-pointer border-none">
            Donate Now
          </button>
          <button className="bg-transparent text-white px-10 py-4 rounded font-bold text-[16px] tracking-wide uppercase border-2 border-white hover:bg-white hover:text-ngo-black transition-colors cursor-pointer">
            See How Donations Help
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection
