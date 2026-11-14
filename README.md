# Simple Preaching Counter

A standalone, real-time multi-session preaching counter web app with interactive calendar, live partner QR sync, Firebase cloud backup, and offline support.

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or run a local server:

```bash
# Using npx serve
npx serve .

# Or using Python
python -m http.server 8080
```

## 🌐 Deploy to Vercel, Netlify, or GitHub Pages
Since this is a 100% static client-side web application:
1. **GitHub Pages**: Push this directory to a GitHub repository, go to `Settings > Pages`, and select `main` branch root.
2. **Vercel / Netlify**: Drag & drop this folder or connect the repository to deploy instantly with zero configuration.

## ✨ Features
- **Multi-Session Group Counters**: Create distinct counters with date, title, and target.
- **Interactive Calendar**: View historical records and counts by date.
- **Real-Time Partner Sync**: Connect with partners using instant QR scan powered by HiveMQ and EMQX WebSockets.
- **Cloud Backup**: Automatically syncs with Cloud Firestore.
- **PIN Security**: Secure your user account with PIN authentication.
