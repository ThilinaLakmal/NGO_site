import React from 'react'
import img3 from '../assets/whatsapp7.jpg'
import img4 from '../assets/whatsapp5.png'
import img5 from '../assets/trading.png'
import img6 from '../assets/insuarance.png'
import img7 from '../assets/agricultural.jpg'
import img8 from '../assets/housing.png'
import img9 from '../assets/health.png'
import img11 from '../assets/whatsapp16.JPG'
import img13 from '../assets/whatsapp18.jpg'
import img14 from '../assets/whatsapp15.jpeg'
import img15 from '../assets/whatsapp17.jpeg'
import img16 from '../assets/whatsapp19.jpeg'
import img17 from '../assets/whatsapp20.jpeg'
import img18 from '../assets/whatsapp21.jpeg'
import img19 from '../assets/whatsapp22.JPG'
import img20 from '../assets/whatsapp23.JPG'
import img21 from '../assets/whatsapp24.jpeg'
import img23 from '../assets/whatsapp24.jpg'
import img24 from '../assets/whatsapp26.jpeg'
import img25 from '../assets/whatsapp27.JPG'
import img26 from '../assets/whatsapp31.jpeg'
import img27 from '../assets/whatsapp32.jpeg'
import img28 from '../assets/whatsapp33.jpeg'

const focusAreas = [
  {
    title: 'Financial',
    description: 'Supporting programs that provide financial assistance and economic empowerment to those in need.',
    image: img3,
  },
  {
    title: 'Manufactural',
    description: 'Fostering local manufacturing and job creation through targeted support and investment.',
    image: img4,
  },
  {
    title: 'Trading',
    description: 'Promoting fair trade practices and supporting small businesses in local and global markets.',
    image: img5,
  },
  {
    title: 'Insuarance',
    description: 'Providing access to affordable insurance to protect vulnerable families from unexpected hardships.',
    image: img6,
  },
  {
    title: 'Agricultural',
    description: 'Empowering farmers with sustainable agricultural practices and resources to ensure food security.',
    image: img7,
  },
  {
    title: 'Housing',
    description: 'Building and providing safe, affordable housing for families and individuals in need of shelter.',
    image: img8,
  },
  {
    title: 'Health and education',
    description: 'Ensuring access to quality healthcare and educational opportunities for all members of the community.',
    image: img9,
  },
]

const FocusAreas = () => {
  return (
    <section className="bg-white py-[80px] px-6 md:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Cards Grid with Yellow Header Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Yellow Header Box */}
          <div className="bg-ngo-yellow rounded-[16px] p-12 flex flex-col justify-center md:row-span-1">
            <h2 className="text-[32px] md:text-[36px] font-extrabold text-ngo-black leading-tight">
              Areas Where<br />We Make a<br /><span className="text-[40px] md:text-[48px]">Difference</span>
            </h2>
            <div className="mt-8 text-ngo-black text-[20px]">🎯</div>
          </div>

          {focusAreas.map((area) => (
            <div key={area.title} className="relative rounded-[16px] overflow-hidden group cursor-pointer h-[280px]">
              <img
                src={area.image}
                alt={area.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <h3 className="text-ngo-yellow text-[20px] font-bold mb-2">{area.title}</h3>
                <p className="text-white/90 text-[14px] leading-[1.6]">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FocusAreas
