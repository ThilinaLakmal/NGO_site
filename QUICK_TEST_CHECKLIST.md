# Quick PayPal Testing Checklist

## 🚀 Quick Start (5 minutes)

```powershell
# Step 1: Start dev server
cd c:\Users\User\NGO-website
npm run dev

# Step 2: Open in browser
# → http://localhost:5173

# Step 3: Navigate to donation page
# → Look for "ImpactDonation" section or go to /payment

# Step 4: Test flow (see below)
```

---

## ✅ Frontend Testing Checklist

### Page 1: ImpactDonation Component
- [ ] Component renders without errors
- [ ] Amount buttons visible ($10, $20, $30, $40, $50)
- [ ] Custom amount input field works
- [ ] Can toggle "Donate Online" / "Donate Offline"
- [ ] When "Online" selected → Payment method buttons appear
- [ ] "PayPal" button is selectable
- [ ] When PayPal selected → Blue PayPal button appears
- [ ] Error message shows if amount is 0 or invalid

### Page 2: Payment Page
- [ ] Page loads without errors
- [ ] Amount buttons work
- [ ] Custom amount input works
- [ ] Online/Offline toggle works
- [ ] Payment methods appear for online only
- [ ] Frequency dropdown has options
- [ ] Bank transfer details visible (right side)
- [ ] Blue PayPal button appears correctly

---

## 🔴 Common Issues & Quick Fixes

| Issue | How to Fix | Check |
|-------|-----------|-------|
| **PayPal button not showing** | Click "Donate Online" first, then select "PayPal" | State shows `donationType='online'` AND `paymentMethod='paypal'` |
| **"Cannot read properties of undefined" error** | Refresh page (Ctrl+Shift+R) | Console shows no red errors |
| **404 error in network tab** | This is OK if backend not yet built | Should see `/api/donations/create-order` attempt |
| **Blank page after PayPal login** | Expected without backend | Network tab shows 404 for `/api/donations/...` |
| **React DevTools shows state not updating** | Try full refresh or restart dev server | Close dev tools, refresh page |

---

## 🧪 Test Payment Flow (Step-by-Step)

### **Test 1: Preset Amount ($20)**
```
1. On ImpactDonation/Payment page
2. Click "$20" button
   ✅ Button turns black (selected state)
3. Click "Donate Online"
   ✅ Payment method buttons appear
4. Click "PayPal"
   ✅ Blue PayPal button appears
5. Click PayPal button
   ✅ Should open PayPal (or try to)
```

### **Test 2: Custom Amount ($75.50)**
```
1. Clear any selected amounts
2. Type "75.50" in "Other Amount (USD)"
   ✅ Input updates
   ✅ Selected amount buttons deselect
3. Click "Donate Online"
4. Click "PayPal"
5. Click PayPal button
   ✅ Should work with custom amount
```

### **Test 3: Offline Donation**
```
1. Click "Donate Offline"
   ✅ Payment method buttons HIDE
2. Yellow "Donate Now" button appears
   ✅ Bank transfer details visible on right
3. Click "Donate Now"
   ✅ Should work (no integration needed)
```

---

## 🔍 What to Look For in DevTools

### **Console Tab**
```
✅ GOOD:
  - No red errors
  - No "Cannot find module"
  - No "PayPal is not defined"

❌ BAD:
  - Red error messages
  - "Cannot read properties..."
  - "Syntax error"
```

### **Network Tab**
```
✅ GOOD:
  - paypal.com/checkout... → 200 OK
  - Your localhost requests → 404 or 200 (either OK)

❌ BAD:
  - paypal.com requests → 404 NOT FOUND
  - ERROR status codes
  - CORS errors
```

### **Elements/Inspector Tab**
```
1. Find the PayPal button element
2. Right-click → Inspect
3. Look for: <iframe src="paypal.com...">
✅ Should exist when button visible
```

---

## 📊 State Values to Verify (DevTools React Extension)

When PayPal button is visible, state should be:
```javascript
{
  selectedAmount: 20,           // or null if custom
  customAmount: "",             // or "75.50" if custom
  donationType: "online",       // NOT "offline"
  paymentMethod: "paypal",      // NOT "credit", "visa", etc
  isProcessing: false,          // Should be false until clicked
  message: ""                   // Empty until transaction
}
```

