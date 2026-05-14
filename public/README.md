# Personal Portfolio

A dependency-light portfolio website built with modern frontend and backend practices.

## Run Locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

## What Is Included

- Semantic, responsive frontend with accessible navigation and forms
- Backend contact API with request size limits, validation, basic rate limiting, and security headers
- Static asset caching for production-friendly delivery
- Environment-based contact message destination

## Contact Messages

By default, messages are written to the server console. In production, set `CONTACT_WEBHOOK_URL` to forward messages to a webhook endpoint.
