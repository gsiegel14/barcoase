# Hospital PWA Deployment Guide
**Denver Health - QR Code Processor**

## Overview
This guide explains how to deploy the QR Code Processor PWA in a hospital environment for offline use without internet dependency.

## Deployment Options

### Option 1: Internal Network Server (Recommended)

#### Step 1: Build the Application
```bash
npm run build
```

#### Step 2: Deploy to Hospital Internal Server
Copy the `dist/` folder contents to your internal web server:

```bash
# Example deployment paths:
# Windows Server: C:\inetpub\wwwroot\qr-processor\
# Linux Server: /var/www/html/qr-processor/
# Hospital Intranet: \\hospital-server\webapps\qr-processor\
```

#### Step 3: Configure Internal DNS/URL
Set up internal hospital URL:
```
http://hospital-intranet.local/qr-processor
https://medtech.hospital.local/qr-processor
```

### Option 2: Standalone Kiosk Deployment

#### For Dedicated Tablets/Computers:
```bash
# Chrome Kiosk Mode
chrome --kiosk --app=http://localhost:3000

# Or serve locally with a simple server
npx serve dist/ -p 3000
```

## Staff Installation Process

### Method 1: QR Code Distribution
1. Generate QR codes linking to internal server
2. Post QR codes in break rooms, nursing stations
3. Staff scan → Install → Works offline forever

### Method 2: IT-Managed Installation
```bash
# Group Policy deployment
# Add to Chrome bookmarks/apps
# Pre-install on all hospital devices
```

### Method 3: Manual Installation
**For Staff with Smartphones/Tablets:**
1. Open browser and go to: `http://hospital-intranet.local/qr-processor`
2. Look for "Add to Home Screen" notification
3. OR: Menu → "Install QR Processor"
4. App now works offline!

## Offline Capabilities

✅ **Fully Functional Offline:**
- QR Code scanning and processing
- Barcode generation
- All UI components
- Data processing (WB##########|####### format)

✅ **Cached Resources:**
- All JavaScript, CSS, HTML files
- Icons and images
- Web fonts (Google Fonts cached for 1 year)

## Network Requirements

### Initial Installation:
- **ONE-TIME** internet/intranet access to download
- HTTPS recommended (required for camera access)

### After Installation:
- **NO INTERNET REQUIRED**
- Works completely offline
- Data stays on device

## Security Considerations

### Hospital IT Requirements:
- Deployed on internal network only
- No external data transmission
- All processing happens locally
- HIPAA-compliant (no PHI transmitted)

### Device Security:
- Can be deployed on locked-down devices
- No access to external websites needed
- Self-contained application

## Troubleshooting

### Common Issues:

**"Add to Home Screen" not showing:**
- Ensure HTTPS is enabled
- Check if already installed
- Try different browser (Chrome/Edge recommended)

**App not working offline:**
- Ensure app was fully loaded once online
- Check service worker installation
- Clear cache and reinstall if needed

**Camera not working:**
- HTTPS required for camera access
- Check device permissions
- Ensure camera hardware available

### IT Support Commands:
```bash
# Check if PWA is installed
chrome://apps/

# Clear PWA cache
chrome://settings/content/all

# Force PWA update
chrome://serviceworker-internals/
```

## Technical Details

### Browser Support:
- Chrome (recommended)
- Edge
- Safari (iOS/macOS)
- Firefox

### Device Support:
- Tablets (iPads, Android tablets)
- Smartphones
- Desktop computers
- Dedicated kiosks

### Update Process:
- Automatic updates when connected to internal network
- Manual update: Refresh app or reinstall
- No user intervention needed

## Contact Information
For technical support or deployment assistance:
- IT Help Desk: [Hospital IT Contact]
- Application Support: [Development Team Contact]

---
*Last Updated: $(date)*
*Version: 1.0.0* 