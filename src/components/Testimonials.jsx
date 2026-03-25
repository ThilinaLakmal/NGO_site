import React, { useState } from 'react'
import avatarImg from '../assets/image_13.png'

const testimonials = [
  {
    name: 'John Smith',
    role: 'Corporate CSR Manager',
    quote: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen book.',
    avatar: avatarImg,
  },
  {
    name: 'John Smith',
    role: 'Corporate CSR Manager',
    quote: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen book.',
    avatar: avatarImg,
  },
  {
    name: 'John Smith',
    role: 'Corporate CSR Manager',
    quote: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen book.',
    avatar: avatarImg,
  },
  {
    name: 'John Smith',
    role: 'Corporate CSR Manager',
    quote: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen book.',
    avatar: avatarImg,
  },
  {
    name: 'John Smith',
    role: 'Corporate CSR Manager',
    quote: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a gallery of type and scrambled it to make a type specimen book.',
    avatar: avatarImg,
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
