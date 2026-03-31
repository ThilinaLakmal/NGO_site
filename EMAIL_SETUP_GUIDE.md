# Email Setup Guide - Contact Form

The contact form is now fully functional with Email.js integration! Follow these steps to enable email sending:

## Step 1: Create EmailJS Account
1. Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email

## Step 2: Get Your Public Key
1. On the dashboard, click your profile icon (top right)
2. Select "Account" from the dropdown
3. Copy your **Public Key** from the dashboard

## Step 3: Create an Email Service
1. Go to "Email Services" in the left sidebar
2. Click "Add New Service"
3. Select your email provider (Gmail recommended)
4. Follow the setup instructions
5. Copy your **Service ID** (format: `service_xxxxx`)

## Step 4: Create an Email Template
1. Go to "Email Templates" in the left sidebar
2. Click "Create New Template"
3. Use the following template configuration:

### Template Variables:
- `{{from_name}}` - User's full name
- `{{from_email}}` - User's email address
- `{{message}}` - User's message
- `{{to_email}}` - Recipient email

### Example Template HTML:
```html
<h2>New Contact Form Submission</h2>
<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

5. In the "To Email" section, you can use: `{{to_email}}`
6. Copy your **Template ID** (format: `template_xxxxx`)

## Step 5: Update Configuration
Edit [src/utils/emailService.js](src/utils/emailService.js) and update these values:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
```

## Step 6: Test the Form
1. Go to the Contact page (`/contact`)
2. Fill in the form with test data
3. Click "Send Message"
4. You should see a success message
5. Check your email inbox for the message

## What Happens When User Sends Message:
✅ Message is captured from the form
✅ Form is validated (all fields required)
✅ Email is sent to the user's provided email address
✅ Email is also sent to: `hello@largerthari.com` (admin notification)
✅ Success message is displayed to the user
✅ Form is automatically cleared

## Troubleshooting

### Issue: "Failed to send message" error
- Check that your Public Key, Service ID, and Template ID are correct
- Verify your email service is activated in EmailJS
- Check browser console (F12) for detailed error messages

### Issue: Email not received
- Check spam/junk folder
- Verify the email template is correctly configured
- Test with EmailJS dashboard's "Test Send" feature

### Issue: Admin emails not sending
- The admin email is optional; user email sending always takes priority
- Update the admin email in line 57 of `emailService.js` if needed

## Security Notes
- The Public Key is meant to be exposed in frontend code (it's public)
- Do NOT expose your Private Key or API Keys
- EmailJS handles email validation and rate limiting

## Free Plan Limits
- Up to 200 emails/month on free tier
- Unlimited emails with paid plan
- See [EmailJS Pricing](https://www.emailjs.com/pricing) for details

## Need Help?
- EmailJS Docs: https://www.emailjs.com/docs/
- Contact support: support@emailjs.com
