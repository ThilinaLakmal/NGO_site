import React, { useState } from 'react'
import avatarImg from '../assets/image_13.png'

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Monthly Supporter',
    quote: 'Partnering with this organization has been profoundly rewarding. Seeing the direct impact my monthly contributions have on building classrooms and providing educational resources brings me so much joy. Transparency and dedication shine through everything they do.',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random&color=fff',
  },
  {
    name: 'Michael Chen',
    role: 'Corporate Partner',
    quote: 'Our company was looking for a grassroots NGO that aligns with our core values of sustainability and community empowerment. This team not only delivers on their promises but consistently provides detailed updates on how our financial support is transforming local lives.',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random&color=fff',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Annual Donor',
    quote: 'The level of accountability is incredible. I receive regular reports showing exactly how my donations help fund agricultural initiatives and health camps. It gives me peace of mind knowing that my contribution is actually reaching those who need it most.',
    avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=random&color=fff',
  },
  {
    name: 'David Okafor',
    role: 'Community Advocate',
    quote: 'I have volunteered and donated to many causes over the years, but the community-driven approach here stands out. They empower individuals rather than just offering temporary relief, building resilient neighborhoods that can sustain themselves long-term.',
    avatar: 'https://ui-avatars.com/api/?name=David+Okafor&background=random&color=fff',
  },
  {
    name: 'Emily Thompson',
    role: 'Philanthropist',
    quote: 'What sets them apart is their holistic strategy. From accessible healthcare to empowering small businesses, every dollar is invested into creating a cycle of opportunity. It is an honor to support a foundation that creates such lasting, systemic change.',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Thompson&background=random&color=fff',
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const displayedTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  return (
    <section className="bg-white py-[80px] px-6 md:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-[40px] md:text-[48px] font-extrabold text-ngo-black leading-tight">
            What Our Donors Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-[16px] p-10 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Quote */}
              <div className="mb-8">
                <p className="text-black/80 text-[14px] leading-[1.8]">"{testimonial.quote}"</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-full border-[3px] border-ngo-yellow overflow-hidden shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-ngo-black text-[14px] uppercase">{testimonial.name}</p>
                  <p className="text-black/50 text-[12px] mt-1">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-ngo-black w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
