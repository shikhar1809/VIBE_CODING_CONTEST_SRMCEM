# Troubleshooting Guide

## Server Won't Start

### Step 1: Verify Dependencies
```bash
npm install
```

### Step 2: Check for Errors
Run the dev server and look for error messages:
```bash
npm run dev
```

### Step 3: Common Issues

#### Port Already in Use
If port 5173 is busy, Vite will try the next available port. Check the terminal output for the actual URL.

#### Missing Dependencies
If you see module not found errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
Check for TypeScript compilation errors:
```bash
npx tsc --noEmit
```

#### Windows-Specific Issues
Try using the batch file:
```bash
start-dev.bat
```

### Step 4: Manual Server Start
If automatic start doesn't work:

1. Open a terminal in the project directory
2. Run: `npm run dev`
3. Look for output like:
   ```
   VITE v5.x.x  ready in xxx ms
   
   ➜  Local:   http://localhost:5173/
   ```
4. Open that URL in your browser

### Step 5: Check Browser Console
If the page loads but shows errors, check the browser's developer console (F12) for errors.

### Step 6: Verify Environment Variables
Make sure `.env` file exists with:
```
VITE_SUPABASE_URL=https://liytxstvvyevnifjbnyj.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

## Still Having Issues?

1. Check Node.js version (should be 18+): `node --version`
2. Check npm version: `npm --version`
3. Try clearing cache: `npm cache clean --force`
4. Reinstall dependencies: `rm -rf node_modules && npm install`


