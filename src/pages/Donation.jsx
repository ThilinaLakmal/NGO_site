import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import image1 from '../assets/child1.png'
import image2 from '../assets/unsplash_AEaTUnvneik.png'
import image3 from '../assets/woman1.png'
import image4 from '../assets/child.png'
import image5 from '../assets/uncle.png'
import image6 from '../assets/woman.png'

function Donation() {
  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Impact', to: '/impact' },
    { label: 'Our Work', to: '/our-work' },
    { label: 'Contact', to: '/contact' },
  ]

  const donationImages = [
    { id: 1, src: image2 },
    { id: 2, src: image3 },
    { id: 3, src: image4 },
    { id: 4, src: image5 },
  ]

  return (
    <div className="min-h-screen bg-white text-ngo-black font-sans antialiased">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-24 py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-ngo-black text-[24px] font-extrabold tracking-widest">LOGO<span className="text-ngo-yellow">.</span></Link>
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
          <Link to="/donation" className="hidden md:block bg-ngo-yellow text-ngo-black px-6 py-2 rounded text-[14px] font-bold tracking-wide hover:bg-yellow-500 transition-colors cursor-pointer border-none uppercase">
            Donate
          </Link>
        </div>
      </div>

      {/* Donation Section */}
      <section className="pt-[100px] pb-[80px] px-6 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Donation Label */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-1 bg-ngo-black"></div>
            <p className="text-ngo-black text-[12px] font-bold tracking-widest uppercase">Donation</p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left - Large Image */}
            <div className="relative md:row-span-2 rounded-lg overflow-hidden h-[400px] md:h-[600px]">
              <img
                src={image1}
                alt="Donation Campaign"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right - Grid of 4 Images */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-2 gap-6 h-full">
                {donationImages.map((image) => (
                  <div key={image.id} className="relative rounded-lg overflow-hidden h-[200px] md:h-[290px]">
                    <img
                      src={image.src}
                      alt={`Donation ${image.id}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Campaign Details Section */}
      <section className="py-20 px-6 md:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Left Content - About & Documents */}
            <div className="md:col-span-2">
              <h2 className="text-[36px] md:text-[40px] font-extrabold text-ngo-black mb-8">
                About
              </h2>

              <p className="text-ngo-black/75 text-[15px] leading-[1.8] mb-6">
                Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque reiciendis. Qui beatae vel magnam repudiandae ipsum repellat repudiandae. Voluptate at dolores ut dolor sint occaecati similique. Velit eius ab delectus temporibus.
              </p>

              <p className="text-ngo-black/75 text-[15px] leading-[1.8] mb-12">
                For dynamic content, add a rich text field to any collection and then connect a rich text element to that field in the settings panel. Headings, paragraphs, block-quotes, figures, images, and figure captions can all be styled.
              </p>

              {/* Documents Section */}
              <div className="mb-12">
                <h3 className="text-[18px] font-bold text-ngo-black mb-8">
                  Documents
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                      </svg>
                    </div>
                    <p className="text-[12px] font-semibold text-ngo-black/60">DOC</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                      </svg>
                    </div>
                    <p className="text-[12px] font-semibold text-ngo-black/60">DOC</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                      </svg>
                    </div>
                    <p className="text-[12px] font-semibold text-ngo-black/60">DOC</p>
                  </div>
                </div>
              </div>

              <p className="text-ngo-black/75 text-[15px] leading-[1.8] mb-6">
                Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque reiciendis. Qui beatae vel magnam repudiandae ipsum repellat repudiandae. Voluptate at dolores ut dolor sint occaecati similique. Velit eius ab delectus temporibus.
              </p>

              <p className="text-ngo-black/75 text-[15px] leading-[1.8]">
                For dynamic content, add a rich text field to any collection and then connect a rich text element to that field in the settings panel. Headings, paragraphs, block-quotes, figures, images, and figure captions can all be styled.
              </p>
            </div>

            {/* Right Content - Donation Campaign Stats */}
            <div className="bg-gray-50 rounded-lg p-8">
              {/* Total Amount */}
              <div className="mb-8">
                <p className="text-[14px] font-semibold text-ngo-black/60 mb-2">Total Raised</p>
                <h3 className="text-[48px] font-extrabold text-ngo-black">$24,000</h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-ngo-yellow h-2 rounded-full w-3/5"></div>
                </div>
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-[12px] text-ngo-black/60 mb-1">Goal</p>
                    <p className="text-[18px] font-bold text-ngo-black">$40,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] text-ngo-black/60 mb-1">Remaining</p>
                    <p className="text-[18px] font-bold text-ngo-black">$16,000</p>
                  </div>
                </div>
              </div>

              {/* Days Left */}
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-ngo-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
                <p className="text-[14px] font-bold text-ngo-black">12 days left</p>
              </div>

              {/* Contributors */}
              <div className="flex items-center gap-1 mb-6">
                <span className="text-[18px]">❤️</span>
                <p className="text-[14px] font-bold text-ngo-black">12354 Contributors</p>
              </div>

              {/* Donate Button */}
              <Link to="/payment" className="w-full bg-ngo-black text-white py-3 rounded-full font-bold text-center mb-4 hover:bg-ngo-black/80 transition-colors flex items-center justify-center gap-2">
                <span>Donate</span>
                <span>❤️</span>
              </Link>

              {/* Share Button */}
              <button className="w-full border-2 border-ngo-black rounded-full py-3 font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-ngo-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.15c.52.47 1.2.77 1.96.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.48 9.31 6.84 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.84 0 1.48-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
              </button>

              {/* Recent Contributors */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-[18px] font-bold text-ngo-black mb-6">
                  Recent Contributors
                </h4>

                <div className="space-y-4">
                  <div>
                    <p className="text-[14px] text-ngo-black/60 mb-1">anonymous</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[16px]">❤️</span>
                      <p className="text-[18px] font-bold text-ngo-black">20,000</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] text-ngo-black/60 mb-1">Abdullah Contributed</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[16px]">❤️</span>
                      <p className="text-[18px] font-bold text-ngo-black">20,000</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[14px] text-ngo-black/60 mb-1">Antony Contributed</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[16px]">❤️</span>
                      <p className="text-[18px] font-bold text-ngo-black">20,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Donation
