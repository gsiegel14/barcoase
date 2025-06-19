#!/bin/bash

# GitHub Pages Deployment Script
# Deploys PWA for direct staff access without hospital IT

echo "🚀 Deploying PWA to GitHub Pages..."
echo "====================================="

# Build the application
echo "📦 Building PWA for production..."
npm run build

# Install gh-pages if not already installed
echo "🔧 Installing GitHub Pages deployment tool..."
npm install --save-dev gh-pages

# Add GitHub Pages deployment script to package.json
echo "📄 Adding deployment script to package.json..."
if ! grep -q '"deploy":' package.json; then
    # Add deploy script before the closing brace of scripts
    sed -i '' 's/"hospital-server": "node hospital-server.js"/"hospital-server": "node hospital-server.js",\
    "deploy": "gh-pages -d dist"/' package.json
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "📝 Creating .gitignore..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
.npm
.pnp
.pnp.js

# Production builds
/dist
/build

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/

# Temporary files
*.tmp
*.temp
EOF
fi

# Add all files to git
echo "📁 Adding files to git repository..."
git add .

# Initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Hospital QR Code Processor PWA

Features:
- Fully offline PWA for QR code processing
- Processes format: WB##########|#######
- Works without internet after installation
- Optimized for hospital staff mobile devices"

echo ""
echo "✅ REPOSITORY READY!"
echo "==================="
echo ""
echo "🌐 NEXT STEPS TO DEPLOY:"
echo "1. Create a new repository on GitHub.com"
echo "2. Copy the repository URL (e.g., https://github.com/username/repo-name.git)"
echo "3. Run these commands:"
echo ""
echo "   git remote add origin [YOUR-GITHUB-REPO-URL]"
echo "   git branch -M main"
echo "   git push -u origin main"
echo "   npm run deploy"
echo ""
echo "📱 AFTER DEPLOYMENT:"
echo "Your PWA will be available at:"
echo "https://[username].github.io/[repo-name]/"
echo ""
echo "🏥 STAFF INSTALLATION:"
echo "1. Share the GitHub Pages URL with hospital staff"
echo "2. Staff open URL in Chrome/Safari on their phones"
echo "3. Tap 'Add to Home Screen' or 'Install'"
echo "4. App works offline forever!"
echo ""
echo "🔐 PRIVACY:"
echo "- No data leaves the device"
echo "- Processing happens locally"
echo "- No tracking or analytics"
echo "- HIPAA-friendly" 