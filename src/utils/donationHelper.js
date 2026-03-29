// Donation Helper Functions

/**
 * Create PayPal order
 * @param {number} amount - Amount in USD
 * @returns {Promise<string>} Order ID
 */
export const createOrder = async (amount) => {
  try {
    // In production, this should call your backend API
    // which creates an order via PayPal's server-side API
    const response = await fetch('/api/donations/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100) / 100, // Ensure 2 decimal places
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create order')
    }

    const data = await response.json()
    return data.id
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

/**
 * Capture PayPal order
 * @param {string} orderId - PayPal Order ID
 * @returns {Promise<object>} Order details
 */
export const captureOrder = async (orderId) => {
  try {
    const response = await fetch(`/api/donations/capture-order/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to capture order')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error capturing order:', error)
    throw error
  }
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
