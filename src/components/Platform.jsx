import React from 'react'
import platformImg from '../assets/image_2.png'

const Platform = () => {
  return (
    <section className="bg-white py-[80px] px-6 md:px-24 flex items-center justify-center">
      <div className="max-w-[1400px] w-full relative">
        {/* Background shadow box */}
        <div className="absolute top-8 right-0 bottom-[-32px] left-12 bg-black z-0 hidden md:block"></div>

        <div className="relative z-10 flex flex-col md:flex-row">
          {/* Left: Image */}
          <div className="w-full md:w-3/5">
            <img
              src={platformImg}
              alt="Girls feeding dog"
              className="w-full h-full object-cover shadow-lg md:shadow-none min-h-[400px] md:min-h-[500px]"
            />
          </div>

          {/* Right: Yellow Box */}
          <div className="w-full md:w-2/5 bg-ngo-yellow p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-ngo-black leading-tight mb-6">
              A Platform Built for Social Good
            </h2>
            <p className="text-ngo-black/90 text-[16px] md:text-[18px] leading-[1.8] mb-10 font-medium">
              Our platform brings together multiple NGOs under one trusted digital space.We aim to make social support accessible, transparent, and impactful by connecting people who want to help with organizations that are making a difference every day.
            </p>
            <div>
              <button className="bg-transparent border-[2.5px] border-ngo-black text-ngo-black px-8 py-4 font-bold text-[16px] tracking-wide cursor-pointer hover:bg-ngo-black hover:text-ngo-yellow transition-colors">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Platform
