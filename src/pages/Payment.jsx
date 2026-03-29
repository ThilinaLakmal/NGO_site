import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PAYPAL_CLIENT_ID } from '../config/paypalConfig'

const Payment = () => {
  const [selectedAmount, setSelectedAmount] = useState(10)
  const [otherAmount, setOtherAmount] = useState('')
  const [donationType, setDonationType] = useState('online')
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [frequency, setFrequency] = useState('onetime')

  const amounts = [10, 20, 30, 40, 50]

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount)
    setOtherAmount('')
  }

  const getFinalAmount = () => {
    return otherAmount ? parseFloat(otherAmount) : selectedAmount
  }

  const handleCreateOrder = async (data, actions) => {
    try {
      setIsProcessing(true)
      const amount = getFinalAmount()

      if (!amount || amount <= 0) {
        setMessage('Please select a valid donation amount')
        return
      }

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amount.toString(),
            },
            description: `NGO Donation - ${frequency === 'monthly' ? 'Monthly' : 'One-Time'} ${amount > 0 ? `$${amount}` : ''}`,
          },
        ],
      })
    } catch (error) {
      setMessage('Error processing donation. Please try again.')
      console.error('Error creating PayPal order:', error)
    }
  }

  const handleApproveOrder = async (data, actions) => {
    try {
      setIsProcessing(true)
      const amount = getFinalAmount()

      const order = await actions.order.capture()

      setMessage(`Thank you! Your donation of $${amount} has been received. Order ID: ${order.id}`)
      setSelectedAmount(10)
      setOtherAmount('')

      console.log('Donation successful:', order)

      // Log to your backend
      await fetch('/api/donations/success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          amount: amount,
          payerEmail: order.payer?.email_address,
          frequency: frequency,
          status: order.status,
        }),
      }).catch(err => console.error('Failed to log donation:', err))

      return order
    } catch (error) {
      setMessage('Error processing your donation. Please try again.')
      console.error('Error capturing PayPal order:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDonationError = (error) => {
    setMessage('An error occurred during payment. Please try again.')
    console.error('PayPal error:', error)
    setIsProcessing(false)
  }

  return (
    <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID }}>
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
                  <h3 className="text-[28px] font-bold text-ngo-black text-center mb-8">
                    Select Donation Amount
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
                      onClick={() => setDonationType('online')}
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

                  {/* Payment Method Section */}
                  {donationType === 'online' && (
                    <div className="mb-8">
                      <h4 className="text-[14px] font-bold tracking-wider text-ngo-black mb-6">
                        PAYMENT METHOD
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* PayPal */}
                        <button
                          onClick={() => setPaymentMethod('paypal')}
                          className={`p-4 border-2 rounded flex items-center justify-center transition-colors ${
                            paymentMethod === 'paypal'
                              ? 'border-ngo-black bg-ngo-black/5'
                              : 'border-gray-300 hover:border-ngo-black'
                          }`}
                        >
                          <span className="text-[18px] font-bold text-blue-600">PayPal</span>
                        </button>

                        {/* Credit Card */}
                        <button
                          onClick={() => setPaymentMethod('credit')}
                          className={`p-4 border-2 rounded flex items-center justify-center transition-colors ${
                            paymentMethod === 'credit'
                              ? 'border-ngo-black bg-ngo-black/5'
                              : 'border-gray-300 hover:border-ngo-black'
                          }`}
                        >
                          <span className="text-[12px] font-bold text-ngo-black">CREDIT CARD</span>
                        </button>

                        {/* Visa */}
                        <button
                          onClick={() => setPaymentMethod('visa')}
                          className={`p-4 border-2 rounded flex items-center justify-center transition-colors ${
                            paymentMethod === 'visa'
                              ? 'border-ngo-black bg-ngo-black/5'
                              : 'border-gray-300 hover:border-ngo-black'
                          }`}
                        >
                          <span className="text-[20px] font-bold text-blue-600">VISA</span>
                        </button>

                        {/* Mastercard */}
                        <button
                          onClick={() => setPaymentMethod('mastercard')}
                          className={`p-4 border-2 rounded flex items-center justify-center transition-colors ${
                            paymentMethod === 'mastercard'
                              ? 'border-ngo-black bg-ngo-black/5'
                              : 'border-gray-300 hover:border-ngo-black'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                            <div className="w-5 h-5 bg-yellow-500 rounded-full -ml-2"></div>
                          </div>
                        </button>
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
                    <div className={`mb-4 p-4 rounded text-center text-sm font-semibold ${
                      message.includes('Thank you') 
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                      {message}
                    </div>
                  )}

                  {/* PayPal Button */}
                  {donationType === 'online' && paymentMethod === 'paypal' && (
                    <div className="mb-4">
                      <PayPalButtons
                        createOrder={handleCreateOrder}
                        onApprove={handleApproveOrder}
                        onError={handleDonationError}
                        style={{
                          layout: 'vertical',
                          color: 'blue',
                          height: 45,
                        }}
                        disabled={isProcessing}
                      />
                    </div>
                  )}

                  {/* Fallback Donate Button */}
                  {donationType === 'offline' || (donationType === 'online' && paymentMethod !== 'paypal') ? (
                    <button className="w-full bg-ngo-yellow text-ngo-black font-bold text-[16px] py-3 rounded hover:opacity-90 transition-opacity">
                      Donate Now
                    </button>
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
    </PayPalScriptProvider>
  )
}

export default Payment
