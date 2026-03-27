import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import impactImage from '../assets/image_13.png'
import womanImage from '../assets/woman1.png'
import childImage from '../assets/child.png'
import waterImage from '../assets/uncle.png'
import child1Image from '../assets/child1.png'

function Impact() {
  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Impact', to: '/impact', active: true },
    { label: 'Our Work', to: '/' },
    { label: 'Contact', to: '/' },
  ]

  return (
    <div className="min-h-screen bg-[#efefef] text-ngo-black font-sans antialiased">
      <header className="pt-10 px-6 md:px-14 lg:px-20">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          <Link to="/" className="text-[30px] font-extrabold tracking-widest leading-none">
            LOGO<span className="text-ngo-yellow">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-[17px] transition-colors ${link.active ? 'font-extrabold text-ngo-black' : 'font-medium text-ngo-black/90 hover:text-ngo-black'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/donation" className="bg-ngo-yellow text-ngo-black px-5 py-2 rounded-[4px] text-[14px] font-bold hover:bg-[#eab800] transition-colors inline-block">
              Donate
            </Link>
          </nav>
        </div>
      </header>

      <main className="px-6 md:px-14 lg:px-20 pb-20 md:pb-28">
        <section className="max-w-[1320px] mx-auto pt-12 md:pt-14">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="h-[2px] w-12 bg-ngo-black/50" />
            <p className="text-[12px] md:text-[13px] tracking-[0.2em] font-bold uppercase text-ngo-black/75">
              What We Do
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-14 items-center">
            <div className="relative max-w-full">
              <div className="absolute -right-3 -bottom-3 md:-right-5 md:-bottom-5 h-full w-full rounded-[8px] bg-black" />
              <div className="relative overflow-hidden rounded-[8px] h-[300px] sm:h-[360px] md:h-[420px]">
                <img src={impactImage} alt="Child portrait" className="w-full h-full object-cover grayscale" />
              </div>
            </div>

            <div>
              <h1 className="text-[40px] sm:text-[48px] md:text-[56px] leading-[0.95] font-extrabold mb-6">
                <span className="text-ngo-yellow">Real</span>{' '}
                <span className="text-ngo-black">Impact</span>
                <br />
                <span className="text-ngo-black">Real</span>{' '}
                <span className="text-ngo-yellow">Change</span>
              </h1>
              <p className="text-[16px] md:text-[18px] leading-relaxed text-ngo-black/75 max-w-[460px]">
                Every program we run is designed to create measurable outcomes for vulnerable communities. From
                clean water access and emergency nutrition to long-term education support, our impact is driven by
                local partnerships and sustained action.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1320px] mx-auto pt-20 md:pt-28 border-t border-ngo-black/10">
          <div className="flex items-center gap-4 mb-8 md:mb-10 pt-12 md:pt-14">
            <div className="h-[2px] w-12 bg-ngo-black/50" />
           
          </div>

          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-extrabold mb-4">
            Impact Stories
          </h2>
          <p className="text-[16px] md:text-[18px] leading-relaxed text-ngo-black/75 mb-12 max-w-[700px]">
            See how your support is transforming lives, building communities, and creating lasting change.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-center">
            <div>
              <h3 className="text-[32px] sm:text-[40px] md:text-[44px] leading-[1.15] font-extrabold mb-6 text-ngo-black">
                Empowering Women Entrepreneurs
              </h3>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75 mb-6">
                In many underserved communities, women face significant barriers when it comes to accessing financial resources, business education, and economic opportunities. Limited access to capital and lack of training often prevent them from turning their ideas into sustainable sources of income.
              </p>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75 mb-6">
                Our initiative was designed to break these barriers by providing comprehensive support through skills training, mentorship, and financial assistance. We organized hands-on workshops covering business fundamentals such as budgeting, marketing, customer service, and product development. In addition, selected participants received small grants and continuous guidance to help them successfully launch and grow their businesses.
              </p>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75">
                Beyond economic benefits, this program has helped women gain confidence, independence, and leadership skills, enabling them to actively contribute to their households and communities.
              </p>
            </div>

            <div className="relative max-w-full">
              <div className="absolute -right-3 -bottom-3 md:-right-5 md:-bottom-5 h-full w-full rounded-[8px] bg-black" />
              <div className="relative overflow-hidden rounded-[8px] h-[400px] sm:h-[480px] md:h-[550px]">
                <img src={womanImage} alt="Woman entrepreneur with colorful fabric" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center pt-16 md:pt-24">
            <div className="relative max-w-full">
              <div className="absolute -right-3 -bottom-3 md:-right-5 md:-bottom-5 h-full w-full rounded-[8px] bg-black" />
              <div className="relative overflow-hidden rounded-[8px] h-[400px] sm:h-[480px] md:h-[550px]">
                <img src={childImage} alt="Child studying" className="w-full h-full object-cover" />
              </div>
            </div>

            <div>
              <h3 className="text-[32px] sm:text-[40px] md:text-[44px] leading-[1.15] font-extrabold mb-6 text-ngo-black">
                Education for Every Child
              </h3>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75 mb-6">
                Access to quality education remains a challenge for many children in low-income families, where financial hardships often force students to drop out of school at an early age. Without proper support, these children risk losing opportunities for a better future.
              </p>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75 mb-6">
                Our program focuses on removing these barriers by providing essential school supplies, financial scholarships, and community support systems. We work closely with schools, parents, and local organizations to identify students in need and ensure they receive the resources required to continue their education.
              </p>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75">
                In addition to material support, we emphasize the importance of education through awareness programs and mentorship, helping students stay motivated and focused on their goals. By creating a supportive learning environment, we aim to not only keep children in school but also empower them to achieve their full potential.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-center pt-16 md:pt-24">
            <div>
              <h3 className="text-[32px] sm:text-[40px] md:text-[44px] leading-[1.15] font-extrabold mb-6 text-ngo-black">
                Clean Water for Healthy Communities
              </h3>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75 mb-6">
                Access to clean and safe drinking water is a daily struggle for many rural communities, where families often rely on unsafe water sources such as rivers, ponds, or unprotected wells. This leads to serious health issues, including waterborne diseases, especially among children.
              </p>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75 mb-6">
                Our initiative focuses on providing sustainable clean water solutions by installing safe water systems such as tube wells, purification units, and community water stations. Alongside infrastructure, we conduct hygiene awareness programs to educate families on safe water usage, sanitation practices, and disease prevention.
              </p>
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ngo-black/75">
                We work closely with local leaders and residents to ensure long-term sustainability, training community members to maintain and manage these water systems independently. This not only improves health conditions but also enhances the overall quality of life in underserved areas.
              </p>
            </div>

            <div className="relative max-w-full">
              <div className="absolute -right-3 -bottom-3 md:-right-5 md:-bottom-5 h-full w-full rounded-[8px] bg-black" />
              <div className="relative overflow-hidden rounded-[8px] h-[400px] sm:h-[480px] md:h-[550px]">
                <img src={waterImage} alt="Clean water access" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pt-20 md:pt-28">
          <div className="relative w-full overflow-hidden h-[400px] sm:h-[450px] md:h-[500px]">
            <img src={child1Image} alt="Child looking at camera" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex flex-col items-center justify-center px-6 md:px-14 lg:px-20">
              <div className="text-center max-w-[600px]">
                <h2 className="text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] font-extrabold mb-6 text-white">
                  Your Contribution Can Change a Life Today
                </h2>
                <p className="text-[16px] md:text-[18px] leading-relaxed text-white/90 mb-8">
                  Even a small donation can create meaningful change. Support verified NGOs and help us build stronger communities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-ngo-yellow text-ngo-black px-8 py-3 rounded-[4px] text-[14px] font-bold hover:bg-[#eab800] transition-colors">
                    Donate Now
                  </button>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-[4px] text-[14px] font-bold hover:bg-white/10 transition-colors">
                    See How Donations Help
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Impact
