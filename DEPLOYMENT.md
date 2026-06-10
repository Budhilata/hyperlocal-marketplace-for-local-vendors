# LocalBazaar - Setup and Deployment Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [Development](#development)
4. [Building for Production](#building-for-production)
5. [Deployment Options](#deployment-options)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

## 🖥️ System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn 1.22.0+)
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## 📦 Installation

### Step 1: Clone or Download the Project

If you have Git:
```bash
git clone <repository-url>
cd localbazaar
```

Or download the ZIP file and extract it.

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

This will install all required packages:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)
- All dev dependencies

**Expected installation time**: 2-5 minutes depending on your internet connection.

## 🚀 Development

### Start Development Server

Using npm:
```bash
npm run dev
```

Using yarn:
```bash
yarn dev
```

This will:
1. Start the Vite development server
2. Automatically open your browser at `http://localhost:3000`
3. Enable Hot Module Replacement (HMR) for instant updates

### Development Features

- **Hot Reload**: Changes appear instantly without page refresh
- **Fast Refresh**: React state is preserved during updates
- **TypeScript Checking**: Real-time type checking
- **ESLint**: Code quality checking

### Development URLs

- **Local**: http://localhost:3000
- **Network**: Check your terminal for the network URL to access from other devices

## 🏗️ Building for Production

### Create Production Build

Using npm:
```bash
npm run build
```

Using yarn:
```bash
yarn build
```

This will:
1. Run TypeScript compiler to check types
2. Bundle and minify JavaScript
3. Optimize CSS
4. Compress images
5. Generate production-ready files in `dist/` folder

### Preview Production Build

Using npm:
```bash
npm run preview
```

Using yarn:
```bash
yarn preview
```

This serves the production build locally for testing.

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Easiest and fastest deployment**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your app will be live!

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite configuration
5. Click "Deploy"

**Deployment time**: ~2 minutes

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Or use Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Your app is live!

**Deployment time**: ~2 minutes

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Add base URL in vite.config.ts:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

**Deployment time**: ~3 minutes

### Option 4: Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize project:
```bash
firebase init hosting
```

4. Select these options:
   - Public directory: `dist`
   - Configure as SPA: `Yes`
   - Automatic builds: `No`

5. Build and deploy:
```bash
npm run build
firebase deploy
```

**Deployment time**: ~3 minutes

### Option 5: AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Create S3 bucket and enable static website hosting

3. Upload `dist` folder contents to S3

4. Create CloudFront distribution

5. Point domain to CloudFront

**Deployment time**: ~15 minutes (more complex)

### Option 6: Traditional Web Server

1. Build the project:
```bash
npm run build
```

2. Upload contents of `dist/` folder to your web server

3. Configure server:
   - Point document root to uploaded folder
   - Set up URL rewriting for SPA (all routes → index.html)

**Example Nginx configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Example Apache .htaccess:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🔐 Environment Variables

Currently, the app doesn't use environment variables (it's a frontend demo). 

For future backend integration, create a `.env` file:

```env
VITE_API_URL=https://your-api.com
VITE_STRIPE_KEY=pk_test_xxxxx
VITE_GOOGLE_MAPS_KEY=AIzaSyxxxxx
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Important**: 
- Prefix all variables with `VITE_`
- Never commit `.env` to Git
- Use different values for dev/staging/prod

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Port 3000 already in use

**Error**: "Port 3000 is already in use"

**Solution**:
```bash
# Kill process on port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3001
```

#### 2. Module not found errors

**Error**: "Cannot find module 'xyz'"

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. TypeScript errors

**Error**: TypeScript compilation errors

**Solution**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update TypeScript
npm install -D typescript@latest
```

#### 4. Build fails

**Error**: Build process fails

**Solution**:
```bash
# Clear cache and rebuild
rm -rf dist node_modules/.vite
npm install
npm run build
```

#### 5. Styles not loading

**Error**: Tailwind styles not applied

**Solution**:
1. Check `tailwind.config.js` content paths
2. Ensure `globals.css` is imported in `main.tsx`
3. Restart dev server

#### 6. Images not loading in production

**Error**: Images work in dev but not in production

**Solution**:
- Use relative paths for images
- Place images in `public/` folder
- Check base URL in vite.config.ts

## 📊 Performance Optimization

### Build Optimization

The production build is already optimized, but you can further optimize:

1. **Lazy Loading**:
```typescript
const VendorDashboard = lazy(() => import('./components/VendorDashboard'));
```

2. **Image Optimization**:
- Use WebP format
- Implement lazy loading for images
- Use appropriate image sizes

3. **Code Splitting**:
- Vite handles this automatically
- Use dynamic imports for large components

4. **Bundle Analysis**:
```bash
npm install -D rollup-plugin-visualizer
```

Add to vite.config.ts:
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  react(),
  visualizer({ open: true })
]
```

## 🔒 Security Best Practices

1. **Never commit sensitive data**
2. **Use environment variables for API keys**
3. **Enable HTTPS in production**
4. **Set proper CORS headers**
5. **Implement rate limiting**
6. **Sanitize user inputs**
7. **Keep dependencies updated**:
```bash
npm audit
npm audit fix
```

## 📱 Testing on Mobile

### Test on Your Mobile Device

1. Start dev server
2. Note the network URL from terminal (e.g., `http://192.168.1.x:3000`)
3. Open that URL on your mobile device (ensure same WiFi network)

### Browser DevTools

Use Chrome DevTools:
1. Open DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select device (iPhone, iPad, etc.)

## 📈 Monitoring and Analytics

For production, consider adding:

1. **Google Analytics**:
```bash
npm install react-ga4
```

2. **Error Tracking** (Sentry):
```bash
npm install @sentry/react
```

3. **Performance Monitoring**:
```typescript
// Use Web Vitals
npm install web-vitals
```

## 🔄 Updates and Maintenance

### Keep Dependencies Updated

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install <package>@latest
```

### Version Control

Recommended Git workflow:
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

## 💡 Tips for Success

1. **Use Git**: Version control is essential
2. **Test Before Deploy**: Always test production build locally
3. **Monitor Performance**: Use Lighthouse for audits
4. **Keep It Simple**: Don't over-engineer
5. **Document Changes**: Keep README updated
6. **Backup Regularly**: Have deployment backups
7. **Use CDN**: For faster global access

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Search GitHub issues
3. Check Stack Overflow
4. Open a new issue with details

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test production build locally (`npm run preview`)
- [ ] Check all pages work correctly
- [ ] Test on mobile devices
- [ ] Verify images load correctly
- [ ] Test all user flows (customer/vendor/delivery)
- [ ] Check console for errors
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Set up domain (if using custom domain)
- [ ] Configure SSL/HTTPS
- [ ] Set up error monitoring
- [ ] Set up analytics (optional)
- [ ] Create backup of current version

---

**Ready to Deploy?** Choose your deployment platform and follow the steps above. Good luck! 🚀
