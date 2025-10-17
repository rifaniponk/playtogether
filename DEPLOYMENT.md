# Deploying PlayTogether to Netlify

## Quick Deploy

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   ```

4. Or deploy directly:
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Option 2: Deploy via Netlify Dashboard (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [app.netlify.com](https://app.netlify.com) and sign in

3. Click "Add new site" → "Import an existing project"

4. Connect to your Git provider and select your repository

5. Netlify will auto-detect settings from `netlify.toml`:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist/playtogether-app/browser`
   - **Node Version:** 20 (from `.nvmrc`)

6. Click "Deploy site"

### Option 3: Drag & Drop Deploy

1. Build your app locally:
   ```bash
   npm run build
   ```

2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag and drop the `dist/playtogether-app/browser` folder

## Configuration Files

The following files are configured for Netlify:

### `netlify.toml`
- Configures build command and output directory
- Sets up URL redirects for Angular routing (SPA support)
- Adds security headers
- Optimizes caching for static assets

### `.nvmrc`
- Specifies Node.js version 20 for consistent builds

## Build Settings

If configuring manually in Netlify Dashboard:

- **Base directory:** (leave empty)
- **Build command:** `npm run build`
- **Publish directory:** `dist/playtogether-app/browser`
- **Node version:** 20

## Environment Variables

Currently, no environment variables are needed as this is a prototype with mock data.

If you need to add them later:
1. Go to Site Settings → Environment Variables in Netlify Dashboard
2. Or use CLI: `netlify env:set VARIABLE_NAME value`

## Post-Deployment

After deployment, Netlify will provide:
- **Production URL:** `https://your-app-name.netlify.app`
- **Deploy Previews:** For pull requests
- **Branch Deploys:** For different branches
- **Analytics:** View in Netlify Dashboard

## Features Available

- ✅ Automatic HTTPS
- ✅ CDN distribution
- ✅ Continuous deployment from Git
- ✅ Deploy previews for PRs
- ✅ Form handling (if needed later)
- ✅ Serverless functions (if needed later)

## Troubleshooting

### Build fails
- Check Node.js version (should be 20, set in `.nvmrc`)
- Ensure all dependencies are in `package.json`
- Check build logs in Netlify Dashboard
- Try building locally first: `npm run build`

### Routing doesn't work (404 on refresh)
- Verify `netlify.toml` redirects are configured
- Check that the redirect rule sends all routes to `/index.html`

### Styles not loading
- Ensure Tailwind CSS is properly built
- Check `tailwind.config.js` paths
- Verify `styles.css` imports
- Clear Netlify cache and redeploy

### Large build size warning
- This is normal for Angular apps
- Consider enabling asset optimization in Netlify Dashboard

## Local Testing

Test production build locally:
```bash
npm run build
npx serve dist/playtogether-app/browser
```

Or use Netlify Dev for local testing:
```bash
netlify dev
```

## Continuous Deployment

Once connected to Git:
- **Push to main/master:** Auto-deploys to production
- **Push to other branches:** Creates branch deploy
- **Pull Requests:** Creates deploy preview with unique URL

## Custom Domain

To add a custom domain:
1. Go to Site Settings → Domain Management
2. Click "Add custom domain"
3. Follow DNS configuration instructions
4. Netlify provides free SSL certificates

## Performance Tips

1. **Enable Asset Optimization:** Site Settings → Build & Deploy → Post Processing
2. **Enable Netlify Image CDN:** For image optimization
3. **Use Lighthouse:** Check performance scores in Netlify Analytics

## Rollback

To rollback to a previous deploy:
1. Go to Deploys in Netlify Dashboard
2. Find the working deploy
3. Click "Publish deploy"

