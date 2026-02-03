# Peak Work Studios Website

A modern, SME-focused automation consulting website built with React, Vite, and Firebase.

## Features

- ✅ **SME-First Messaging** - Focus on practical pain points and outcomes
- ✅ **Contact Form** - Firebase Cloud Function backend with email delivery
- ✅ **Spam Protection** - Honeypot field + rate limiting
- ✅ **Dark/Light Theme** - Persistent theme toggle
- ✅ **Mobile-Friendly** - Responsive design optimized for all devices
- ✅ **Success State** - Clear feedback after form submission

## Tech Stack

- **Frontend**: React 18, Styled Components
- **Build Tool**: Vite
- **Backend**: Firebase Cloud Functions
- **Hosting**: Firebase Hosting (or any static host)
- **Email**: Nodemailer with Gmail/SMTP

## Local Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:5173
   ```

## Firebase Setup (Contact Form)

The contact form uses Firebase Cloud Functions to send emails. Follow these steps:

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login and Initialize

```bash
firebase login
firebase init
```

Select:
- ✓ Functions
- ✓ Hosting

### 3. Configure Email

Edit `functions/index.js` and add your email credentials:

```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'  // Generate from Google Account settings
  }
});
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Go to Security > App Passwords
3. Generate new app password for "Mail"
4. Use that password in the config

### 4. Install Function Dependencies

```bash
cd functions
npm install
cd ..
```

### 5. Deploy Cloud Function

```bash
firebase deploy --only functions
```

Copy the function URL from the output.

### 6. Update React App

Edit `src/App.jsx` and replace the placeholder URL:

```javascript
const FIREBASE_FUNCTION_URL = 'https://us-central1-YOUR-PROJECT.cloudfunctions.net/submitContactForm';
```

### 7. Deploy Website

```bash
npm run build
firebase deploy --only hosting
```

See [SETUP_FIREBASE.md](./SETUP_FIREBASE.md) for detailed instructions.

## Deployment Without Firebase

If you prefer not to use Firebase, you can:

1. **Deploy frontend** to Vercel, Netlify, or any static host:
   ```bash
   npm run build
   # Upload the dist/ folder
   ```

2. **Update form backend:**
   - Option A: Use Formspree, Getform, or similar service
   - Option B: Point to your own API endpoint
   - Option C: Use mailto link as fallback

## Project Structure

```
peak_work_studios/
├── src/
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Minimal global styles
├── functions/
│   ├── index.js          # Cloud Function for contact form
│   └── package.json      # Function dependencies
├── public/               # Static assets
├── firebase.json         # Firebase config
├── vite.config.js        # Vite config
└── SETUP_FIREBASE.md     # Detailed Firebase setup
```

## Configuration

### Theme Colors

Edit theme colors in `src/App.jsx`:

```javascript
const lightTheme = {
  primary: '#38bdf8',
  secondary: '#9E7FFF',
  // ...
};

const darkTheme = {
  primary: '#38bdf8',
  secondary: '#9E7FFF',
  // ...
};
```

### Contact Links

Update these constants in the ContactForm component:

```javascript
const CALENDLY_URL = 'https://calendly.com/your-handle';
const FIREBASE_FUNCTION_URL = 'your-cloud-function-url';
```

### Page Sections

The site has these main sections (all in `App.jsx`):
- **Hero** - Main headline with builder badge
- **Services** - Proof of approach + value cards
- **Consulting** - Consulting offerings
- **About** - SME pain points + how you work
- **Contact** - Audit form with expectations

## Security Features

✅ **Honeypot field** - Catches simple bots  
✅ **Rate limiting** - 3 submissions/hour per IP  
✅ **Email validation** - Client & server side  
✅ **CORS protection** - Restricts origins  
✅ **Input sanitization** - Prevents XSS

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle size: < 200KB (gzipped)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### Form not submitting

1. Check browser console for errors
2. Verify Firebase Function URL is correct
3. Check Firebase Functions logs: `firebase functions:log`
4. Ensure CORS is configured correctly

### Theme not persisting

- Check localStorage is enabled in browser
- Clear browser cache

### Mobile menu not working

- Verify JavaScript is enabled
- Check for console errors
- Test on actual device (not just browser resize)

## Contributing

This is a personal portfolio site. If you find bugs or have suggestions, please open an issue.

## License

© 2025 Kunal Deshmukh. All rights reserved.

## Support

For questions or issues:
- Email: hello@kunaldeshmukh.com
- LinkedIn: [linkedin.com/in/kunaldeshmukh](https://www.linkedin.com/in/kunaldeshmukh)
