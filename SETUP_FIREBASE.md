# Firebase Setup Instructions

This guide will help you set up Firebase Cloud Functions for the contact form.

## Prerequisites

1. Node.js installed (v18 or later)
2. Firebase CLI installed: `npm install -g firebase-tools`
3. A Gmail account for sending emails (or another SMTP service)

## Step 1: Initialize Firebase

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init

# Select:
# - Functions (Cloud Functions)
# - Hosting (if not already set up)
```

## Step 2: Configure Email Credentials

### Option A: Gmail with App Password (Recommended)

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App Passwords
4. Generate a new app password for "Mail"
5. Update `functions/index.js`:
   ```javascript
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: 'your-email@gmail.com',
       pass: 'your-app-password-here'
     }
   });
   ```

### Option B: Other Email Services

Update the transporter configuration in `functions/index.js`:

```javascript
// For SendGrid
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: 'your-sendgrid-api-key'
  }
});

// For custom SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.yourdomain.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@yourdomain.com',
    pass: 'your-password'
  }
});
```

## Step 3: Install Function Dependencies

```bash
cd functions
npm install
cd ..
```

## Step 4: Deploy Cloud Function

```bash
# Deploy only functions
firebase deploy --only functions

# After deployment, you'll get a URL like:
# https://us-central1-YOUR-PROJECT.cloudfunctions.net/submitContactForm
```

## Step 5: Update React App

1. Copy the Cloud Function URL from the deployment output
2. Update `src/App.jsx`:
   ```javascript
   const FIREBASE_FUNCTION_URL = 'https://us-central1-YOUR-PROJECT.cloudfunctions.net/submitContactForm';
   ```

## Step 6: Test the Form

1. Build and deploy your site:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

2. Test the contact form on your live site
3. Check your email for the inquiry

## Security Features Included

✅ **Honeypot field** - Catches simple bots  
✅ **Rate limiting** - Max 3 submissions per hour per IP  
✅ **Email validation** - Validates email format  
✅ **CORS protection** - Only allows requests from your domain  
✅ **Input sanitization** - Escapes HTML in messages

## Optional: Save to Firestore

To also save inquiries to Firestore (recommended for backup), uncomment the code in `functions/index.js`:

```javascript
// Uncomment this section in functions/index.js
const admin = require('firebase-admin');
if (!admin.apps.length) {
  admin.initializeApp();
}
await admin.firestore().collection('inquiries').add({
  name,
  email,
  company,
  message,
  timestamp: admin.firestore.FieldValue.serverTimestamp(),
  ip: clientIp
});
```

Then enable Firestore in your Firebase Console.

## Troubleshooting

### Function fails to deploy
- Make sure you're on a Blaze (pay-as-you-go) plan
- Check that Node.js version matches (v18)

### Emails not sending
- Verify email credentials are correct
- Check Firebase Functions logs: `firebase functions:log`
- Ensure "Less secure app access" is enabled for Gmail (if not using app passwords)

### Rate limiting too strict
- Adjust `MAX_REQUESTS` and `RATE_LIMIT_WINDOW` in `functions/index.js`

## Cost Estimate

- Cloud Functions: Free tier covers ~2 million invocations/month
- Typical usage: ~10-50 submissions/month = FREE
- You only pay if you exceed the free tier

## Support

If you encounter issues:
1. Check Firebase Functions logs: `firebase functions:log`
2. Test locally: `firebase emulators:start --only functions`
3. Verify CORS settings if getting CORS errors
