# Denver Health - QR Code Processor

A mobile-first web application that processes QR codes in the format `WB##########|#######` by appending `.forexample` to both parts and generating new QR codes.

## 🚀 Features

- **QR Code Processing**: Appends `.forexample` to QR codes in the format `WB##########|#######`
- **QR Code Generation**: Creates new QR codes from processed data
- **Camera Scanner**: Optional camera-based QR code scanning (on supported devices)
- **Offline Functionality**: Works completely offline with PWA capabilities
- **Mobile-First Design**: Optimized for mobile devices with touch-friendly interface
- **Installable PWA**: Add to home screen, works like a native app
- **Download & Share**: Save or share generated QR codes
- **Denver Health Branding**: Custom theme with Denver Health colors and logo
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- **No Data Storage**: Completely client-side processing for privacy

## 📱 Example Usage

**Input**: `WB1234567890|9876543`  
**Output**: `WB1234567890.forexample|9876543.forexample`

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI) v5** for UI components
- **Vite** for build tooling and development server
- **@zxing/browser** for QR code scanning
- **qrcode** for QR code generation

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ and npm 9+

### Installation & Development

1. **Clone and navigate to the project**:
   ```bash
   cd educational-barcode-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

### Testing Offline Functionality

1. **Build the app**: `npm run build`
2. **Serve the built files**: `npm run preview` or use any static file server
3. **Visit the app in your browser**
4. **Install the PWA** (optional): Click "Install App" button if it appears
5. **Go offline**: Disable your internet connection or use browser dev tools to simulate offline
6. **Test the app**: The app should continue working completely offline

## 📋 How to Use

1. **Install the App** (optional): Click "Install App" to add to your home screen for offline use
2. **Enter QR Code Data**: Type or paste QR code data in the expected format `WB##########|#######`
3. **Or Use Camera Scanner**: Click "Scan QR Code with Camera" to use your device's camera (requires HTTPS)
4. **Process**: Click "Process & Generate QR" to append `.forexample` to both parts
5. **Download/Share**: Use the generated QR code's download or share buttons
6. **Works Offline**: Once loaded, the app works completely offline

## 🎨 Design Features

- **Denver Health Branding**: Custom blue and green color scheme
- **Mobile-Optimized**: Large touch targets (≥44px), responsive design
- **Progressive Web App**: Installable, offline-capable, app-like experience
- **Offline Indicator**: Shows connection status and offline capabilities
- **Accessibility**: Screen reader support, keyboard navigation, high contrast
- **Modern UI**: Material Design 3 principles, smooth animations
- **Progressive Enhancement**: Works with or without camera access

## 🔒 Privacy & Security

- **No Backend**: Completely client-side processing
- **No Data Storage**: No data is stored or transmitted to external servers
- **Offline Capable**: Works without internet connection for complete privacy
- **HTTPS Ready**: Camera scanning requires HTTPS in production
- **Secure Processing**: All QR code processing happens locally in your browser
- **Service Worker**: Caches app resources for offline use, no personal data cached

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with logo
│   ├── QRGenerator.tsx # QR code generation
│   └── QRScanner.tsx   # Camera scanner
├── utils/              # Utility functions
│   ├── qrProcessor.ts  # Core QR processing logic
│   └── qrGenerator.ts  # QR generation utilities
├── theme/              # MUI theme configuration
│   └── index.ts        # Denver Health theme
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🧪 Core Processing Logic

The app processes QR codes with the following logic:

```typescript
export const processQRData = (input: string): string => {
  const qrPattern = /^(WB\d{10})\|(\d{7})$/;
  const match = input.match(qrPattern);
  
  if (match) {
    const [, wbPart, numberPart] = match;
    return `${wbPart}.forexample|${numberPart}.forexample`;
  }
  
  // Fallback for other formats
  if (input.includes('|')) {
    const parts = input.split('|');
    return parts.map(part => `${part.trim()}.forexample`).join('|');
  }
  
  return `${input}.forexample`;
};
```

## 🌐 Browser Support

- **Chrome/Edge**: Full support including camera scanning and PWA features
- **Firefox**: Full support including camera scanning and PWA features
- **Safari**: Full support including camera scanning and PWA features (iOS 11+)
- **Mobile Browsers**: Optimized for mobile Chrome and Safari with full PWA support

**Note**: PWA installation and service worker features require HTTPS in production environments.

## 🚀 Deployment

This app can be deployed to any static hosting service:

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Vercel
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

---

**Denver Health QR Code Processor** - Built with ❤️ for healthcare professionals
