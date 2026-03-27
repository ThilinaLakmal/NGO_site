import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/image_1.png'

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-ngo-black text-white flex items-center justify-center pt-24 px-6">
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-ngo-black via-transparent to-transparent"></div>
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 text-center max-w-[1100px] mx-auto -mt-20">
        <h1 className="font-extrabold leading-[1.1] tracking-tight text-white mb-6">
          <span className="text-[64px] md:text-[80px] block">Empowering Communities,</span>
          <span className="text-ngo-yellow text-[64px] md:text-[96px]">Transforming Lives</span>
        </h1>
        <p className="mt-8 text-[18px] md:text-[20px] text-white/90 max-w-[850px] mx-auto leading-[1.8] font-medium">
          Join a unified movement to support meaningful social causes. Your secure, anonymous contribution brings immediate hope and essential resources to those who need it most.
        </p>

        {/* BUTTONS */}
        <div className="mt-14 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/donation" className="bg-ngo-yellow text-ngo-black px-12 py-4 rounded font-bold text-[16px] tracking-wide uppercase hover:bg-yellow-500 transition-colors cursor-pointer border-none inline-block text-center">
            Donate Now
          </Link>
          <Link
            to="/learn-more"
            className="bg-transparent text-white px-12 py-4 rounded font-bold text-[16px] tracking-wide uppercase border-2 border-white hover:bg-white hover:text-ngo-black transition-colors cursor-pointer inline-block text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero