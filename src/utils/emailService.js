import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
// TO GET YOUR PUBLIC KEY:
// 1. Go to https://dashboard.emailjs.com/
// 2. Sign up or login (free tier available)
// 3. Copy your Public Key from the Dashboard

const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY)

/**
 * Send contact form email
 * @param {object} formData - Form data containing firstName, lastName, email, message
 * @returns {Promise} EmailJS response
 */
export const sendContactEmail = async (formData) => {
  try {
    const { firstName, lastName, email, message } = formData

    // Template parameters that will be used in your EmailJS template
    const templateParams = {
      from_name: `${firstName} ${lastName}`,
      from_email: email,
      message: message,
      to_email: email, // Send copy to user's email
    }

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    return response
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

/**
 * Send confirmation email to NGO (admin email)
 * @param {object} formData - Form data
 * @returns {Promise} EmailJS response
 */
export const sendAdminNotification = async (formData) => {
  try {
    const { firstName, lastName, email, message } = formData

    const templateParams = {
      from_name: `${firstName} ${lastName}`,
      from_email: email,
      message: message,
      to_email: 'hello@largerthari.com', // Change to your NGO email
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    return response
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    throw error
  }
}
