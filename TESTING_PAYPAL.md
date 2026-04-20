# PayPal Integration Testing & Verification Guide

## Pre-Testing Checklist

### 1. **Verify Files Are in Place**
Check these files exist in your project:
```
src/
  ├── config/
  │   └── paypalConfig.js ✅
  ├── utils/
  │   └── donationHelper.js ✅
  ├── components/
  │   └── ImpactDonation.jsx ✅
  └── pages/
      └── Payment.jsx ✅
```

**Command to verify:**
```powershell
Test-Path "c:\Users\User\NGO-website\src\config\paypalConfig.js"
Test-Path "c:\Users\User\NGO-website\src\pages\Payment.jsx"
Test-Path "c:\Users\User\NGO-website\src\components\ImpactDonation.jsx"
```

---

## Step 1: Start Development Server

```powershell
cd c:\Users\User\NGO-website
npm run dev
```

**Expected Output:**
```
VITE v8.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

**✅ Verify:**
- Server starts without errors
- No "Cannot find module" errors appear
- No PayPal import errors

---

## Step 2: Test Frontend Components

### **2.1 Check ImpactDonation Component**

1. Navigate to homepage or any page with the ImpactDonation component
2. Open **Browser DevTools** (F12)
3. Go to **Console** tab
4. Look for any errors (no red X marks)

**Expected Behavior:**
- ✅ Component renders without errors
- ✅ "Select Donation Amount" section visible
- ✅ Amount buttons ($10, $20, $30, $40, $50) clickable
- ✅ Custom amount input field works
- ✅ "Donate Online" and "Donate Offline" buttons toggle state
- ✅ Payment method selection appears for online donations
- ✅ No console errors

### **2.2 Check Payment Page**

1. Navigate to `/payment` route
2. Check all elements render correctly
3. Open **DevTools Console**

**Expected Behavior:**
- ✅ Page loads without errors
- ✅ All donation amounts display correctly
- ✅ "Donate Online" toggle shows payment methods
- ✅ "Donate Offline" hides payment methods
- ✅ Payment method buttons (PayPal, Credit Card, Visa, Mastercard) are clickable
- ✅ Frequency dropdown works (One Time, Monthly, Quarterly, Yearly)
- ✅ Bank transfer details visible on right sidebar

---

## Step 3: Test PayPal Button Rendering

### **Critical Check: PayPal Button Visibility**

In the **ImpactDonation** component:

1. Click "Donate Online" button
2. Select "PayPal" as payment method
3. **Verify:** A blue PayPal button appears

**If PayPal Button Doesn't Appear:**

Open **DevTools Console** and check for:
```javascript
// Check 1: Client ID is loaded
console.log('Client ID:', window.location.origin)

// Check 2: PayPal script is loaded
document.scripts.forEach(s => {
  if (s.src.includes('paypal')) console.log('PayPal script loaded:', s.src)
})
```

**Common Issues:**
| Issue | Solution |
|-------|----------|
| "Cannot read properties of undefined" | Check `PAYPAL_CLIENT_ID` in config file |
| PayPal script 404 | Client ID might be invalid |
| Button says "Loading" forever | Network issue or Client ID wrong |

---

## Step 4: Test Amount Selection

### **Test Case 1: Preset Amounts**
```javascript
// In ImpactDonation.jsx
1. Click each amount button: $10, $20, $30, $40, $50
✅ Button should turn black/white (selected state)
✅ Clear custom amount input when clicking preset
```

### **Test Case 2: Custom Amount**
```javascript
// In ImpactDonation.jsx
1. Type 75 in "Other Amount (USD)"
✅ Custom amount field updates
✅ Preset amount selection should clear
✅ PayPal button should update to handle $75
```

### **Test Case 3: Invalid Amounts**
```javascript
1. Try amount = 0 → Should show error message
2. Try amount = -10 → Should show error message
3. Try amount = 999999.99 → Should work
4. Try amount = 1000000 → May show validation error
```

---

## Step 5: Test PayPal Sandbox (Before Real Transactions)

### **Setup PayPal Sandbox Account**

1. **Go to:** https://developer.paypal.com/dashboard/
2. **Sign in** with your PayPal Business account
3. **Navigate to:** Sandbox → Accounts
4. **You'll see test accounts:**
   - **Business Account** (receiver of donations)
   - **Buyer Account** (test donor)

### **Get Sandbox Credentials**

1. Click on **Buyer Account**
2. Copy email: `sb-xxxxx@personal.example.com`
3. Get password: Usually shown in account settings
4. **Note:** Your Client ID may already be configured for sandbox by default

---

## Step 6: Test Complete Payment Flow

### **Important: Backend Not Required for UI Testing**

The PayPal button will still appear and work in the frontend even without backend endpoints. You'll see errors only when trying to actually process the payment.

### **Testing Workflow:**

1. **Start your dev server:**
   ```powershell
   npm run dev
   ```

2. **Navigate to ImpactDonation or Payment page**

3. **Select amount:** Click $20

4. **Toggle Online:** Click "Donate Online"

5. **Select PayPal:** Click PayPal button

6. **Click PayPal Button** (Blue button that appears)
   - ✅ Should open PayPal login popup or redirect
   - ✅ Should NOT show error immediately

7. **In PayPal Popup:**
   - Use sandbox buyer account credentials
   - Email: `sb-xxxxx@personal.example.com`
   - Password: (from your account)

8. **Expected Outcomes:**

   **If backend endpoints exist:**
   - ✅ Order created successfully
   - ✅ Success message displays: "Thank you! Donation of $20 received..."
   - ✅ Order ID shown in message

   **If backend endpoints don't exist:**
   - ⚠️ PayPal popup closes
   - ❌ Error message: "Error processing your donation"
   - ✅ Check DevTools Network tab for failed API call

---

## Step 7: Verify in Browser DevTools

### **Network Tab Verification**

1. Open **DevTools** (F12) → **Network** tab
2. Click "PayPal Button"
3. Watch network requests:

**Expected requests:**
```
1. ✅ paypal.com/checkout/js/... (PayPal SDK script)
2. ✅ api.sandbox.paypal.com/v2/checkout/orders (CREATE order)
3. ✅ localhost/api/donations/create-order (Your backend)
4. ⚠️  If no backend: 404 error (this is OK for now)
```

### **Console Tab Verification**

The console should show:
```javascript
// Good signs:
✅ No 404 errors for CSS/JS
✅ PayPal errors are informative
✅ Your console.log messages appear

