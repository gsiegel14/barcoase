#!/bin/bash

# Hospital PWA Deployment Script
# Creates a complete deployment package for hospital environments

echo "🏥 Creating Hospital PWA Deployment Package..."
echo "=============================================="

# Build the application
echo "📦 Building PWA for production..."
npm run build

# Create deployment directory
DEPLOY_DIR="hospital-deployment-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEPLOY_DIR"

# Copy built files
echo "📁 Copying built files..."
cp -r dist/* "$DEPLOY_DIR/"

# Copy server files
echo "🖥️  Copying server files..."
cp hospital-server.js "$DEPLOY_DIR/"
cp HOSPITAL_DEPLOYMENT.md "$DEPLOY_DIR/"

# Create package.json for server
echo "📄 Creating server package.json..."
cat > "$DEPLOY_DIR/package.json" << EOF
{
  "name": "hospital-qr-processor-server",
  "version": "1.0.0",
  "description": "Hospital PWA Server for QR Code Processor",
  "main": "hospital-server.js",
  "scripts": {
    "start": "node hospital-server.js",
    "start-port": "PORT=3001 node hospital-server.js"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
EOF

# Create installation instructions
echo "📋 Creating installation instructions..."
cat > "$DEPLOY_DIR/INSTALL.txt" << EOF
HOSPITAL QR CODE PROCESSOR PWA - INSTALLATION
=============================================

QUICK START:
1. Copy this entire folder to your hospital server
2. Run: node hospital-server.js
3. Open: http://[hospital-ip]:8080
4. Staff can install the PWA from this URL

DETAILED INSTRUCTIONS:
See HOSPITAL_DEPLOYMENT.md for complete setup guide

SERVER REQUIREMENTS:
- Node.js 14+ (or any web server that can serve static files)
- Internal network access
- Optional: HTTPS certificate for camera access

STAFF INSTALLATION:
1. Visit the server URL in Chrome/Edge
2. Click "Install" when prompted
3. App works offline after installation!

SUPPORT:
- Check server logs if issues occur
- Ensure port 8080 is available
- Use PORT=3001 node hospital-server.js for different port
EOF

# Create startup scripts for different platforms
echo "🖥️  Creating startup scripts..."

# Windows batch file
cat > "$DEPLOY_DIR/start-server.bat" << EOF
@echo off
echo Starting Hospital QR Code Processor PWA Server...
node hospital-server.js
pause
EOF

# Linux/Mac shell script
cat > "$DEPLOY_DIR/start-server.sh" << EOF
#!/bin/bash
echo "Starting Hospital QR Code Processor PWA Server..."
node hospital-server.js
EOF

chmod +x "$DEPLOY_DIR/start-server.sh"

# Create ZIP package
echo "📦 Creating deployment ZIP..."
zip -r "${DEPLOY_DIR}.zip" "$DEPLOY_DIR/" -q

echo ""
echo "✅ DEPLOYMENT PACKAGE CREATED!"
echo "================================"
echo "📂 Folder: $DEPLOY_DIR/"
echo "📦 ZIP:    ${DEPLOY_DIR}.zip"
echo ""
echo "🚀 NEXT STEPS FOR IT DEPARTMENT:"
echo "1. Extract ZIP on hospital server"
echo "2. Install Node.js (if not already installed)"
echo "3. Run: node hospital-server.js"
echo "4. Share URL with hospital staff"
echo ""
echo "📱 STAFF INSTALLATION URL:"
echo "   http://[hospital-server-ip]:8080"
echo ""
echo "📋 See HOSPITAL_DEPLOYMENT.md for complete instructions" 