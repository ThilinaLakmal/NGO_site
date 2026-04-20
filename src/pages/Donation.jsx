import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PAYPAL_CLIENT_ID } from '../config/paypalConfig'
import { isValidAmount } from '../utils/donationHelper'
import Footer from '../components/Footer'
import image1 from '../assets/child1.png'
import image2 from '../assets/unsplash_AEaTUnvneik.png'
import image3 from '../assets/woman1.png'
import image4 from '../assets/child.png'
import image5 from '../assets/uncle.png'
import image6 from '../assets/woman.png'

function Donation() {
  const [selectedAmount, setSelectedAmount] = useState(10)
  const [otherAmount, setOtherAmount] = useState('')
  const [donationType, setDonationType] = useState('online')
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [frequency, setFrequency] = useState('onetime')
  const paypalContainerRef = useRef(null)

  // Embedded Payment Form Fields
  const [paymentForm, setPaymentForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  })

  const [lastDonation, setLastDonation] = useState(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const [cardTypeSelection, setCardTypeSelection] = useState('')
  const [paypalLoaded, setPaypalLoaded] = useState(false)

  // Reset form state when component mounts and load PayPal SDK
  useEffect(() => {
    setSelectedAmount(10)
    setOtherAmount('')
    setDonationType('online')
    setMessage('')
    setFrequency('onetime')
    setPaymentForm({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
    })
    setLastDonation(null)
    setShowReceipt(false)
    setCardTypeSelection('')

    // Load PayPal SDK
    if (!window.paypal) {
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`
      script.async = true
      script.onload = () => {
        setPaypalLoaded(true)
      }
      document.body.appendChild(script)
    } else {
      setPaypalLoaded(true)
    }
  }, [])

  const amounts = [10, 20, 30, 40, 50]

  // Initialize PayPal Buttons when SDK is loaded and donation type is online
  useEffect(() => {
    if (!paypalLoaded || donationType !== 'online' || !paypalContainerRef.current || showReceipt) return

    // Validate form before rendering buttons
    const amount = getFinalAmount()
    const isFormValid = paymentForm.email && paymentForm.firstName && paymentForm.lastName && amount > 0

    if (!isFormValid) {
      setMessage('Please fill in all required fields and select a valid amount')
      return
    }

    // Clear previous buttons
    if (paypalContainerRef.current) {
      paypalContainerRef.current.innerHTML = ''
    }

    // Render PayPal Buttons
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        const amount = getFinalAmount()

        // Validate amount
        if (!isValidAmount(amount)) {
          setMessage('Invalid donation amount. Please enter an amount between $1 and $999,999.99')
          throw new Error('Invalid amount')
        }

        // Create order with dynamic amount
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
                currency_code: 'USD',
              },
              description: `NGO Donation - ${frequency === 'monthly' ? 'Monthly' : frequency === 'quarterly' ? 'Quarterly' : frequency === 'yearly' ? 'Yearly' : 'One-Time'}${cardTypeSelection ? ` (${cardTypeSelection.toUpperCase()})` : ''}`,
              custom_id: `donation_${cardTypeSelection || 'none'}_${Date.now()}`,
            },
          ],
          application_context: {
            brand_name: 'NGO Organization',
            landing_page: 'BILLING',
            user_action: 'PAY_NOW',
          },
        })
      },

      onApprove: async (data, actions) => {
        setIsProcessing(true)
        setMessage('')

        try {
          // Capture the order
          const order = await actions.order.capture()

          // Order captured successfully
          const amount = getFinalAmount()
          const donationRecord = {
            id: order.id || Date.now(),
            type: 'paypal',
            amount: amount,
            frequency: frequency,
            preferredCardType: cardTypeSelection,
            donorEmail: paymentForm.email,
            donorName: `${paymentForm.firstName} ${paymentForm.lastName}`,
            donorAddress: paymentForm.address,
            donorCity: paymentForm.city,
            donorState: paymentForm.state,
            donorZipCode: paymentForm.zipCode,
            donorCountry: paymentForm.country,
            timestamp: new Date().toISOString(),
            status: 'completed', // Mark as completed after successful capture
            paypalOrderId: order.id,
            paypalStatus: order.status,
          }

          // Update donation status in localStorage
          const donations = JSON.parse(localStorage.getItem('donations') || '[]')
          const donationIndex = donations.findIndex(d => d.id === donationRecord.id)
          
          if (donationIndex !== -1) {
            donations[donationIndex] = donationRecord
          } else {
            donations.push(donationRecord)
          }
          
          localStorage.setItem('donations', JSON.stringify(donations))

          // Hide PayPal buttons
          if (paypalContainerRef.current) {
            paypalContainerRef.current.style.display = 'none'
          }

          // Show success message and receipt
          setLastDonation(donationRecord)
          setShowReceipt(true)
          setMessage(`✓ Thank you for your generous donation of $${amount.toFixed(2)}! Your receipt has been generated.`)
          setIsProcessing(false)

          // Reset form after success
          setTimeout(() => {
            setPaymentForm({
              email: '',
              firstName: '',
              lastName: '',
              address: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'US',
            })
            setOtherAmount('')
            setSelectedAmount(10)
            setCardTypeSelection('')
            setFrequency('onetime')
          }, 2000)
        } catch (error) {
          setMessage(`❌ Payment capture failed: ${error.message}. Please try again or contact support.`)
          console.error('PayPal Capture Error:', error)
          setIsProcessing(false)
        }
      },

      onCancel: () => {
        setMessage('⚠️ You cancelled the donation. Your donation was not processed.')
        setIsProcessing(false)
      },

      onError: (err) => {
        setMessage(`❌ Payment error: ${err.message || 'An unexpected error occurred. Please try again.'}`)
        console.error('PayPal Error:', err)
        setIsProcessing(false)
      },
    }).render(paypalContainerRef.current)
  }, [paypalLoaded, donationType, paymentForm, frequency, cardTypeSelection, otherAmount, selectedAmount, showReceipt])

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount)
    setOtherAmount('')
  }

  const getFinalAmount = () => {
    return otherAmount ? parseFloat(otherAmount) : selectedAmount
  }

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

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
      <section className="py-[100px] px-6 md:px-24 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-stretch">
            {/* Left Content - About & Documents */}
            <div className="flex flex-col">
              <h2 className="text-[36px] md:text-[40px] font-extrabold text-ngo-black mb-8">
                About
              </h2>

              <p className="text-ngo-black/75 text-[15px] leading-[1.8] mb-6">
                Our organization is dedicated to creating sustainable and meaningful change across diverse sectors of society. We believe in a holistic approach to development, focusing on seven key pillars to empower communities and uplift lives. Through targeted initiatives, we provide crucial support in financial literacy, foster growth in local manufacturing, and promote fair trading practices to ensure economic vitality.
              </p>

              <p className="text-ngo-black/75 text-[15px] leading-[1.8] mb-12">
                We also work to secure the well-being of individuals by offering accessible insurance, advancing agricultural practices for food security, and ensuring safe and stable housing. At the core of our mission is an unwavering commitment to health and education, which we see as the fundamental building blocks for a prosperous and equitable future. Your contribution helps us continue this vital work, touching lives and building resilient communities one project at a time.
              </p>

              <p className="text-ngo-black/75 text-[15px] leading-[1.8] mb-6">
                Transparency and accountability are the cornerstones of our operations. We ensure that every donation is carefully allocated to projects that deliver the highest impact. We have clear strategic plans, financial reports, and project milestones, giving you full visibility into how we transform your generosity into tangible results.
              </p>

              <p className="text-ngo-black/75 text-[15px] leading-[1.8]">
                By partnering with us, you are not just making a donation; you are investing in a continuous cycle of positive change. Whether it is equipping a farmer with better tools, helping a small business thrive, or building a classroom for the next generation, your support creates a ripple effect of empowerment. Join us in our journey to build stronger, self-sustaining communities.
              </p>
            </div>

            {/* Right Content - Donation Form */}
            <div className="bg-white border-[1.5px] border-black p-8 md:p-12 h-full flex flex-col rounded-lg">
              {message && (
                <div className={`p-4 rounded-md mb-6 text-[13px] font-bold ${
                  message.includes('Error') || message.includes('failed') || message.includes('Please fill') || message.includes('Invalid') 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : 'bg-green-50 text-green-700 border border-green-200'
                }`}>
                  {message}
                </div>
              )}

              {!showReceipt ? (
                <div className="space-y-6">
                  <div className="mb-6 flex gap-4 border-b border-gray-200 pb-4">
                    <button 
                      onClick={() => setDonationType('online')}
                      className={`flex-1 pb-4 text-sm font-bold tracking-wider uppercase transition-colors relative ${
                        donationType === 'online' ? 'text-ngo-black' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Online Payment
                      {donationType === 'online' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ngo-black"></span>}
                    </button>
                    <button 
                      onClick={() => setDonationType('offline')}
                      className={`flex-1 pb-4 text-sm font-bold tracking-wider uppercase transition-colors relative ${
                        donationType === 'offline' ? 'text-ngo-black' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Offline Payment
                      {donationType === 'offline' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ngo-black"></span>}
                    </button>
                  </div>

                  <div>
                    <p className="text-[13px] font-bold mb-3 uppercase tracking-wider">Select Amount</p>
                    <div className="grid grid-cols-3 gap-3">
                      {amounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleAmountClick(amount)}
                          className={`py-3 px-4 rounded font-bold transition-all duration-200 ${
                            selectedAmount === amount && !otherAmount
                              ? 'bg-ngo-yellow text-ngo-black border-2 border-ngo-yellow scale-105 shadow-sm'
                              : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-ngo-yellow/50'
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                      <input 
                        type="number" 
                        min="1"
                        placeholder="Other Amount" 
                        value={otherAmount}
                        onChange={(e) => {
                          setOtherAmount(e.target.value)
                          setSelectedAmount(null)
                        }}
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 bg-gray-50 rounded focus:outline-none focus:bg-white focus:border-ngo-black transition-colors font-bold text-ngo-black"
                      />
                    </div>
                  </div>

                  {donationType === 'online' ? (
                    <>
                      <div>
                        <p className="text-[13px] font-bold text-ngo-black mb-3 uppercase tracking-wider">
                          Donation Frequency
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {['onetime', 'monthly', 'quarterly', 'yearly'].map((freq) => (
                            <button
                              key={freq}
                              onClick={() => setFrequency(freq)}
                              className={`py-2 px-1 text-[11px] font-bold rounded uppercase tracking-wider transition-colors ${
                                frequency === freq
                                  ? 'bg-ngo-black text-white'
                                  : 'bg-transparent text-ngo-black border border-ngo-black/20 hover:border-ngo-black'
                              }`}
                            >
                              {freq.replace('onetime', 'One Time')}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[13px] font-bold text-ngo-black mb-3 uppercase tracking-wider">
                          Donor Information
                        </label>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            name="firstName"
                            value={paymentForm.firstName}
                            onChange={handlePaymentFormChange}
                            placeholder="First Name *"
                            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 focus:bg-white rounded text-ngo-black text-[13px] focus:outline-none focus:border-ngo-black"
                            required
                          />
                          <input
                            type="text"
                            name="lastName"
                            value={paymentForm.lastName}
                            onChange={handlePaymentFormChange}
                            placeholder="Last Name *"
                            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 focus:bg-white rounded text-ngo-black text-[13px] focus:outline-none focus:border-ngo-black"
                            required
                          />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={paymentForm.email}
                          onChange={handlePaymentFormChange}
                          placeholder="Email Address *"
                          className="w-full px-3 py-2 border border-gray-300 bg-gray-50 focus:bg-white rounded text-ngo-black text-[13px] focus:outline-none focus:border-ngo-black mb-3"
                          required
                        />
                        <input
                          type="text"
                          name="address"
                          value={paymentForm.address}
                          onChange={handlePaymentFormChange}
                          placeholder="Street Address"
                          className="w-full px-3 py-2 border border-gray-300 bg-gray-50 focus:bg-white rounded text-ngo-black text-[13px] focus:outline-none focus:border-ngo-black mb-3"
                        />
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            name="city"
                            value={paymentForm.city}
                            onChange={handlePaymentFormChange}
                            placeholder="City"
                            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 focus:bg-white rounded text-ngo-black text-[13px] focus:outline-none focus:border-ngo-black"
                          />
                          <input
                            type="text"
                            name="state"
                            value={paymentForm.state}
                            onChange={handlePaymentFormChange}
                            placeholder="State / Province"
                            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 focus:bg-white rounded text-ngo-black text-[13px] focus:outline-none focus:border-ngo-black"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            name="zipCode"
                            value={paymentForm.zipCode}
                            onChange={handlePaymentFormChange}
                            placeholder="Zip / Postal Code"
                            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 focus:bg-white rounded text-ngo-black text-[13px] focus:outline-none focus:border-ngo-black"
                          />
                          <select
                            name="country"
                            value={paymentForm.country}
                            onChange={handlePaymentFormChange}
                            className="w-full px-3 py-2 border border-gray-300 bg-gray-50 focus:bg-white rounded text-ngo-black text-[13px] focus:outline-none focus:border-ngo-black"
                          >
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="LK">Sri Lanka</option>
                            <option value="OTHER">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[13px] font-semibold text-gray-600">Total Donation:</span>
                          <span className="text-[18px] font-bold text-ngo-black">${getFinalAmount().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[13px] font-semibold text-gray-600">Frequency:</span>
                          <span className="text-[13px] font-bold text-ngo-black capitalize">{frequency === 'onetime' ? 'One Time' : frequency}</span>
                        </div>
                        
                        <div className="border-t border-gray-200 mt-4 pt-4">
                          <div className="flex flex-col relative z-0 min-h-[150px]">
                            {!paypalLoaded && (
                              <div className="absolute inset-0 bg-gray-50/80 z-10 flex flex-col items-center justify-center rounded">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ngo-black mb-2"></div>
                                <span className="text-[12px] font-medium text-gray-500">Loading secure payment portal...</span>
                              </div>
                            )}
                            <div ref={paypalContainerRef} className="w-full"></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 text-center mt-4">
                        Your payment is securely processed by PayPal. Your information is safe and encrypted.
                      </p>
                    </>
                  ) : (
                    <div className="pt-2 space-y-4">
                      <div className="p-5 bg-gray-50 rounded border border-gray-200 border-l-4 border-l-ngo-yellow">
                        <p className="text-[14px] font-bold text-ngo-black mb-4 uppercase tracking-wider">Bank Transfer Details</p>
                        <div className="space-y-4 text-[13px] text-ngo-black">
                          <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="font-semibold text-gray-500">Bank Name</span> 
                            <span className="font-bold">Global Trust Bank</span>
                          </div>
                          <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="font-semibold text-gray-500">Account Name</span> 
                            <span className="font-bold">NGO Hope Foundation</span>
                          </div>
                          <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                            <span className="font-semibold text-gray-500">Account No</span> 
                            <span className="font-bold font-mono text-[14px] tracking-wider">1234 5678 9012</span>
                          </div>
                          <div className="flex justify-between items-end pb-2">
                            <span className="font-semibold text-gray-500">SWIFT/BIC</span> 
                            <span className="font-bold font-mono">GTBUS33</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[12px] text-gray-500 text-center font-medium bg-gray-50 p-3 rounded border border-gray-200 mt-4">
                        💡 Please include "<span className="font-bold">DONATION - [Your Name]</span>" in the transfer reference.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center shadow-inner">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-[18px] font-bold text-green-800 mb-1 tracking-wide uppercase">Donation Successful</h3>
                  <p className="text-green-700 mb-6 font-medium text-[13px]">Thank you for your generous gift of ${lastDonation.amount.toFixed(2)}!</p>
                  
                  <div className="bg-white rounded p-4 border border-green-200 text-left space-y-2 mb-6 shadow-sm">
                    <div className="flex justify-between text-[13px] border-b border-green-50 pb-2"><span className="text-gray-500 font-semibold">Donor:</span> <span className="font-bold text-ngo-black">{lastDonation.donorName}</span></div>
                    <div className="flex justify-between text-[13px] border-b border-green-50 pb-2"><span className="text-gray-500 font-semibold">Email:</span> <span className="font-bold text-ngo-black">{lastDonation.donorEmail}</span></div>
                    <div className="flex justify-between text-[13px] border-b border-green-50 pb-2"><span className="text-gray-500 font-semibold">Transaction ID:</span> <span className="font-mono font-bold text-[11px] text-ngo-black">{lastDonation.paypalOrderId}</span></div>
                    <div className="flex justify-between text-[13px]"><span className="text-gray-500 font-semibold">Date:</span> <span className="font-bold text-ngo-black">{new Date(lastDonation.timestamp).toLocaleDateString()}</span></div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setShowReceipt(false);
                      setLastDonation(null);
                      setMessage('');
                    }}
                    className="bg-ngo-black hover:bg-black text-white font-bold py-3 px-8 rounded transition-colors w-full uppercase tracking-wider text-[12px]"
                  >
                    Make Another Donation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Donation