// Bad signs:
❌ "Cannot read properties of undefined"
❌ "PayPal is not defined"
❌ "Failed to fetch" for paypal SDK
```

---

## Step 8: Test Error Handling

### **Test Scenarios:**

#### **1. No Amount Selected**
```
1. Don't select any amount
2. Click PayPal button
✅ Should show: "Please select a valid donation amount"
```

#### **2. Invalid Custom Amount**
```
1. Type 0 in custom amount
2. Click PayPal button
✅ Should show: "Please select a valid donation amount"
```

#### **3. Network Error (SimulatedIf backend fails)
```
1. PayPal payment authorized
2. Backend endpoint doesn't exist
3. Check error message appears

✅ Expected: "Error processing your donation..."
✅ Should NOT crash the entire page
```

---

## Step 9: Verify Console Logging

### **Check Your Code is Running**

Open **DevTools Console** and look for logs when you:

1. **Select amount:** No console output expected
2. **Toggle online/offline:** No console output expected
3. **Click PayPal:** May see PayPal SDK loading logs
4. **Complete payment:** Should see logged donation data

**To see all logs, add this to console:**
```javascript
// In DevTools Console, after clicking PayPal
window.donationLogs
```

---

## Step 10: Component State Verification

### **Check Component State (For Developers)**

1. Install **React DevTools Chrome Extension** (if not already installed)
2. Open DevTools → Components tab
3. Find `ImpactDonation` or `Payment` component
4. Verify state values:
   ```
   selectedAmount: 20
   customAmount: ""
   donationType: "online"
   paymentMethod: "paypal"
   isProcessing: false
   message: ""
   ```

---

## Troubleshooting Checklist

| Symptom | Check | Fix |
|---------|-------|-----|
| PayPal button isn't visible | Is `donationType === 'online'`? | Click "Donate Online" button |
| PayPal button isn't visible | Is `paymentMethod === 'paypal'`? | Click PayPal method button |
| PayPal button says "Loading" | Check network tab | May need to refresh |
| Error: "Invalid Client ID" | Check config file | Verify Client ID is correct |
| Popup doesn't open | Browser popup blocker? | Allow popups for localhost:5173 |
| After login, blank page | Backend endpoint missing? | This is expected without backend |
| "Error processing donation" | Network error logged? | Check Network tab in DevTools |
| State not updating | React fast refresh issue | Try full page refresh (Ctrl+Shift+R) |

---

## Quick Test Command

Run this in **PowerShell** to test everything:

```powershell
# Navigate to project
cd c:\Users\User\NGO-website

# Clean cache
rm -r node_modules/.vite

# Start fresh
npm run dev

# Open browser
Start-Process "http://localhost:5173"
```

---

## Expected Checklist After Testing

- [ ] Dev server starts without errors
- [ ] ImpactDonation component renders on homepage
- [ ] Payment page loads correctly
- [ ] Amount buttons ($10-$50) are clickable
- [ ] Custom amount input works
- [ ] "Donate Online" and "Donate Offline" toggle state changes
- [ ] Payment method buttons appear when "Online" selected
- [ ] PayPal button appears when PayPal method selected
- [ ] PayPal button opens PayPal sandbox/login
- [ ] No "Cannot read properties of undefined" errors
- [ ] No Client ID errors in console
- [ ] Network shows PayPal SDK loading
- [ ] Error messages display properly for invalid amounts
- [ ] Frequency dropdown works
- [ ] Bank transfer details are visible

---

## Next Phase: Backend Integration

Once you've verified the frontend works, create these endpoints:

1. **POST /api/donations/create-order**
   - Receives amount
   - Calls PayPal API to create order
   - Returns order ID

2. **POST /api/donations/capture-order/:orderId**
   - Receives order ID
   - Calls PayPal API to capture payment
   - Returns order confirmation

3. **POST /api/donations/success**
   - Receives donation data
   - Saves to database
   - Sends confirmation email (optional)

See `PAYPAL_INTEGRATION.md` for detailed endpoint specs.

---

## Still Having Issues?

Check these files for syntax errors:
```
1. src/config/paypalConfig.js
2. src/utils/donationHelper.js
3. src/components/ImpactDonation.jsx
4. src/pages/Payment.jsx
```

Run this to check for build errors:
```powershell
npm run build
```

If build fails, fix errors shown in output before deploying.
