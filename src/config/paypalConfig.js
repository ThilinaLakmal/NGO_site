// PayPal Configuration
export const PAYPAL_CLIENT_ID = 'Ac9yvCEllNpFx8ntPUco4sXW3B1EV0LY2ktYVijW3Go_I8cg0e4bwgc8Nsp1J2PY1izLD57gDyJK0fIf'

export const paypalOptions = {
  clientId: PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons,messages',
}

// Donation amounts in cents (for PayPal)
export const PRESET_AMOUNTS = [
  { label: '$10', value: 10 },
  { label: '$20', value: 20 },
  { label: '$30', value: 30 },
  { label: '$40', value: 40 },
  { label: '$50', value: 50 },
]
