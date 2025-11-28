# Website

A modern website built with React, TypeScript, Tailwind CSS, ShadCN UI, and Supabase.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Supabase
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Supabase project URL and anon key:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # React components
│   └── ui/        # ShadCN UI components
├── lib/           # Utility functions and configurations
│   ├── supabase.ts  # Supabase client
│   └── utils.ts     # Utility functions
├── App.tsx        # Main app component
├── main.tsx      # Entry point
└── index.css     # Global styles with Tailwind
```

## Adding ShadCN Components

To add more ShadCN UI components, you can use the CLI or manually add them from the [ShadCN UI documentation](https://ui.shadcn.com/).

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Add them to your `.env` file
4. Start building your database schema and features!

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT

