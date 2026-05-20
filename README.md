# Personal Portfolio

A dependency-light portfolio website built with modern frontend and backend practices.

## Run Locally

```bash
npm run dev
```

Then open the Vite URL shown in the terminal.

To test the production-style Node server:

```bash
npm run build
npm run start
```

Then open `http://localhost:3000`.

## What Is Included

- Semantic, responsive frontend with accessible navigation and forms
- Backend contact API with request size limits, validation, basic rate limiting, and security headers
- Gated product demo hub for high-value AI applications
- Static asset caching for production-friendly delivery
- Environment-based contact message destination

## Contact Messages

Contact messages are sent to `hamu.dxb@gmail.com` through Web3Forms.

The frontend uses the Web3Forms access key in `public/index.html`, so no SMTP setup is required for the live contact form.

The Node backend still supports SMTP as a fallback if you want to move email delivery server-side later.

By default, messages are written to the server console during local development. In production, configure SMTP environment variables so the backend can send the message as email:

```bash
CONTACT_EMAIL=hamu.dxb@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-gmail-address@gmail.com
```

For Gmail, use an app password rather than your normal Google account password.

You can also set `CONTACT_WEBHOOK_URL` to forward messages to a webhook endpoint instead of SMTP.

## Product Demo Strategy

The portfolio presents Aura Command, Documind, Siteflow, and SecureOps as private product demos. Live app access should be issued only through gated, expiring demo accounts with seeded data, audit logs, and restricted export/API/admin features.
