import React, { useState, useEffect, useRef } from 'react'
import { PAYPAL_CLIENT_ID } from '../config/paypalConfig'
import { isValidAmount } from '../utils/donationHelper'

const ImpactDonation = () => {
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

  useEffect(() => {
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

  const getFinalAmount = () => {
    return otherAmount ? parseFloat(otherAmount) : selectedAmount
  }

  // Initialize PayPal Buttons when SDK is loaded and donation type is online
  useEffect(() => {
    if (!paypalLoaded || donationType !== 'online' || !paypalContainerRef.current || showReceipt) return

    // Clear previous buttons
    if (paypalContainerRef.current) {
      paypalContainerRef.current.innerHTML = ''
    }

    const amount = getFinalAmount()
    const isFormValid = paymentForm.email && paymentForm.firstName && paymentForm.lastName && amount > 0

    if (!isFormValid) {
      // Don't render buttons until form is complete to prevent invalid orders
      paypalContainerRef.current.innerHTML = '<div class="text-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded text-gray-500 text-[12px] font-medium">Please select an amount and fill in your details to process payment.</div>'
      return
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
            donorEmail: paymentForm.email,
            donorName: `${paymentForm.firstName} ${paymentForm.lastName}`,
            timestamp: new Date().toISOString(),
            status: 'completed',
            paypalOrderId: order.id,
            paypalStatus: order.status,
          }

          // Update donation status in localStorage
          const donations = JSON.parse(localStorage.getItem('donations') || '[]')
          donations.push(donationRecord)
          localStorage.setItem('donations', JSON.stringify(donations))

          // Show success message and receipt
          setLastDonation(donationRecord)
          setShowReceipt(true)
          setMessage(`✓ Thank you for your generous donation of $${amount.toFixed(2)}!`)
          setIsProcessing(false)

          // Reset form after success
          setTimeout(() => {
            setPaymentForm({
              email: '', firstName: '', lastName: '', address: '', city: '', state: '', zipCode: '', country: 'US',
            })
            setOtherAmount('')
            setSelectedAmount(10)
            setFrequency('onetime')
          }, 2000)
        } catch (error) {
          setMessage(`❌ Payment capture failed: ${error.message}. Please try again.`)
          console.error('PayPal Capture Error:', error)
          setIsProcessing(false)
        }
      },

      onError: (err) => {
        setMessage(`❌ Payment error: ${err.message || 'An unexpected error occurred.'}`)
        console.error('PayPal Error:', err)
        setIsProcessing(false)
      },
    }).render(paypalContainerRef.current)
  }, [paypalLoaded, donationType, paymentForm, frequency, cardTypeSelection, otherAmount, selectedAmount, showReceipt])

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount)
    setOtherAmount('')
  }

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target
    setPaymentForm(prev => ({ ...prev, [name]: value }))
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
                    <button 
                      onClick={() => setMessage('Thank you! Details matched.')}
                      className="w-full bg-black text-white hover:bg-black/90 py-4 font-extrabold uppercase tracking-widest text-[12px] transition-colors mt-auto"
                    >
                      PROCEED
                    </button>
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
      </section>
  )
}

export default ImpactDonation
