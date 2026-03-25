import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Platform from '../components/Platform'
import ImpactDonation from '../components/ImpactDonation'
import FocusAreas from '../components/FocusAreas'
import FeaturedProjects from '../components/FeaturedProjects'
import CTASection from '../components/CTASection'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div className="min-h-screen font-sans antialiased bg-ngo-black">
      <Navbar />
      <Hero />
      <Platform />
      <ImpactDonation />
      <FocusAreas />
      <FeaturedProjects />
      <CTASection />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default HomePage
