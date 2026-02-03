# Deployment Checklist

Complete these steps before going live.

## Pre-Deployment

### 1. Firebase Configuration

- [ ] Firebase CLI installed: `npm install -g firebase-tools`
- [ ] Logged in: `firebase login`
- [ ] Project initialized: `firebase init`
- [ ] Email credentials configured in `functions/index.js`
- [ ] Function dependencies installed: `cd functions && npm install`

### 2. Update Contact Form URL

- [ ] Deploy Cloud Function: `firebase deploy --only functions`
- [ ] Copy function URL from deployment output
- [ ] Update `FIREBASE_FUNCTION_URL` in `src/App.jsx` (line ~607)
- [ ] Test form submission locally

### 3. Update Personal Links

- [ ] LinkedIn URL in Footer (line ~1041)
- [ ] Email address for form notifications (functions/index.js)
- [ ] Calendly URL constant (line ~606)

### 4. Content Review

- [ ] All company/employer names removed
- [ ] Client names removed
- [ ] Copy is SME-first and focused
- [ ] Contact info is correct

### 5. Build Test

```bash
npm run build
```

- [ ] Build completes without errors
- [ ] Check dist/ folder is created
- [ ] Review bundle size (should be < 200KB gzipped)

## Deployment

### Option A: Firebase Hosting

```bash
npm run build
firebase deploy
```

- [ ] Hosting deployed successfully
- [ ] Visit live URL and test all sections
- [ ] Test contact form submission
- [ ] Verify email received at hello@kunaldeshmukh.com
- [ ] Test on mobile device

### Option B: Other Hosting (Vercel, Netlify, etc.)

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

- [ ] Static files uploaded
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Test contact form
- [ ] Verify Firebase function is callable from production

## Post-Deployment Testing

### Functionality Tests

- [ ] Hero section displays correctly
- [ ] Builder badge shows properly
- [ ] All navigation links work
- [ ] Smooth scrolling works
- [ ] Dark/light theme toggle works
- [ ] Theme persists on page reload
- [ ] Contact form fields validate
- [ ] Success state appears after submission
- [ ] "Prefer to book time" link works
- [ ] Footer links work

### Mobile Testing

- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Hamburger menu works
- [ ] CTAs stack vertically on mobile
- [ ] Builder badge centers on mobile
- [ ] Form is usable on small screens
- [ ] All text is readable (no overflow)

### Performance Testing

- [ ] Run Lighthouse audit (target: 90+)
- [ ] Check First Contentful Paint (< 1.5s)
- [ ] Check Time to Interactive (< 3s)
- [ ] Test on slow 3G connection
- [ ] Images/assets load properly

### Security Testing

- [ ] HTTPS is enforced
- [ ] Test honeypot (fill hidden field = no email sent)
- [ ] Test rate limiting (submit 4+ times rapidly)
- [ ] Try XSS in form fields (should be sanitized)
- [ ] Invalid email format is rejected

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

## Analytics (Optional)

- [ ] Google Analytics installed
- [ ] Form submission tracking set up
- [ ] Conversion goals configured
- [ ] Privacy policy updated

## Backup & Monitoring

- [ ] Code pushed to Git repository
- [ ] Firebase Functions logs accessible
- [ ] Uptime monitoring configured (UptimeRobot, etc.)
- [ ] Email forwarding tested
- [ ] Error notifications set up

## SEO & Marketing

- [ ] Meta tags updated (title, description)
- [ ] Open Graph tags added
- [ ] Favicon added
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] LinkedIn profile link added to site
- [ ] Site link added to LinkedIn profile

## Final Checks

- [ ] All console errors resolved
- [ ] No broken links (use link checker)
- [ ] Forms submit successfully
- [ ] 404 page works (if custom)
- [ ] Accessibility check (WAVE, axe)
- [ ] Spell check all content
- [ ] Test from different locations/IPs

## Emergency Rollback Plan

If something goes wrong:

```bash
# Roll back Firebase deployment
firebase hosting:rollback

# Or redeploy previous version
git checkout <previous-commit>
npm run build
firebase deploy
```

## Support Contacts

- Firebase Support: https://firebase.google.com/support
- Domain registrar support
- Email service support (Gmail, etc.)

---

## Quick Test Command

```bash
# Test build
npm run build

# Test locally with preview
npm run preview

# Deploy everything
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting
```

## Common Issues

### Form not working
1. Check Firebase Function URL is correct
2. Check CORS settings
3. Verify email credentials
4. Check Firebase Functions logs

### Theme not persisting
1. Clear browser cache
2. Check localStorage permissions
3. Test in incognito mode

### Mobile menu stuck
1. Clear browser cache
2. Hard refresh (Cmd+Shift+R)
3. Check for JavaScript errors

---

**After completing all checks, your site is ready to launch! 🚀**
