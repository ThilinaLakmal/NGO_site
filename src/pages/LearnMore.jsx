import { Link } from 'react-router-dom'
import { useState } from 'react'
import Footer from '../components/Footer'
import donationImage from '../assets/woman1.png'

function LearnMore() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Impact', to: '/impact' },
    { label: 'Our Work', to: '/our-work' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <div className="min-h-screen bg-white text-ngo-black font-sans antialiased">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-24 py-6">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-ngo-black text-[24px] font-extrabold tracking-widest">LOGO</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-[60px]">
            {navLinks.map((link) => (
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
          <button className="hidden md:block bg-ngo-yellow text-ngo-black px-6 py-2 rounded text-[14px] font-bold tracking-wide hover:bg-yellow-500 transition-colors cursor-pointer border-none uppercase">
            Donate
          </button>
        </div>
      </div>

      {/* White Space with Learn More Label */}
      <section className="pt-32 pb-20 px-6 md:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-ngo-black"></div>
            <p className="text-ngo-black text-[12px] font-bold tracking-widest uppercase">Learn More</p>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="pt-16 pb-20 px-6 md:px-24 bg-ngo-black">
        <div className="max-w-[1400px] mx-auto">
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-[42px] md:text-[52px] font-extrabold leading-tight mb-6 text-ngo-yellow">
                Making a donation for our Works.
              </h1>

              <p className="text-white/85 text-[15px] leading-[1.7] mb-10">
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text over since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>

              {/* Donate Now Button */}
              <div>
                <Link to="/donation" className="bg-ngo-yellow text-ngo-black px-8 py-3 rounded font-bold text-[14px] tracking-wide hover:bg-yellow-500 transition-colors cursor-pointer border-none uppercase inline-block">
                  Donate now
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative rounded-[12px] overflow-hidden h-[300px] md:h-[360px]">
              <img
                src={donationImage}
                alt="Donation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contribution & Donation Usage Section */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          {/* How You Can Contribute */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-20 md:mb-32">
            {/* Left Content */}
            <div className="flex flex-col">
              <h2 className="text-[36px] md:text-[44px] font-extrabold text-ngo-black leading-tight mb-8">
                How you can contribute to caring for our kids
              </h2>
              <p className="text-ngo-black/75 text-[15px] leading-[1.8]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis vivorra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
              </p>
            </div>

            {/* Right Content - Tabs */}
            <div>
              {/* Tab Navigation */}
              <div className="flex gap-8 border-b border-ngo-black/20 mb-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-4 text-[16px] font-semibold tracking-wide transition-colors ${
                    activeTab === 'overview'
                      ? 'text-ngo-black border-b-2 border-ngo-yellow'
                      : 'text-ngo-black/60 hover:text-ngo-black'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('what-you-get')}
                  className={`pb-4 text-[16px] font-semibold tracking-wide transition-colors ${
                    activeTab === 'what-you-get'
                      ? 'text-ngo-black border-b-2 border-ngo-yellow'
                      : 'text-ngo-black/60 hover:text-ngo-black'
                  }`}
                >
                  What You get
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-ngo-black/75 text-[15px] leading-[1.8]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis vivorra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                  </p>
                  <p className="text-ngo-black/75 text-[15px] leading-[1.8]">
                    Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
                  </p>
                </div>
              )}
              {activeTab === 'what-you-get' && (
                <div className="space-y-4">
                  <p className="text-ngo-black/75 text-[15px] leading-[1.8]">
                    When you contribute to our cause, you become part of a meaningful movement. Your donation helps provide essential resources and care to children in need.
                  </p>
                  <p className="text-ngo-black/75 text-[15px] leading-[1.8]">
                    You get the satisfaction of knowing your contribution is making a real difference in the lives of vulnerable children and families.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* How We Use Your Donation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="flex flex-col">
              <h2 className="text-[36px] md:text-[44px] font-extrabold text-ngo-black leading-tight mb-8">
                How we use your donation
              </h2>
            </div>

            {/* Right Content */}
            <div>
              <p className="text-ngo-black/75 text-[15px] leading-[1.8]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis vivorra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Nunc ut sem vitae risus tristique posuere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LearnMore
