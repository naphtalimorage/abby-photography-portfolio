# Ryan Portfolio Application

A professional photographer's portfolio website built with React, TypeScript, and modern web technologies. Features a public-facing portfolio site and an admin dashboard for content management.

## Features

### Public Site
- **Home Page**: Hero carousel with auto-play, video reels section, portfolio gallery preview, about section, services, FAQ, and contact form
- **Portfolio Page**: Full gallery with category filtering and premium lightbox with zoom, navigation, and info panel
- **Safari/Tours Page**: Hero section, seasonal perspectives, signature expeditions, and inquiry form
- **About Page**: Hero, biography, animated stats, services, journey timeline, philosophy, and testimonials

### Admin Dashboard
- **Media Library**: Photo upload, grid view, drag-drop reordering, edit metadata, delete functionality
- **Services**: Manage service offerings with add/edit/delete capabilities
- **Reels**: Video reel management with upload and metadata editing
- **Settings**: Studio profile, platform integrations, notification preferences, and security settings

### Core Features
- **Theme System**: Light/dark/system modes with custom Savanna color palette
- **Authentication**: Supabase-based auth with protected admin routes
- **Responsive Design**: Mobile-first approach with bottom navigation on mobile
- **Animations**: Framer Motion for smooth transitions and scroll animations
- **Accessibility**: Keyboard navigation, ARIA labels, and semantic HTML

## Technology Stack

- **Framework**: React 19.2.8, TypeScript 6.0.2, Vite 8.3.0
- **Routing**: React Router DOM 7.18.4
- **Styling**: Tailwind CSS 4.3.3, shadcn/ui components
- **Animations**: Framer Motion 13.4.0
- **Backend**: Supabase 2.116.0 (auth, database, storage)
- **Data Fetching**: @tanstack/react-query 5.103.1
- **State Management**: Zustand 5.0.15
- **Theme**: next-themes 0.4.6
- **UI Components**: Radix UI primitives
- **Icons**: lucide-react 1.47.0, react-icons 5.7.0
- **Forms**: react-hook-form 7.88.0, zod 4.6.5
- **Notifications**: sonner 2.0.8

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
\\\ash
npm install
\\\

3. Set up environment variables:
\\\ash
cp .env.example .env
\\\

4. Configure your Supabase project:
   - Create a Supabase project at https://supabase.com
   - Add your \VITE_SUPABASE_URL\ and \VITE_SUPABASE_ANON_KEY\ to \.env\

5. Run the development server:
\\\ash
npm run dev
\\\

6. Build for production:
\\\ash
npm run build
\\\

7. Preview production build:
\\\ash
npm run preview
\\\

## Project Structure

\\\
src/
+-- App.tsx                    # Main app with routes and providers
+-- main.tsx                   # Entry point
+-- index.css                  # Global styles and theme definitions
+-- assets/                    # Static assets
+-- components/
¦   +-- common/               # Shared components
¦   +-- home/                 # Home page specific components
¦   +-- adminpage/            # Admin dashboard tabs
¦   +-- dialogs/              # Modal dialogs
¦   +-- ui/                   # shadcn/ui components
+-- context/                  # React contexts (theme)
+-- hooks/                    # Custom React hooks
+-- integration/              # External service integrations
¦   +-- supabase/
¦       +-- Client.ts        # Supabase client configuration
+-- lib/                      # Utility functions
+-- pages/                    # Page components
¦   +-- Index.tsx            # Layout wrapper
¦   +-- Home.tsx             # Home page
¦   +-- Portfolio.tsx        # Portfolio page
¦   +-- Safari.tsx           # Safari/tours page
¦   +-- About.tsx            # About page
¦   +-- NotFound.tsx         # 404 page
¦   +-- admin/
¦       +-- Login.tsx        # Admin login
¦       +-- Admin.tsx        # Admin dashboard
+-- store/                    # Zustand stores
\\\

## Environment Variables

\\\env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
\\\

## Database Schema

### photos Table
- \id\: uuid (primary key)
- \	itle\: text
- \category\: text
- \location\: text
- \camera_specs\: text
- \image_url\: text
- \storage_path\: text
- \sort_order\: integer
- \created_at\: timestamp
- \updated_at\: timestamp

### video_reels Table
- \id\: uuid (primary key)
- \	itle\: text
- \description\: text
- \ideo_url\: text
- \	humbnail_url\: text
- \storage_path\: text
- \duration\: integer
- \sort_order\: integer
- \created_at\: timestamp

### studio_profiles Table
- \id\: uuid (primary key)
- \user_id\: uuid (foreign key)
- \studio_name\: text
- \lead_photographer\: text
- \io\: text
- \logo_url\: text
- \email\: text
- \phone\: text
- \website\: text
- \location\: text
- \created_at\: timestamp
- \updated_at\: timestamp

## Deployment

### Vercel
The project includes \ercel.json\ for optimized deployment to Vercel.

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
\\\ash
npm run build
# Upload the dist/ folder to your hosting provider
\\\

## Scripts

- \
pm run dev\ - Start development server
- \
pm run build\ - Build for production
- \
pm run preview\ - Preview production build
- \
pm run lint\ - Run linter

## License

This project is private and proprietary.

## Support

For support, contact contact@ryanwild.com
