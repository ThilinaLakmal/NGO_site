/**
 * Credit Card Validation Utilities
 */

// Luhn algorithm for card number validation
export const validateCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

// Validate expiry date
export const validateExpiryDate = (month, year) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const expiryYear = parseInt(year, 10)
  const expiryMonth = parseInt(month, 10)

  if (expiryMonth < 1 || expiryMonth > 12) return false
  if (expiryYear < currentYear) return false
  if (expiryYear === currentYear && expiryMonth < currentMonth) return false

  return true
}

// Validate CVV
export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv)
}

// Format card number with spaces
export const formatCardNumber = (value) => {
  return value
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
}

// Detect card type
export const detectCardType = (cardNumber) => {
  const number = cardNumber.replace(/\D/g, '')

  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(number)) return 'visa'
  if (/^5[1-5][0-9]{14}$/.test(number)) return 'mastercard'
  if (/^3[47][0-9]{13}$/.test(number)) return 'amex'
  if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(number)) return 'discover'

  return null
}
