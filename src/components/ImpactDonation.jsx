import React, { useState } from 'react'

const ImpactDonation = () => {
  const [selectedAmount, setSelectedAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState('online')
  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const amounts = [10, 20, 30, 40, 50]

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  return (
    <section className="bg-white py-[100px] px-6 md:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-stretch">
        {/* LEFT - Impact Stats */}
        <div className="flex flex-col gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-ngo-black leading-tight mb-4">
              Our Collective Impact
            </h2>
            <p className="text-black/80 text-[18px] leading-[1.6] max-w-md mx-auto md:mx-0 font-medium">
              Together with our NGO partners, we are creating measurable social change across communities.
            </p>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="bg-black rounded-xl p-8 flex flex-col justify-center text-center sm:text-left min-h-[160px]">
              <p className="text-[12px] font-bold text-white tracking-widest uppercase leading-snug">
                <span className="text-ngo-yellow text-[16px] mr-1">15+</span> ACTIVE SOCIAL PROJECTS<br />NATIONWIDE
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-black rounded-xl p-8 flex flex-col justify-center text-center sm:text-left min-h-[160px]">
               <p className="text-[12px] font-bold text-white tracking-widest uppercase leading-snug">
                OVER <span className="text-ngo-yellow text-[16px]">25,000</span> LIVES POSITIVELY<br />IMPACTED
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-black rounded-xl p-8 flex flex-col justify-center text-center sm:text-left min-h-[160px]">
              <p className="text-[12px] font-bold text-white tracking-widest uppercase leading-snug">
                <span className="text-ngo-yellow text-[16px] mr-1">5</span> CORE SUPPORT VERTICALS
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-black rounded-xl p-8 flex flex-col justify-center text-center sm:text-left min-h-[160px]">
               <p className="text-[12px] font-bold text-white tracking-widest uppercase leading-snug">
                <span className="text-ngo-yellow text-[16px] mr-1">100%</span> SECURE & TRANSPARENT<br />DONATIONS
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - Donation Form */}
        <div className="bg-white border-[1.5px] border-black p-8 md:p-12 h-full flex flex-col">
          <h3 className="text-[18px] font-extrabold text-center text-ngo-black mb-8">Select Donation Amount</h3>
          
          {/* Amount Selection */}
          <div className="grid grid-cols-5 gap-0 border border-gray-200 mb-4">
            {amounts.map((amount, idx) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`py-3 text-[12px] font-bold transition-all border-r border-gray-200 last:border-r-0 ${
                  selectedAmount === amount && !customAmount
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          
          {/* Other Amount Input */}
          <div className="mb-6">
            <input
              type="number"
              placeholder="Other Amount (USD)"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount(null)
              }}
              className="w-full text-center border border-gray-100 bg-gray-50/50 py-3 text-[14px] italic focus:outline-none focus:border-gray-300 transition-colors"
            />
          </div>

          {/* Donation Type Toggles */}
          <div className="flex border border-gray-300 mb-8">
            <button
              onClick={() => setDonationType('online')}
              className={`flex-1 py-3 text-[12px] font-bold transition-colors ${
                donationType === 'online' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
              }`}
            >
              Donate Online
            </button>
            <button
              onClick={() => setDonationType('offline')}
              className={`flex-1 py-3 text-[12px] font-bold transition-colors border-l border-gray-300 ${
                donationType === 'offline' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
              }`}
            >
              Donate Offline
            </button>
          </div>

          {/* Payment Method Section */}
          <div className="mb-8">
             <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.15em] mb-4">PAYMENT METHOD</p>
             <div className="grid grid-cols-2 gap-4">
                {/* PayPal Option */}
                <div className="flex flex-col items-center gap-3">
                   <button 
                      onClick={() => setPaymentMethod('paypal')}
                      className={`w-full py-2 flex justify-center items-center border rounded-[4px] transition-colors ${
                        paymentMethod === 'paypal' ? 'border-blue-400 bg-blue-50/10' : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                   >
                     <span className="text-[#003087] font-bold italic text-[14px]"><span className="text-[#009cde]">Pay</span>Pal</span>
                   </button>
                   <div className="text-[#1A1F71] font-bold italic text-[18px] mt-1">VISA</div> 
                </div>
                {/* Credit Card Option */}
                <div className="flex flex-col items-center gap-3">
                   <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full py-2 flex justify-center items-center border rounded-[4px] transition-colors ${
                         paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200 bg-white hover:border-black'
                      }`}
                   >
                     <span className="text-black font-extrabold text-[11px]">CREDIT CARD</span>
                   </button>
                   <div className="flex mt-1">
                      <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90 -mr-2 z-10 mix-blend-multiply"></div>
                      <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90"></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Frequency Dropdown */}
          <div className="mb-8">
            <div className="w-full border border-gray-200 py-3 px-4 flex justify-between items-center text-[12px] text-gray-500 cursor-pointer hover:border-gray-300 transition-colors">
               <span>* One Time</span>
               <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-ngo-yellow text-ngo-black py-4 font-bold text-[16px] hover:bg-yellow-500 transition-colors cursor-pointer border-none shadow-sm">
            Donate Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default ImpactDonation
