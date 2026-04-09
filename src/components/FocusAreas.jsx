import React from 'react'
import img3 from '../assets/whatsapp5.png'
import img4 from '../assets/whatsapp7.png'
import img5 from '../assets/whatsapp6.png'
import img6 from '../assets/whatsapp4.png'
import img7 from '../assets/whatsapp8.png'
import img8 from '../assets/whatsapp13.jpg'
import img9 from '../assets/whatsapp14.jpg'
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

const focusAreas = [
  {
    title: 'Elderly Care',
    description: 'Supporting programs that provide healthcare, shelter, and emotional care for elderly citizens who need assistance.',
    image: img3,
  },
  {
    title: 'Community Assistance',
    description: 'Providing direct assistance and essential supplies to households through community outreach programs.',
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
  {
    title: 'Food Distribution',
    description: 'Delivering essential food packages directly to families and individuals in need across communities.',
    image: img8,
  },
  {
    title: 'Religious & Cultural Support',
    description: 'Honouring spiritual traditions by supporting religious communities and cultural ceremonies.',
    image: img9,
  },
  {
    title: 'Community Gatherings',
    description: 'Bringing people together through organised community events and charitable outreach programs.',
    image: img11,
  },
  {
    title: 'Outreach Events',
    description: 'Reaching vulnerable populations through structured outreach events and support drives.',
    image: img13,
  },
  {
    title: 'Relief Package Distribution',
    description: 'Providing essential care packages to families through community support and direct assistance initiatives.',
    image: img14,
  },
  {
    title: 'Reforestation Drive',
    description: 'Planting trees across communities to restore ecosystems and combat climate change.',
    image: img15,
  },
  {
    title: 'Green Volunteering',
    description: 'Encouraging individuals to take hands-on action in nurturing the natural environment.',
    image: img16,
  },
  {
    title: 'Plant Saplings Initiative',
    description: 'Distributing plant saplings to promote eco-friendly practices among community members.',
    image: img17,
  },
  {
    title: 'Community Gifting',
    description: 'Distributing essential goods and care packages to families and community members in need.',
    image: img18,
  },
  {
    title: 'Disaster Relief Planning',
    description: 'Coordinating essential supplies and response efforts to support families affected by emergencies.',
    image: img19,
  },
  {
    title: 'Emergency Outreach',
    description: 'Visiting impacted neighbourhoods to assess urgent needs and organise immediate community support.',
    image: img20,
  },
  {
    title: 'Sports Sponsorship',
    description: 'Supporting young athletes and community sports initiatives with resources and visibility.',
    image: img21,
  },
  {
    title: 'Religious Leaders Welfare',
    description: 'Supporting monks and religious leaders with essential goods and welfare assistance through donation initiatives.',
    image: img23,
  },
  {
    title: 'Eco Stewardship',
    description: 'Encouraging hands-on environmental action through planting and long-term care of local green spaces.',
    image: img24,
  },
  {
    title: 'Religious Leaders Support Program',
    description: 'Providing respectful assistance and essential support for religious leaders through community-led service efforts.',
    image: img25,
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
