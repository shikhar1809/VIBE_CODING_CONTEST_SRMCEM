# SynergyHub - Setup Guide

## Database Setup

### 1. Create the Issues Table in Supabase

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL from `src/lib/db-schema.sql`:

```sql
-- Copy and paste the contents of src/lib/db-schema.sql
```

### 2. Seed Demo Data

The app will automatically seed demo data on first load. If you need to manually seed:

1. The `seedDemoData()` function is called automatically in `App.tsx`
2. Demo data includes 15 sample issues across all categories in Lucknow

### 3. Verify Setup

1. Start the dev server: `npm run dev`
2. Open the app at `http://localhost:3669`
3. Click "Admin Panel" in the dock to view issues
4. Click "Report Issue" to create a new issue

## Features

- **Map View**: Interactive map of Lucknow with issue markers
- **Issue Reporting**: Citizens can report issues with category, location, and description
- **Admin Panel**: View, filter, and manage all reported issues
- **Real-time Updates**: Issues are stored in Supabase and update in real-time

## Neo-Brutalism Design

The app uses a neo-brutalism design theme:
- Thick black borders (3-4px) on all elements
- Bright, saturated colors
- Bold typography
- Flat design (no shadows, gradients, or glassmorphism)
- Sharp corners (minimal border-radius)

## App Structure

- **MenuBar**: Top bar with app name and time
- **Desktop**: Main area with map background
- **Dock**: Bottom dock with app icons (Admin Panel, Report Issue, Settings)
- **Windows**: Draggable, resizable windows for each app

