# 🏙️ SynergyHub - Smart City Management System

<div align="center">

**A modern, interactive platform for managing city issues and citizen engagement**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)

</div>

---

## 📖 What is SynergyHub?

SynergyHub is a **Smart City Management System** designed to help citizens report city issues (like garbage problems, broken traffic lights, potholes, water supply issues, etc.) and enable city administrators to efficiently track, manage, and resolve these issues in real-time.

Think of it as a **digital complaint box** combined with a **city dashboard** - all in one beautiful, easy-to-use interface that looks and feels like a computer operating system!

---

## ✨ Key Features

### 🗺️ **Interactive City Map**
- **Real-time visualization** of all reported issues on an interactive map of Lucknow
- **Animated markers** with emoji icons (🗑️ garbage, 🚦 traffic, 🕳️ potholes, 💧 water, ⚡ electricity, 💡 streetlights)
- **Smooth zoom and navigation** - click on any issue marker to zoom in and see details
- **"Next Report" button** - automatically navigate through all issues one by one
- **Custom zoom controls** for easy map navigation

### 🎤 **Voice-Enabled Issue Reporting**
- **Speak your report** - just click the microphone button and describe your issue
- **Automatic transcription** - your voice is converted to text automatically
- **Smart detection** - the system automatically detects:
  - Issue category (garbage, traffic, potholes, water, electricity, streetlights)
  - Priority level (low, medium, high)
  - Title extraction from your description
- **No typing required** - perfect for quick reporting on mobile devices

### 📍 **Smart Location Services**
- **Click on map** to select exact location of the issue
- **"Get My Location" button** - automatically uses your current GPS location
- **Auto-tagging authorities** - the system automatically assigns relevant city authorities based on:
  - Issue category
  - Location in Lucknow
  - Type of problem

### ⚙️ **Admin Dashboard**
- **Comprehensive issue management** - view all reported issues in one place
- **Status tracking** - mark issues as pending, in progress, or resolved
- **Priority management** - assign and update priority levels
- **Authority assignment** - assign issues to specific departments
- **Filtering and search** - easily find specific issues
- **Statistics dashboard** - see overview of all issues by category and status
- **Beautiful loading animations** with status messages

### 🎨 **Modern User Interface**
- **OS-like design** - looks like a computer operating system with:
  - Dock bar at the bottom (like macOS)
  - Draggable and resizable windows
  - Menu bar at the top
- **Smooth animations**:
  - Scroll-triggered 3D container effects
  - Click spark effects on interaction
  - Animated folder component showcasing features
  - Blur text animations
- **Responsive design** - works perfectly on desktop, tablet, and mobile
- **Beautiful backgrounds** - animated grid with color-changing boxes

### 🔄 **Real-time Updates**
- All issues are stored in a cloud database (Supabase)
- Changes appear instantly across all devices
- No page refresh needed

---

## 🛠️ Tech Stack

### **Frontend Technologies**
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Adds type safety to JavaScript for better code quality
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **ShadCN UI** - High-quality, accessible component library
- **Framer Motion** - Powerful animation library for React
- **Leaflet & React-Leaflet** - Interactive maps using OpenStreetMap

### **Backend & Database**
- **Supabase** - Open-source Firebase alternative providing:
  - PostgreSQL database
  - Real-time data synchronization
  - RESTful API
  - Row-level security

### **Development Tools**
- **Vite** - Lightning-fast build tool and development server
- **ESLint** - Code linting for quality assurance
- **PostCSS** - CSS processing tool

