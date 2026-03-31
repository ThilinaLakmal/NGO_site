// PayPal Donate API Helper Functions

/**
 * Create PayPal Donate transaction
 * Redirects to PayPal donation form
 * @param {number} amount - Amount in USD
 * @param {string} businessId - PayPal Business ID or Email
 * @returns {string} PayPal Donate redirect URL
 */
export const createDonation = (amount, businessId = 'hello@largerthari.com') => {
  // PayPal Donate API URL - Frontend only (no backend needed)
  // Redirects user to PayPal's secure donation page
  const params = new URLSearchParams({
    business: businessId,
    item_name: 'NGO Donation',
    amount: Math.round(amount * 100) / 100, // Ensure 2 decimal places
    currency_code: 'USD',
    no_shipping: '2', // No shipping required
    return: window.location.href, // Return to current page after donation
    cancel_return: window.location.href, // Return if cancelled
    no_note: '1', // Don't ask for note
    rm: '2', // Return method: GET redirect
  })
  
  // Use production PayPal URL
  // For testing, you can temporarily use: https://www.sandbox.paypal.com/donate
  return `https://www.paypal.com/donate?${params.toString()}`
}

/**
 * Open PayPal Donate page in new window
 * @param {number} amount - Amount in USD
 * @param {string} businessId - PayPal Business ID or Email
 */
export const openDonateWindow = (amount, businessId = 'hello@largerthari.com') => {
  const donateUrl = createDonation(amount, businessId)
  window.open(donateUrl, '_blank', 'width=800,height=600')
}

/**
 * Create donations via PayPal Orders API (hybrid approach)
 * Uses Orders API but with donation-specific parameters
 * @param {object} actions - PayPal actions object
 * @param {number} amount - Donation amount
 * @param {string} frequency - Donation frequency (onetime, monthly, etc)
 * @returns {Promise} Order created
 */
export const createDonationOrder = async (actions, amount, frequency = 'onetime') => {
  return actions.order.create({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          value: amount.toString(),
          currency_code: 'USD',
        },
        description: `NGO Donation - ${frequency === 'monthly' ? 'Monthly' : 'One-Time'} ${amount > 0 ? `$${amount}` : ''}`,
        custom_id: `donation_${frequency}_${Date.now()}`,
      },
    ],
    application_context: {
      brand_name: 'NGO Organization',
      landing_page: 'BILLING',
      user_action: 'PAY_NOW',
      return_url: window.location.href,
      cancel_url: window.location.href,
    },
  })
}

/**
 * Capture PayPal donation order
 * @param {object} actions - PayPal actions object
 * @returns {Promise<object>} Order details
 */
export const captureDonation = async (actions, amount, frequency) => {
  const order = await actions.order.capture()
  
  // Log donation to your backend
  try {
    await fetch('/api/donations/success', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: order.id,
        amount: amount,
        payerEmail: order.payer?.email_address,
        payerName: `${order.payer?.name?.given_name} ${order.payer?.name?.surname}`,
        frequency: frequency,
        status: order.status,
        timestamp: new Date().toISOString(),
      }),
    }).catch(err => console.error('Failed to log donation:', err))
  } catch (error) {
    console.warn('Could not log donation to backend:', error)
  }
  
  return order
}

/**
 * Format amount to USD currency
 * @param {number} amount - Amount in USD
 * @returns {string} Formatted amount
 */
export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Validate donation amount
 * @param {number} amount - Amount to validate
 * @returns {boolean} True if valid
 */
export const isValidAmount = (amount) => {
  return amount && !isNaN(amount) && amount > 0 && amount <= 999999.99
}
