# Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/1234-ad/nextjs-data-dashboard)

## Manual Deployment Steps

### 1. Prerequisites
- Node.js 18+ installed
- Vercel account (free tier available)
- Git repository access

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/1234-ad/nextjs-data-dashboard.git
cd nextjs-data-dashboard

# Install dependencies
npm install

# Generate full dataset (1000 records)
node scripts/generateData.js

# Run development server
npm run dev
```

### 3. Vercel Deployment

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Set up project settings
# - Deploy
```

#### Option B: GitHub Integration
1. Connect your GitHub account to Vercel
2. Import the repository
3. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 4. Environment Variables
No environment variables required for basic deployment.

### 5. Build Configuration
The project includes:
- `vercel.json` - Vercel-specific configuration
- `next.config.js` - Next.js configuration
- GitHub Actions workflow for CI/CD

### 6. Performance Optimizations
- Static generation for optimal performance
- API routes for server-side data processing
- Efficient pagination and search
- Debounced search (300ms)
- Optimized bundle size

### 7. Monitoring
After deployment, monitor:
- Build logs in Vercel dashboard
- Runtime logs for API routes
- Performance metrics
- Error tracking

## Alternative Deployment Platforms

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

### Railway
```bash
# Dockerfile included for containerized deployment
docker build -t nextjs-dashboard .
docker run -p 3000:3000 nextjs-dashboard
```

### AWS Amplify
1. Connect GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Base directory: `/`
   - Output directory: `.next`

## Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js version (18+ required)
2. **API routes not working**: Ensure serverless functions are enabled
3. **Data not loading**: Verify data.json file exists and is valid
4. **Styling issues**: Check TailwindCSS build process

### Performance Tips
- Enable gzip compression
- Use CDN for static assets
- Monitor Core Web Vitals
- Implement caching strategies

## Production Checklist
- [ ] Generate full 1000 employee dataset
- [ ] Test all functionality locally
- [ ] Verify responsive design
- [ ] Check API endpoints
- [ ] Test search and filtering
- [ ] Validate TypeScript compilation
- [ ] Run build process
- [ ] Deploy to staging environment
- [ ] Perform user acceptance testing
- [ ] Deploy to production
- [ ] Monitor performance metrics