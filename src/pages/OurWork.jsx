import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import workImage from '../assets/unsplash_AEaTUnvneik.png'

function OurWork() {
  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Impact', to: '/impact' },
    { label: 'Our Work', to: '/our-work', active: true },
    { label: 'Contact', to: '/' },
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

      {/* What We Do Section */}
      <section className="pt-[120px] pb-[80px] px-6 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-ngo-black"></div>
                <p className="text-ngo-black text-[12px] font-bold tracking-widest uppercase">What We Do</p>
              </div>
              <h1 className="text-[48px] md:text-[52px] font-extrabold text-ngo-black leading-tight mb-6">
                We are working cross country
              </h1>
              <p className="text-black/70 text-[15px] leading-[1.8] max-w-[500px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros molestie tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative rounded-[8px] overflow-hidden h-[380px] md:h-[440px]">
              <img
                src={workImage}
                alt="Our Work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support & Showcase Section */}
      <section className="bg-ngo-yellow py-[80px] px-6 md:px-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url(${workImage})` }}></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-ngo-black text-center mb-16">
            We support and showcase initiatives across key social areas:
          </h2>

          <div className="space-y-12">
            {/* First Row - 3 Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Elderly Care */}
              <div className="flex items-start gap-4">
                <div className="bg-ngo-black text-white px-3 py-3 rounded flex-shrink-0 text-[20px] h-fit">👴</div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-ngo-black mb-2">Elderly Care</h3>
                  <p className="text-ngo-black/75 text-[14px] leading-[1.6]">
                    Providing care, shelter, and medical assistance to senior citizens in need.
                  </p>
                </div>
              </div>

              {/* Healthcare Support */}
              <div className="flex items-start gap-4">
                <div className="bg-ngo-black text-white px-3 py-3 rounded flex-shrink-0 text-[20px] h-fit">⚕️</div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-ngo-black mb-2">Healthcare Support</h3>
                  <p className="text-ngo-black/75 text-[14px] leading-[1.6]">
                    Delivering essential medical services to underserved communities.
                  </p>
                </div>
              </div>

              {/* Environmental Protection */}
              <div className="flex items-start gap-4">
                <div className="bg-ngo-black text-white px-3 py-3 rounded flex-shrink-0 text-[20px] h-fit">🌱</div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-ngo-black mb-2">Environmental Protection</h3>
                  <p className="text-ngo-black/75 text-[14px] leading-[1.6]">
                    Promoting sustainability through conservation, eco friendly initiatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Second Row - 2 Items Centered */}
            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
              {/* Community Development */}
              <div className="flex items-start gap-4 md:flex-1 md:max-w-sm">
                <div className="bg-ngo-black text-white px-3 py-3 rounded flex-shrink-0 text-[20px] h-fit">🏘️</div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-ngo-black mb-2">Community Development</h3>
                  <p className="text-ngo-black/75 text-[14px] leading-[1.6]">
                    Empowering communities through education, infrastructure.
                  </p>
                </div>
              </div>

              {/* Social Welfare */}
              <div className="flex items-start gap-4 md:flex-1 md:max-w-sm">
                <div className="bg-ngo-black text-white px-3 py-3 rounded flex-shrink-0 text-[20px] h-fit">🤝</div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-ngo-black mb-2">Social Welfare</h3>
                  <p className="text-ngo-black/75 text-[14px] leading-[1.6]">
                    Supporting vulnerable groups with food, relief, and essential services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Events Section */}
      <section className="bg-white py-[100px] px-6 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-[44px] md:text-[48px] font-extrabold text-ngo-black">Our Events</h2>
            <div className="flex-1 mx-8 h-[2px] bg-ngo-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Card 1 */}
            <div className="bg-ngo-black rounded-[16px] px-8 md:px-10 py-8 md:py-10 flex items-center justify-between group hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center">
                  <p className="text-white text-[40px] md:text-[48px] font-extrabold">13</p>
                  <p className="text-white text-[14px] font-bold tracking-widest uppercase">APR</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-[12px] font-bold tracking-widest uppercase mb-2">Next Events</p>
                  <h3 className="text-ngo-yellow text-[20px] md:text-[24px] font-extrabold leading-tight">
                    A day with our wonderful children
                  </h3>
                </div>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-ngo-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-ngo-black rounded-[16px] px-8 md:px-10 py-8 md:py-10 flex items-center justify-between group hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center">
                  <p className="text-white text-[40px] md:text-[48px] font-extrabold">25</p>
                  <p className="text-white text-[14px] font-bold tracking-widest uppercase">APR</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-white text-[12px] font-bold tracking-widest uppercase mb-2">Next Events</p>
                  <h3 className="text-ngo-yellow text-[20px] md:text-[24px] font-extrabold leading-tight">
                    Seminar: Caring for children with autism
                  </h3>
                </div>
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-ngo-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default OurWork
