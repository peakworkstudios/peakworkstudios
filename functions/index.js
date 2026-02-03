const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// Configure your email transport
// For Gmail, you'll need to enable "Less secure app access" or use App Passwords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_GMAIL_HERE', // e.g., peakworkstudios@gmail.com
    pass: 'YOUR_APP_PASSWORD_HERE' // Generate an App Password from Google Account settings
  }
});

// In-memory rate limiting (resets on function cold start)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // Max 3 submissions per hour per IP

exports.submitContactForm = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Rate limiting by IP
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = Date.now();
    
    if (rateLimits.has(clientIp)) {
      const { count, firstRequest } = rateLimits.get(clientIp);
      
      // Reset if outside window
      if (now - firstRequest > RATE_LIMIT_WINDOW) {
        rateLimits.set(clientIp, { count: 1, firstRequest: now });
      } else if (count >= MAX_REQUESTS) {
        return res.status(429).json({ 
          error: 'Too many requests. Please try again later.' 
        });
      } else {
        rateLimits.set(clientIp, { count: count + 1, firstRequest });
      }
    } else {
      rateLimits.set(clientIp, { count: 1, firstRequest: now });
    }

    try {
      const { name, email, company, message, timestamp } = req.body;

      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Prepare email content
      const mailOptions = {
        from: email,
        to: 'hello@kunaldeshmukh.com',
        replyTo: email,
        subject: `New Contact Form Inquiry from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <hr>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Timestamp: ${timestamp}

Message:
${message}
        `
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Optional: Also save to Firestore for backup
      // const admin = require('firebase-admin');
      // if (!admin.apps.length) {
      //   admin.initializeApp();
      // }
      // await admin.firestore().collection('inquiries').add({
      //   name,
      //   email,
      //   company,
      //   message,
      //   timestamp: admin.firestore.FieldValue.serverTimestamp(),
      //   ip: clientIp
      // });

      return res.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully' 
      });

    } catch (error) {
      console.error('Error processing form:', error);
      return res.status(500).json({ 
        error: 'Failed to process form submission' 
      });
    }
  });
});