---

## 🎯 Final Verification Checklist

Run through ALL of these:

### Frontend Working?
- [ ] No console errors when page loads
- [ ] Type `PayPalButtons` in console → Should be defined
- [ ] Type `PAYPAL_CLIENT_ID` in console → Should show long ID

### Components Rendering?
- [ ] Amount section visible and working
- [ ] Donation type toggle visible and working
- [ ] Payment methods visible when online selected
- [ ] Blue PayPal button visible when PayPal selected

### Interactions Working?
- [ ] Can select different amounts
- [ ] Can type custom amount
- [ ] Can toggle online/offline
- [ ] Can switch payment methods
- [ ] Can see payment method change

### No Errors?
- [ ] Console tab clear of red errors
- [ ] No network errors for core resources
- [ ] Component renders without crashing
- [ ] No "Cannot read properties" errors

---

## 🚨 When PayPal Button Clicked

### **Expected Sequence:**
```
1. Click PayPal button
2. Page attempts to create order (Network tab shows request)
3. One of these happens:

   A) ✅ PayPal popup opens
      →  Shows PayPal login
      →  You login with sandbox account
      
   B) ❌ Error message shows
      →  "Error processing donation"
      →  Check Network tab for failed request
      →  This is OK - your backend not yet built
```

### **How to Check:**
```javascript
// In DevTools Console, paste this:
fetch('/api/donations/create-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 20 })
}).then(r => console.log(r.status))
```

Result:
- **404**: Backend endpoint missing (expected, build it later)
- **200**: Backend working (great!)
- **5xx**: Backend error (check backend logs)

---

## 📱 Test on Different Screens

- [ ] Test on Desktop (1920px)
- [ ] Test on Tablet (768px)
- [ ] Test on Mobile (375px)
  - [ ] PayPal button still visible
  - [ ] All buttons clickable
  - [ ] No layout breaking

---

## 🎓 Understanding What Should Happen

### **Without Backend (Current)**
```
Frontend ✅
  ↓
  [Amount + Online + PayPal selected]
  ↓
PayPal Button Ready ✅
  ↓
  [Click PayPal]
  ↓
Try to create order ❌
  ↓
Error message shows ⚠️
  ↓
This is CORRECT! Build backend next.
```

### **With Backend (Later)**
```
Frontend ✅
  ↓
  [Amount + Online + PayPal selected]
  ↓
PayPal Button Ready ✅
  ↓
  [Click PayPal]
  ↓
Frontend sends amount to /api/donations/create-order ✅
  ↓
Backend creates PayPal order ✅
  ↓
PayPal popup opens ✅
  ↓
User approves payment ✅
  ↓
Frontend sends to /api/donations/capture-order ✅
  ↓
Backend captures payment ✅
  ↓
Success message shows ✅
```

---

## 🆘 When Something's Wrong

1. **Check Console (F12)**
   - Any red errors?
   - What do they say?

2. **Check Network Tab**
   - Any failed requests?
   - Are resources loading?

3. **Check Element Inspector**
   - Is PayPal button HTML there?
   - Is React component mounted?

4. **Try These Commands in Console:**
   ```javascript
   // Check if PayPal is loaded
   typeof PayPalButtons  // Should be 'function'
   
   // Check Client ID
   'Ac9yvCEllNpFx8ntPUco4sXW3B1EV0LY2ktYVijW3Go_I8cg0e4bwgc8Nsp1J2PY1izLD57gDyJK0fIf'.length
   // Should be around 85
   ```

5. **Restart Everything:**
   ```powershell
   # Stop dev server (Ctrl+C)
   # Clear cache
   rm -r node_modules\.vite
   # Restart
   npm run dev
   ```

---

## ✨ Success Indicators

You'll know it's working when:

✅ **Frontend:**
- No errors in console
- PayPal button appears when expected
- Can select amounts and payment methods

✅ **PayPal Integration:**
- PayPal button loads correctly
- Button is interactive (not grayed out)
- Can click it without browser blocking popup

✅ **Error Handling:**
- Invalid amounts show error message
- Errors don't crash the app
- User can retry

---

## Next Step: Build Backend

Once frontend is verified working, see `PAYPAL_INTEGRATION.md` for backend endpoint specs to create.

The UI is done! 🎉 Now focus on the API endpoints.
