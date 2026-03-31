import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { isValidAmount } from '../utils/donationHelper'

const PAYPAL_CLIENT_ID = 'Ac9yvCEllNpFx8ntPUco4sXW3B1EV0LY2ktYVijW3Go_I8cg0e4bwgc8Nsp1J2PY1izLD57gDyJK0fIf'

const Payment = () => {
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
    if (!paypalLoaded || donationType !== 'online' || !paypalContainerRef.current) return

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
  }, [paypalLoaded, donationType, paymentForm, frequency, cardTypeSelection, otherAmount, selectedAmount])

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount)
    setOtherAmount('')
  }

  const getFinalAmount = () => {
    return otherAmount ? parseFloat(otherAmount) : selectedAmount
  }



  const getDonationStats = () => {
    const donations = JSON.parse(localStorage.getItem('donations') || '[]')
    const total = donations.reduce((sum, d) => sum + d.amount, 0)
    const cardDonations = donations.filter(d => d.type === 'card' || d.type === 'paypal')
    return {
      totalDonations: donations.length,
      totalAmount: total,
      cardDonationsCount: cardDonations.length,
      cardDonationsTotal: cardDonations.reduce((sum, d) => sum + d.amount, 0),
    }
  }

  const exportToCSV = () => {
    const donations = JSON.parse(localStorage.getItem('donations') || '[]')
    if (donations.length === 0) {
      alert('No donations to export')
      return
    }

    // Create CSV header
    const headers = ['Date', 'Donor Name', 'Email', 'Amount', 'Type', 'Card Type', 'Frequency', 'Status']
    const csvContent = [
      headers.join(','),
      ...donations.map(d => [
        new Date(d.timestamp).toLocaleDateString(),
        d.donorName,
        d.donorEmail,
        d.amount.toFixed(2),
        d.type,
        d.cardType || 'N/A',
        d.frequency || 'N/A',
        d.status,
      ].join(','))
    ].join('\n')

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `donations_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target
    setPaymentForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

        <section className="py-16 px-6 md:px-24">
          <div className="max-w-[1400px] mx-auto">
            {/* Payment Process Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-0.5 bg-ngo-black"></div>
                <h2 className="text-[20px] font-bold tracking-wider text-ngo-black">
                  PAYMENT PROCESS
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* LEFT SIDE - DONATION AMOUNT & PAYMENT METHOD */}
              <div>
                {/* Select Donation Amount */}
                <div className="border-2 border-ngo-black rounded-lg p-8 mb-8">
                  <h3 className="text-[28px] font-bold text-ngo-black text-center mb-12">
                    Make Your Donation
                  </h3>

                  {/* Amount Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center mb-8">
                    {amounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountClick(amount)}
                        className={`px-6 py-3 font-bold text-[16px] transition-colors ${
                          selectedAmount === amount && !otherAmount
                            ? 'bg-ngo-black text-white'
                            : 'bg-white text-ngo-black border border-ngo-black hover:bg-ngo-black hover:text-white'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Other Amount Input */}
                  <div className="mb-8">
                    <label className="block text-[14px] font-semibold text-ngo-black/70 mb-2">
                      Other Amount (USD)
                    </label>
                    <input
                      type="number"
                      value={otherAmount}
                      onChange={(e) => {
                        setOtherAmount(e.target.value)
                        setSelectedAmount(null)
                      }}
                      placeholder="Enter custom amount"
                      className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                    />
                  </div>

                  {/* Donation Type Buttons */}
                  <div className="grid grid-cols-2 gap-4 mb-12">
                    <button
                      onClick={() => {
                        setDonationType('online')
                        setShowReceipt(false)
                        setLastDonation(null)
                        setMessage('')
                      }}
                      className={`py-3 font-bold text-[14px] transition-colors ${
                        donationType === 'online'
                          ? 'bg-ngo-black text-white'
                          : 'bg-white text-ngo-black border border-ngo-black hover:bg-ngo-black hover:text-white'
                      }`}
                    >
                      Donate Online
                    </button>
                    <button
                      onClick={() => setDonationType('offline')}
                      className={`py-3 font-bold text-[14px] transition-colors ${
                        donationType === 'offline'
                          ? 'bg-ngo-black text-white'
                          : 'bg-white text-ngo-black border border-ngo-black hover:bg-ngo-black hover:text-white'
                      }`}
                    >
                      Donate Offline
                    </button>
                  </div>

                  {/* Payment Method - PayPal Only */}
                  {donationType === 'online' && (
                    <div className="mb-8">
                      <h4 className="text-[14px] font-bold tracking-wider text-ngo-black mb-6">
                        SECURE PAYMENT VIA PAYPAL
                      </h4>
                      <p className="text-[13px] text-ngo-black/70 mb-6">
                        You'll be securely redirected to PayPal where you can pay with any card type or your PayPal account.
                      </p>

                      {/* Card Type Selection - Optional Preference */}
                      <div className="bg-ngo-black/2 p-6 rounded-lg border-2 border-ngo-black/20">
                        <h4 className="text-[14px] font-bold tracking-wider text-ngo-black mb-4">
                          PREFERRED CARD TYPE (OPTIONAL)
                        </h4>
                        <p className="text-[13px] text-ngo-black/60 mb-6">
                          Select your preferred payment method. This is optional - you can choose any payment method at PayPal checkout.
                        </p>
                        
                        <div className="grid grid-cols-3 gap-3">
                          {/* Credit Card */}
                          <button
                            onClick={() => setCardTypeSelection('credit')}
                            className={`p-4 border-2 rounded flex flex-col items-center justify-center transition-colors ${
                              cardTypeSelection === 'credit'
                                ? 'border-ngo-black bg-ngo-black/5'
                                : 'border-gray-300 hover:border-ngo-black'
                            }`}
                          >
                            <span className="text-[20px] mb-2">💳</span>
                            <span className="text-[12px] font-bold text-ngo-black text-center">CREDIT CARD</span>
                          </button>

                          {/* Visa */}
                          <button
                            onClick={() => setCardTypeSelection('visa')}
                            className={`p-4 border-2 rounded flex flex-col items-center justify-center transition-colors ${
                              cardTypeSelection === 'visa'
                                ? 'border-ngo-black bg-ngo-black/5'
                                : 'border-gray-300 hover:border-ngo-black'
                            }`}
                          >
                            <span className="text-[20px] font-bold text-blue-600 mb-2">VISA</span>
                            <span className="text-[11px] font-semibold text-ngo-black/60">Debit/Credit</span>
                          </button>

                          {/* Mastercard */}
                          <button
                            onClick={() => setCardTypeSelection('mastercard')}
                            className={`p-4 border-2 rounded flex flex-col items-center justify-center transition-colors ${
                              cardTypeSelection === 'mastercard'
                                ? 'border-ngo-black bg-ngo-black/5'
                                : 'border-gray-300 hover:border-ngo-black'
                            }`}
                          >
                            <div className="flex items-center gap-1 mb-2">
                              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                              <div className="w-4 h-4 bg-yellow-500 rounded-full -ml-2"></div>
                            </div>
                            <span className="text-[11px] font-semibold text-ngo-black/60">Debit/Credit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Frequency Dropdown */}
                  <div className="mb-8">
                    <select 
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full px-4 py-3 border border-ngo-black/30 rounded text-ngo-black/70 text-[14px] focus:outline-none focus:border-ngo-black"
                    >
                      <option value="onetime">One Time</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>

                  {/* Message Display */}
                  {message && (
                    <div className={`mb-6 p-4 rounded text-center text-sm font-semibold ${
                      message.includes('✓') || message.includes('Thank you')
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : message.includes('⚠️')
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                      {message}
                    </div>
                  )}

                  {/* PayPal Donation Form with Smart Buttons */}
                  {donationType === 'online' && !showReceipt && (
                    <div className="mb-4 border-2 border-ngo-black/20 rounded-lg p-6 bg-ngo-black/2">
                      <h4 className="text-[14px] font-bold text-ngo-black mb-6 tracking-wide">
                        SECURE PAYMENT WITH PAYPAL
                      </h4>

                      <div className="space-y-4">
                          {/* Email */}
                          <div>
                            <label className="block text-[13px] font-bold text-ngo-black mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={paymentForm.email}
                              onChange={handlePaymentFormChange}
                              placeholder="your@email.com"
                              required
                              className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                            />
                          </div>

                          {/* First Name & Last Name */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[13px] font-bold text-ngo-black mb-2">
                                First Name *
                              </label>
                              <input
                                type="text"
                                name="firstName"
                                value={paymentForm.firstName}
                                onChange={handlePaymentFormChange}
                                placeholder="John"
                                required
                                className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                              />
                            </div>
                            <div>
                              <label className="block text-[13px] font-bold text-ngo-black mb-2">
                                Last Name *
                              </label>
                              <input
                                type="text"
                                name="lastName"
                                value={paymentForm.lastName}
                                onChange={handlePaymentFormChange}
                                placeholder="Doe"
                                required
                                className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                              />
                            </div>
                          </div>

                          {/* Address */}
                          <div>
                            <label className="block text-[13px] font-bold text-ngo-black mb-2">
                              Address
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={paymentForm.address}
                              onChange={handlePaymentFormChange}
                              placeholder="123 Main Street"
                              className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                            />
                          </div>

                          {/* City, State, Zip */}
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[13px] font-bold text-ngo-black mb-2">
                                City
                              </label>
                              <input
                                type="text"
                                name="city"
                                value={paymentForm.city}
                                onChange={handlePaymentFormChange}
                                placeholder="New York"
                                className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                              />
                            </div>
                            <div>
                              <label className="block text-[13px] font-bold text-ngo-black mb-2">
                                State/Province
                              </label>
                              <input
                                type="text"
                                name="state"
                                value={paymentForm.state}
                                onChange={handlePaymentFormChange}
                                placeholder="NY"
                                className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                              />
                            </div>
                            <div>
                              <label className="block text-[13px] font-bold text-ngo-black mb-2">
                                Postal Code
                              </label>
                              <input
                                type="text"
                                name="zipCode"
                                value={paymentForm.zipCode}
                                onChange={handlePaymentFormChange}
                                placeholder="10001"
                                className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                              />
                            </div>
                          </div>

                          {/* Country */}
                          <div>
                            <label className="block text-[13px] font-bold text-ngo-black mb-2">
                              Country
                            </label>
                            <select
                              name="country"
                              value={paymentForm.country}
                              onChange={handlePaymentFormChange}
                              className="w-full px-4 py-2 border border-ngo-black/30 rounded text-ngo-black text-[14px] focus:outline-none focus:border-ngo-black"
                            >
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="GB">United Kingdom</option>
                              <option value="AU">Australia</option>
                              <option value="LK">Sri Lanka</option>
                              <option value="IN">India</option>
                              <option value="NG">Nigeria</option>
                              <option value="ZA">South Africa</option>
                              <option value="OTHER">Other</option>
                            </select>
                          </div>

                          {/* Donation Summary */}
                          <div className="bg-ngo-black/5 p-4 rounded border border-ngo-black/10 mb-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-[13px] font-semibold text-ngo-black">
                                Donation Amount:
                              </span>
                              <span className="text-[13px] font-bold text-ngo-black">
                                ${getFinalAmount().toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[13px] font-semibold text-ngo-black">
                                Frequency:
                              </span>
                              <span className="text-[13px] font-bold text-ngo-black capitalize">
                                {frequency}
                              </span>
                            </div>
                          </div>

                          {/* PayPal Buttons Container */}
                          <div 
                            ref={paypalContainerRef}
                            className="my-4"
                            style={{ minHeight: '100px' }}
                          />

                        </div>

                      <p className="text-[11px] text-ngo-black/60 text-center mt-4">
                        Your payment is securely processed by PayPal. Your donation information is safe and encrypted.
                      </p>
                    </div>
                  )}



                  {/* Donation Receipt */}
                  {showReceipt && lastDonation && (
                    <div className="mb-4 border-2 border-green-400 rounded-lg p-6 bg-green-50">
                      <div className="text-center mb-6">
                        <h4 className="text-[18px] font-bold text-green-700 mb-2">✓ DONATION RECEIPT</h4>
                        <p className="text-[12px] text-green-600">Transaction Successful</p>
                      </div>

                      <div className="bg-white rounded p-4 border border-green-200 mb-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-[13px] font-semibold text-ngo-black">Donor Name:</span>
                          <span className="text-[13px] text-ngo-black">{lastDonation.donorName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[13px] font-semibold text-ngo-black">Email:</span>
                          <span className="text-[13px] text-ngo-black">{lastDonation.donorEmail}</span>
                        </div>
                        <div className="border-t border-green-200 my-2"></div>
                        <div className="flex justify-between">
                          <span className="text-[13px] font-semibold text-ngo-black">Donation Amount:</span>
                          <span className="text-[14px] font-bold text-green-700">${lastDonation.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[13px] font-semibold text-ngo-black">Payment Method:</span>
                          <span className="text-[13px] text-ngo-black">💳 PayPal</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[13px] font-semibold text-ngo-black">Frequency:</span>
                          <span className="text-[13px] text-ngo-black capitalize">{lastDonation.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[13px] font-semibold text-ngo-black">Status:</span>
                          <span className="text-[13px] font-bold text-green-600">{lastDonation.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[13px] font-semibold text-ngo-black">Date & Time:</span>
                          <span className="text-[13px] text-ngo-black">{new Date(lastDonation.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="border-t border-green-200 my-2"></div>
                        <div className="flex justify-between">
                          <span className="text-[13px] font-semibold text-ngo-black">Receipt ID:</span>
                          <span className="text-[12px] font-mono text-green-700">{lastDonation.paypalOrderId || lastDonation.id}</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setShowReceipt(false)
                            setLastDonation(null)
                            setMessage('')
                            setDonationType('online')
                          }}
                          className="flex-1 bg-ngo-yellow hover:bg-ngo-yellow/80 text-ngo-black font-bold py-2 px-4 rounded text-[13px] transition-colors"
                        >
                          Make Another Donation
                        </button>
                        <button
                          onClick={() => {
                            const donations = JSON.parse(localStorage.getItem('donations') || '[]')
                            const headers = ['Date', 'Donor Name', 'Email', 'Amount', 'Type', 'Card Type', 'Frequency', 'Status']
                            const csvContent = [
                              headers.join(','),
                              ...donations.map(d => [
                                new Date(d.timestamp).toLocaleDateString(),
                                d.donorName,
                                d.donorEmail,
                                d.amount.toFixed(2),
                                d.type,
                                d.preferredCardType || 'N/A',
                                d.frequency || 'N/A',
                                d.status,
                              ].join(','))
                            ].join('\n')
                            const blob = new Blob([csvContent], { type: 'text/csv' })
                            const url = window.URL.createObjectURL(blob)
                            const a = document.createElement('a')
                            a.href = url
                            a.download = `donations_${new Date().toISOString().split('T')[0]}.csv`
                            document.body.appendChild(a)
                            a.click()
                            window.URL.revokeObjectURL(url)
                            document.body.removeChild(a)
                          }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[13px] transition-colors"
                        >
                          Download Receipt
                        </button>
                      </div>

                      <p className="text-[11px] text-green-600 text-center mt-4">
                        Thank you for your generous donation! A confirmation has been recorded.
                      </p>
                    </div>
                  )}

                  {/* Donation Statistics */}
                  {JSON.parse(localStorage.getItem('donations') || '[]').length > 0 && (
                    <div className="mb-4 border-2 border-ngo-black/20 rounded-lg p-6 bg-ngo-black/2">
                      <h4 className="text-[14px] font-bold text-ngo-black mb-4 tracking-wide">
                        📊 DONATION STATISTICS
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded border border-ngo-black/10">
                          <p className="text-[11px] text-ngo-black/60 uppercase font-bold mb-2">Total Donors</p>
                          <p className="text-[24px] font-bold text-ngo-black">{getDonationStats().totalDonations}</p>
                        </div>
                        <div className="bg-white p-4 rounded border border-ngo-black/10">
                          <p className="text-[11px] text-ngo-black/60 uppercase font-bold mb-2">Total Raised</p>
                          <p className="text-[24px] font-bold text-green-700">${getDonationStats().totalAmount.toFixed(2)}</p>
                        </div>
                      </div>

                      <button
                        onClick={exportToCSV}
                        className="w-full bg-ngo-yellow hover:bg-ngo-yellow/80 text-ngo-black font-bold py-2 px-4 rounded text-[13px] transition-colors"
                      >
                        📥 Export Donations to CSV
                      </button>
                    </div>
                  )}

                  {/* Donate Now Button - Offline Only */}
                  {donationType === 'offline' ? (
                    <div className="border-2 border-ngo-black/20 rounded-lg p-6 bg-ngo-black/2">
                      <h4 className="text-[14px] font-bold text-ngo-black mb-4 tracking-wide">
                        OFFLINE DONATION
                      </h4>
                      <p className="text-[13px] text-ngo-black/70 mb-6">
                        Please use the bank transfer details on the right to complete your offline donation. Thank you for your support!
                      </p>
                      <button className="w-full bg-ngo-yellow text-ngo-black font-bold text-[16px] py-3 rounded hover:opacity-90 transition-opacity">
                        View Bank Details
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* RIGHT SIDE - OTHER DONATION METHODS */}
              <div>
                <h3 className="text-[20px] font-bold text-ngo-black mb-8">
                  Other Donation Methods
                </h3>

                {/* Bank Transfer Box */}
                <div className="border-2 border-ngo-black rounded-lg p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-[16px] font-bold tracking-wider text-ngo-black">
                      DIRECTLY BANK TRANSFER
                    </h4>
                    <button className="text-ngo-black hover:opacity-70 transition-opacity">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Account Number */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[14px] font-semibold text-ngo-black mb-1">
                          Account Number
                        </p>
                        <p className="text-[14px] text-ngo-black/70 font-medium">
                          2223330000456987
                        </p>
                      </div>
                      <button className="text-ngo-black hover:opacity-70 transition-opacity">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      </button>
                    </div>

                    {/* Beneficiary Name & Organization */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[14px] font-semibold text-ngo-black mb-1">
                          Beneficiary Name
                        </p>
                        <p className="text-[14px] text-ngo-black/70 font-medium">
                          Organization
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-semibold text-ngo-black mb-1">
                          Organization
                        </p>
                        <p className="text-[14px] text-ngo-black/70 font-medium">
                          NGO Name
                        </p>
                      </div>
                    </div>

                    {/* IFSC Code */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[14px] font-semibold text-ngo-black mb-1">
                          IFSC Code
                        </p>
                        <p className="text-[14px] text-ngo-black/70 font-medium">
                          WRDSBI0BNKPIS
                        </p>
                      </div>
                      <button className="text-ngo-black hover:opacity-70 transition-opacity">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.5 13.5L20 21c0 .55-.45 1-1 1s-1-.45-1-1l-.5-7.5h-4v3h-2v-6h7v2.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }
  
  export default Payment
