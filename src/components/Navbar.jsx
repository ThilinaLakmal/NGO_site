import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'About', path: '/about' },
    { label: 'Impact', path: '#impact' },
    { label: 'Our Work', path: '#our-work' },
    { label: 'Contact', path: '#contact' },
  ]

  return (
    <nav className="absolute top-0 left-0 w-full z-50 pt-10">
      <div className="max-w-[1512px] mx-auto flex items-center justify-between px-10 md:px-24">
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer">
          <span className="text-white text-[32px] font-extrabold tracking-widest">LOGO</span>
          <span className="text-ngo-yellow text-[32px] font-extrabold">.</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-[60px]">
          {navLinks.map((link) => (
            link.path.startsWith('/') ? (
              <Link
                key={link.label}
                to={link.path}
                className="text-white text-[16px] font-semibold tracking-wide hover:text-ngo-yellow transition-colors bg-transparent border-none"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.path}
                className="text-white text-[16px] font-semibold tracking-wide hover:text-ngo-yellow transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            )
          ))}
        </div>

        {/* Donate Button */}
        <button className="hidden md:block bg-ngo-yellow text-ngo-black px-10 py-3 rounded text-[16px] font-semibold tracking-wider hover:bg-yellow-500 transition-colors cursor-pointer border-none uppercase">
          Donate
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl cursor-pointer bg-transparent border-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-ngo-black/95 backdrop-blur-sm px-8 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            link.path.startsWith('/') ? (
              <Link
                key={link.label}
                to={link.path}
                className="text-white text-sm font-medium tracking-wide hover:text-ngo-yellow transition-colors bg-transparent border-none text-left py-2"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.path}
                className="text-white text-sm font-medium tracking-wide hover:text-ngo-yellow transition-colors cursor-pointer py-2"
              >
                {link.label}
              </a>
            )
          ))}
          <button className="bg-ngo-yellow text-ngo-black px-8 py-2 rounded text-sm font-semibold tracking-wide hover:bg-yellow-500 transition-colors cursor-pointer border-none w-fit">
            Donate
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
