# PayPal Donate API Setup Guide

## Overview
Your Payment page has been updated to use **PayPal Donate API** - the official API designed specifically for nonprofits.

## Key Differences from Orders API

| Feature | Orders API | Donate API |
|---------|-----------|-----------|
| **Purpose** | General e-commerce payments | Nonprofit donations |
| **Setup Complexity** | Medium | Simple |
| **Button Type** | Custom buttons | Donation buttons |
| **Best For** | Products/Services | Donations (NGOs/Charities) |
| **Recurring Donations** | Requires subscriptions | Built-in support |

## Current Implementation Status

✅ **Installed**: PayPal React SDK (`@paypal/react-paypal-js`)
✅ **Configured**: Client ID in `src/config/paypalConfig.js`
✅ **Updated**: Payment handlers for Donate API
✅ **Ready**: Form with amount selection, frequency, and payment methods

## Setup Instructions

### Step 1: Prepare Your PayPal Account
1. Go to [PayPal Business](https://www.paypal.com/business)
2. Sign in or create a business account
3. Verify your email and business information

### Step 2: Create a Donate Button (Optional)
For the simplest setup:

1. Go to **Fundraising Tools** → **Donation Buttons**
2. Click **Create Donation Button**
3. Configure:
   - **Donation Amount**: Select "Donor Chooses" for custom amounts
   - **Recurring**: Enable if you want monthly donations
   - **Currency**: USD
4. Copy your **Hosted Button ID**

### Step 3: Update Configuration
Edit `src/config/paypalConfig.js`:

```javascript
// Add your PayPal Business ID
export const PAYPAL_BUSINESS_ID = 'your_business_email@paypal.com'

// If using hosted button (optional)
export const PAYPAL_DONATE_BUTTON_ID = 'your_button_id_here'
```

### Step 4: Test Your Integration
1. Navigate to `/donation` or `/payment` page
2. Select a donation amount
3. Click "Donate Online"
4. Select PayPal as payment method
5. Click PayPal button
6. Complete payment in PayPal popup

## Features Supported

✅ **One-Time Donations**
- Preset amounts: $10, $20, $30, $40, $50
- Custom amounts: User-defined
- Instant confirmation with transaction ID

✅ **Recurring Donations**
- Monthly subscriptions
- Quarterly subscriptions
- Yearly subscriptions
- Easy cancellation through PayPal

✅ **Payment Methods**
- PayPal wallet
- Debit/Credit cards
- Bank accounts

✅ **Success Tracking**
- Order ID tracking
- Payer information capture
- Frequency tracking
- Amount logging

## How It Works

### User Flow:
1. User selects donation amount
2. Chooses payment method (PayPal, etc.)
3. Selects frequency (One-time, Monthly, etc.)
4. Clicks "PayPal" button
5. PayPal popup opens
6. User completes payment
7. Returns to your site with confirmation

## Backend Integration (Optional)

The system logs donations to `/api/donations/success` with:
```json
{
  "orderId": "PayPal-Order-ID",
  "amount": 25.00,
  "payerEmail": "donor@example.com",
  "payerName": "John Doe",
  "frequency": "onetime",
  "status": "COMPLETED",
  "timestamp": "2026-03-30T12:00:00Z"
}
```

Create this endpoint on your backend to:
- Store donation records in database
- Send thank you emails
- Update donor records
- Generate receipts

Example backend endpoint:
```javascript
POST /api/donations/success
Content-Type: application/json

{
  "orderId": "3LS58843SC123456H",
  "amount": 50.00,
  "payerEmail": "donor@example.com",
  "payerName": "John Doe",
  "frequency": "monthly",
  "status": "COMPLETED",
  "timestamp": "2026-03-30T12:00:00Z"
}
```

## Testing

### Sandbox Testing
Use PayPal Sandbox accounts for testing:

**Buyer Account:**
- Email: `sb-xxxxx@personal.example.com`
- Password: From your PayPal Developer Dashboard

**Seller Account:**
- Email: Your sandbox seller account
- Use for business payments

See [TESTING_PAYPAL.md](TESTING_PAYPAL.md) for detailed testing instructions.

## Troubleshooting

### Issue: "Failed to create order"
- Check that `PAYPAL_CLIENT_ID` is correct in `paypalConfig.js`
- Verify PayPal account is active
- Check browser console for detailed errors

### Issue: PayPal popup doesn't open
- Check browser popup blocker settings
- Verify HTTPS is working (required for production)
- Check that amount is > $0.01

### Issue: Donation succeeds but not logged
- Backend endpoint `/api/donations/success` may not exist
- Create the endpoint on your server
- Check CORS headers if using separate domain

### Issue: Recurring donations not working
- Ensure PayPal account supports subscriptions
- Check that frequency is correctly set
- Some countries don't support subscriptions

## Security Notes

✅ **Safe to Use:**
- Client ID is public (meant to be exposed)
- All sensitive operations are server-side
- PayPal handles PCI compliance

⚠️ **Important:**
- Never expose your PayPal signature or secret keys
- Always verify payments on backend before processing
- Use HTTPS in production

## Resources

- **PayPal Donate API Docs**: https://developer.paypal.com/docs/donate/
- **PayPal Dashboard**: https://www.paypal.com/businessmanage/account/
- **Testing Guide**: See `TESTING_PAYPAL.md`
- **Integration Details**: `src/utils/donationHelper.js`

## Support

For issues:
1. Check PayPal Developer Dashboard for error messages
2. Review browser console (F12)
3. Test in PayPal Sandbox first
4. Contact PayPal support: https://www.paypal.com/en/webapps/mpp/business-support

---

**Version**: 2.0 (Donate API)
**Last Updated**: March 30, 2026
