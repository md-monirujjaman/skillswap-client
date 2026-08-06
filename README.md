# Skillwrap — Freelance Micro-Task Platform

## Purpose
Skillwrap is an advanced marketplace website where clients can post small, simple tasks (like design projects, writing articles, or technical tasks) and freelancers can apply by submitting proposals. It's a highly polished micro-freelance platform designed with clean typography, smooth animations, elegant custom brand assets, and fully responsive design.

## Live Website Link
The platform is fully deployed and accessible via the live preview URL:
- **Development App**: https://ais-dev-pgnu2vzbj66w3i7wbi7due-166302317612.asia-southeast1.run.app
- **Shared App**: https://ais-pre-pgnu2vzbj66w3i7wbi7due-166302317612.asia-southeast1.run.app

## Key Features
- **Branded Design (Skillwrap)**: Featuring custom-designed vector assets and high-contrast branding applied system-wide.
- **Role-Based Workflows**: Tailored user flows and secure dashboard layouts for Clients, Freelancers, and Admins.
- **Micro-Task Engine**: Clients create, manage, and fund micro-tasks. Freelancers browse, filter, and apply seamlessly.
- **Premium User Interface**: Modern UI/UX crafted with Tailwind CSS utility classes, custom spacing, responsive layout presets, and interactive hover feedback.
- **Secure Authentication**: Cookie-based custom session persistence paired with Google OAuth workflows.
- **Stripe Integration**: Secure payment transactions before project kickoff.
- **Full Responsiveness**: Mobile, tablet, and desktop viewports are perfectly aligned to look stellar on any screen.
- **Error Handling**: Comprehensive form validations and API error messaging preventing silent failures.
- **Persistent State**: Private routes and dashboard pages maintain state on page reloads without breaking logic.

## Environment Variables & Security
- All frontend secret keys are kept safely in the `.env.local` file.
- MongoDB credentials and JWT secret keys are handled securely via backend environment variables.
- Better Auth / Google OAuth keys are mapped inside the environment file for secure local access.

## NPM Packages Used
- **Frontend**: `react`, `react-router-dom`, `tailwindcss`, `lucide-react`, `axios`, `motion`
- **Backend / API**: `express`, `mongoose` (MongoDB)
- **Security & Utilities**: `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `cors`, `dotenv`
- **Others**: `stripe`, `vite`, `esbuild`, `typescript`
