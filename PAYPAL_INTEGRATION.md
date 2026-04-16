# PayPal Integration Guide

## Overview
This project has been integrated with PayPal's React SDK for secure online donations.

## Setup Completed ✅

### 1. **Configuration Files Created**

#### `/src/config/paypalConfig.js`
- Contains your PayPal Client ID
- Defines preset donation amounts
- Exports PayPal configuration options

#### `/src/utils/donationHelper.js`
- Helper functions for order creation and capture
- Amount validation and formatting utilities
- Server API communication functions

### 2. **Components Updated**

#### `/src/components/ImpactDonation.jsx`
- Integrated PayPal buttons
- Full payment flow with error handling
- Support for online/offline donations
- Custom and preset amounts
- Success/error message display
- Conditional PayPal button rendering

#### `/src/pages/Payment.jsx`
- Integrated PayPal buttons with full UI
- Payment method selection (PayPal, Credit Card, Visa, Mastercard)
- Donation frequency selection (One-time, Monthly, Quarterly, Yearly)
- Bank transfer details alternative
- Message feedback system

### 3. **Key Features Integrated**

✅ **Preset Amounts**: $10, $20, $30, $40, $50
✅ **Custom Amounts**: Users can enter any USD amount
✅ **Payment Methods**: 
   - PayPal
   - Credit Card
   - Visa
   - Mastercard
✅ **Donation Types**: Online & Offline
✅ **Frequencies**: One-time, Monthly, Quarterly, Yearly
✅ **Error Handling**: Comprehensive error messages
✅ **Success Confirmation**: Order tracking with ID display
✅ **Server Integration**: Ready for backend API implementation

## How It Works

### Payment Flow
1. User selects donation amount (preset or custom)
2. User chooses donation type (Online/Offline)
3. If online: User selects payment method
4. If PayPal: PayPal button appears
5. User clicks PayPal button and logs in
6. PayPal creates and captures order
7. Success message displays with Order ID
8. Data is sent to your backend at `/api/donations/success`

## Backend Integration Required

Your backend API needs to implement these endpoints:

### `/api/donations/create-order` (POST)
**Request:**
```json
{
  "amount": 25.50
}
```

**Response:**
```json
{
  "id": "order_id_from_paypal"
}
```

### `/api/donations/capture-order/:orderId` (POST)
**Response:**
```json
{
  "id": "order_id",
  "status": "COMPLETED",
  "payer": {
    "email_address": "donor@example.com"
  }
}
```

### `/api/donations/success` (POST)
**Request:**
```json
{
  "orderId": "order_id",
  "amount": 25.50,
  "payerEmail": "donor@example.com",
  "frequency": "onetime",
  "status": "COMPLETED"
}
```

## Environment Variables

Make sure your `.env` file doesn't need to be updated for now since the Client ID is in the config file. However, for production, consider moving it to environment variables:

```
VITE_PAYPAL_CLIENT_ID=Ac9yvCEllNpFx8ntPUco4sXW3B1EV0LY2ktYVijW3Go_I8cg0e4bwgc8Nsp1J2PY1izLD57gDyJK0fIf
```

Then update `paypalConfig.js`:
```javascript
export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID
```

## Testing

1. Start your dev server: `npm run dev`
2. Navigate to donation pages
3. Test with PayPal sandbox credentials (provided by PayPal)
4. Verify success messages and order tracking

## Troubleshooting

### PayPal Button Not Showing
- Check if `donationType === 'online'` and `paymentMethod === 'paypal'`
- Verify Client ID is correct
- Check browser console for errors

### Order Creation Failed
- Verify `/api/donations/create-order` endpoint exists
- Check amount validation (must be > 0)
- Monitor network requests in DevTools

### Order Capture Failed
- Verify `/api/donations/capture-order/:orderId` endpoint exists
- Check PayPal sandbox is configured correctly
- Monitor error messages in console

## Files Created/Modified

**Created:**
- `/src/config/paypalConfig.js` - PayPal configuration
- `/src/utils/donationHelper.js` - Donation helper functions

**Modified:**
- `/src/components/ImpactDonation.jsx` - Added PayPal integration
- `/src/pages/Payment.jsx` - Added PayPal integration

## Next Steps

1. ✅ Implement backend API endpoints
2. Implement database schema for donation tracking
3. Set up environment variables for production
4. Test with PayPal sandbox
5. Deploy to production with live PayPal account
6. Monitor and log all donations
7. Implement email confirmations for donors
8. Add donation receipts/invoices

## Support

For more information:
- [PayPal Developer](https://developer.paypal.com/)
- [React PayPal JS Library](https://github.com/paypal/react-paypal-js)
- [PayPal Integration Docs](https://developer.paypal.com/docs/checkout/integrate/)