### **Additional Libraries**
- **Web Speech API** - Browser-based voice recognition
- **GSAP** - Animation library for advanced effects
- **Lucide React** - Beautiful icon library

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- A **Supabase account** (free tier works) - [Sign up here](https://supabase.com/)

### Installation Steps

#### 1. **Clone the Repository**
```bash
git clone https://github.com/shikhar1809/VIBE_CODING_CONTEST_SRMCEM.git
cd VIBE_CODING_CONTEST_SRMCEM
```

#### 2. **Install Dependencies**
```bash
npm install
```

This will download all the required packages and libraries.

#### 3. **Set Up Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**How to get these values:**
1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project (or use existing one)
3. Go to **Settings** → **API**
4. Copy the **Project URL** → paste as `VITE_SUPABASE_URL`
5. Copy the **anon public** key → paste as `VITE_SUPABASE_ANON_KEY`

#### 4. **Set Up Database**

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the file `src/lib/db-schema.sql` from this project
3. Copy and paste the SQL code into the SQL Editor
4. Click **Run** to create the database table

#### 5. **Start the Development Server**
```bash
npm run dev
```

The app will start at `http://localhost:3669` (or the port shown in terminal)

#### 6. **Open in Browser**

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:3669`)

---

## 📱 How to Use

### **For Citizens - Reporting Issues**

1. **Open the app** in your browser
2. **Scroll down** to see the interactive map
3. **Click on the "Report Issue" icon** in the dock at the bottom
4. **Choose how to report:**
   - **Voice Report**: Click the microphone button, speak your issue, and watch it get typed automatically
   - **Manual Entry**: Fill in the form manually
5. **Select location:**
   - Click "Get My Location" for automatic GPS location
   - OR click "Select Location on Map" and click on the map
6. **Review** the auto-detected category and authorities
7. **Submit** your report

### **For Administrators - Managing Issues**

1. **Click on the "Admin Panel" icon** in the dock
2. **View all issues** in the table
3. **Click on any issue** to see full details
4. **Update status**: Change from "pending" → "in progress" → "resolved"
5. **Assign authorities**: Tag relevant departments
6. **Filter and search** to find specific issues
7. **View statistics** in the Statistics tab

### **Navigating the Map**

- **Click on any marker** (emoji icon) to see issue details and zoom in
- **Use zoom controls** in the bottom-right corner
- **Click "Next Report"** button to cycle through all issues
- **Scroll the page** to see the container zoom in/out with smooth animations

---

## 📁 Project Structure

```
Website/
├── src/
│   ├── components/          # All React components
│   │   ├── admin/          # Admin panel components
│   │   ├── map/            # Map-related components
│   │   ├── os/             # OS-like interface (dock, windows, navbar)
│   │   ├── reporting/      # Issue reporting components
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React Context for state management
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   │   ├── supabase.ts     # Supabase client setup
│   │   ├── db-schema.sql   # Database schema
│   │   └── demo-data.ts    # Sample data for testing
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── .env                    # Environment variables (create this)
├── package.json            # Project dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (usually on port 3669) |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check code for errors and style issues |

---

## 🌐 Deployment

### **Deploy to Vercel (Recommended)**

1. **Push your code to GitHub** (already done if you cloned from GitHub)
2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Add environment variables** (same as `.env` file):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. **Click "Deploy"**

Vercel will automatically:
- Build your app
- Deploy it to a live URL
- Set up automatic deployments on every push to GitHub

### **Other Deployment Options**

- **Netlify**: Similar to Vercel, supports Vite projects
- **GitHub Pages**: For static hosting
- **Any Node.js hosting**: Build with `npm run build` and serve the `dist` folder

---

## 🎨 Design Philosophy

SynergyHub uses a **modern, clean design** with:

- **OS-like Interface**: Familiar desktop environment with dock, windows, and menu bar
- **Smooth Animations**: Every interaction feels polished and responsive
- **Accessibility**: Works on all devices - desktop, tablet, and mobile
- **User-Friendly**: Intuitive interface that anyone can use without training

---

## 🔒 Security & Privacy

- All data is stored securely in Supabase (PostgreSQL database)
- Row-level security policies protect user data
- Environment variables keep sensitive keys safe
- HTTPS encryption for all data transmission

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📝 Issue Categories

The app supports the following issue categories:

- 🗑️ **Garbage/Waste** - Dumping, collection issues
- 🚦 **Traffic Lights** - Malfunctioning signals
- 🕳️ **Roads/Potholes** - Road damage, potholes
- 💧 **Water Supply** - Water issues, leaks
- ⚡ **Electricity** - Power outages, electrical issues
- 💡 **Street Lights** - Broken or non-functional streetlights

---

## 🐛 Troubleshooting

### **App won't start?**
- Make sure Node.js is installed (`node --version`)
- Delete `node_modules` folder and run `npm install` again
- Check if port 3669 is available

### **Map not showing?**
- Check your internet connection (map tiles load from OpenStreetMap)
- Make sure Leaflet CSS is loading (check browser console)

### **Voice recognition not working?**
- Make sure you're using HTTPS (required for Web Speech API)
- Grant microphone permissions when prompted
- Try a different browser (Chrome/Edge work best)

### **Database connection issues?**
- Verify your Supabase URL and key in `.env` file
- Check if the database table was created (run SQL schema)
- Ensure Row Level Security policies are set up

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Development Team** - SynergyHub Project

---

## 🙏 Acknowledgments

- **OpenStreetMap** for map tiles
- **Supabase** for backend infrastructure
- **ShadCN** for beautiful UI components
- **Leaflet** for map functionality
- **Framer Motion** for animations

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Troubleshooting section** above
2. **Open an issue** on GitHub
3. **Check the documentation** in the `SETUP.md` file

---

<div align="center">

**Built with ❤️ for Smart Cities**

⭐ Star this repo if you find it helpful!

</div>
