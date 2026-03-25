import React from 'react'
import img3 from '../assets/image_3.png'
import img4 from '../assets/image_4.png'
import img5 from '../assets/image_5.png'
import img6 from '../assets/image_6.png'
import img7 from '../assets/image_7.png'

const focusAreas = [
  {
    title: 'Elderly Care',
    description: 'Supporting programs that provide healthcare, shelter, and emotional care for elderly citizens who need assistance.',
    image: img3,
  },
  {
    title: 'Community Development',
    description: 'Empowering local communities through education, livelihood support, and infrastructure initiatives.',
    image: img4,
  },
  {
    title: 'Healthcare Support',
    description: 'Helping underprivileged individuals access essential medical care and life-saving treatments.',
    image: img5,
  },
  {
    title: 'Environmental Protection',
    description: 'Supporting initiatives that protect nature, promote sustainability, and preserve ecosystems.',
    image: img6,
  },
  {
    title: 'Social Welfare',
    description: 'Providing emergency relief, food programs, and welfare assistance for vulnerable groups.',
    image: img7,
  },
]

const FocusAreas = () => {
  return (
    <section className="bg-white py-[80px] px-6 md:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Cards Grid with Yellow Header Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Yellow Header Box */}
          <div className="bg-ngo-yellow rounded-[16px] p-12 flex flex-col justify-center md:row-span-1">
            <h2 className="text-[32px] md:text-[36px] font-extrabold text-ngo-black leading-tight">
              Areas Where<br />We Make a<br /><span className="text-[40px] md:text-[48px]">Difference</span>
            </h2>
            <div className="mt-8 text-ngo-black text-[20px]">🎯</div>
          </div>

          {/* Card 1 - Elderly Care */}
          <div className="relative rounded-[16px] overflow-hidden group cursor-pointer h-[280px]">
            <img
              src={focusAreas[0].image}
              alt={focusAreas[0].title}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <h3 className="text-ngo-yellow text-[20px] font-bold mb-2">{focusAreas[0].title}</h3>
              <p className="text-white/90 text-[14px] leading-[1.6]">{focusAreas[0].description}</p>
            </div>
          </div>

          {/* Card 2 - Community Development */}
          <div className="relative rounded-[16px] overflow-hidden group cursor-pointer h-[280px]">
            <img
              src={focusAreas[1].image}
              alt={focusAreas[1].title}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <h3 className="text-ngo-yellow text-[20px] font-bold mb-2">{focusAreas[1].title}</h3>
              <p className="text-white/90 text-[14px] leading-[1.6]">{focusAreas[1].description}</p>
            </div>
          </div>

          {/* Card 3 - Healthcare Support */}
          <div className="relative rounded-[16px] overflow-hidden group cursor-pointer h-[280px]">
            <img
              src={focusAreas[2].image}
              alt={focusAreas[2].title}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <h3 className="text-ngo-yellow text-[20px] font-bold mb-2">{focusAreas[2].title}</h3>
              <p className="text-white/90 text-[14px] leading-[1.6]">{focusAreas[2].description}</p>
            </div>
          </div>

          {/* Card 4 - Environmental Protection */}
          <div className="relative rounded-[16px] overflow-hidden group cursor-pointer h-[280px]">
            <img
              src={focusAreas[3].image}
              alt={focusAreas[3].title}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <h3 className="text-ngo-yellow text-[20px] font-bold mb-2">{focusAreas[3].title}</h3>
              <p className="text-white/90 text-[14px] leading-[1.6]">{focusAreas[3].description}</p>
            </div>
          </div>

          {/* Card 5 - Social Welfare */}
          <div className="relative rounded-[16px] overflow-hidden group cursor-pointer h-[280px]">
            <img
              src={focusAreas[4].image}
              alt={focusAreas[4].title}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <h3 className="text-ngo-yellow text-[20px] font-bold mb-2">{focusAreas[4].title}</h3>
              <p className="text-white/90 text-[14px] leading-[1.6]">{focusAreas[4].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FocusAreas
