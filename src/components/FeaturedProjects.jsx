import React from 'react'
import img8 from '../assets/image_8.png'
import img9 from '../assets/image_9.png'
import img10 from '../assets/image_10.png'
import img11 from '../assets/image_11.png'

const projects = [
  {
    title: 'Community Food Drive',
    description: 'The Community Food Drive initiative focuses on addressing food insecurity among vulnerable families living in rural and underserved communities. Many households struggle to access regular nutritious meals due to economic hardship, unemployment, or limited access to local resources.',
    stat: '3,000+',
    statLabel: 'families supported',
    image: img9,
  },
  {
    title: 'Clean Water Initiative',
    description: 'Access to clean and safe drinking water remains a critical issue in many rural and underserved communities. The Clean Water Initiative focuses on providing sustainable water solutions such as wells, filtration systems, and community water projects.',
    stat: '400+',
    statLabel: 'people served',
    image: img8,
  },
  {
    title: 'School Support Initiative',
    description: 'Education is one of the most powerful tools for breaking the cycle of poverty. Yet many children from low-income families struggle to access the resources they need to succeed in school. The School Support Initiative aims to ensure that every child has the opportunity to learn, grow, and achieve their full potential.',
    stat: '1,200+',
    statLabel: 'students supported',
    image: img10,
  },
  {
    title: 'Mobile Healthcare Clinics',
    description: 'Access to basic healthcare services remains a major challenge in many remote and rural areas where medical facilities are limited or unavailable. The Mobile Healthcare Clinics initiative was created to bridge this gap by bringing essential healthcare services directly to communities that need them most.',
    stat: '5,500+',
    statLabel: 'patients treated',
    image: img11,
  },
]

const FeaturedProjects = () => {
  return (
    <section className="bg-white py-[80px] px-6 md:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-[40px] md:text-[48px] font-extrabold text-ngo-black leading-tight">
            Featured NGO Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col h-full">
              {/* Image Container with Badge */}
              <div className="relative rounded-[12px] overflow-hidden mb-6 flex-shrink-0 h-[280px]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* Yellow Stat Badge */}
                <div className="absolute bottom-4 left-4 bg-ngo-yellow text-ngo-black px-4 py-2 rounded-[4px] font-bold text-[14px]">
                  {project.stat}
                  <br />
                  <span className="text-[12px]">{project.statLabel}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-[24px] font-extrabold text-ngo-black mb-4 leading-[1.2]">{project.title}</h3>
                <p className="text-black/70 text-[16px] leading-[1.8] mb-6 flex-grow">{project.description}</p>
                <button className="bg-transparent text-ngo-black border-2 border-ngo-black px-6 py-3 rounded font-bold text-[14px] uppercase tracking-wider hover:bg-ngo-black hover:text-white transition-colors cursor-pointer w-fit">
                  Support This Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
