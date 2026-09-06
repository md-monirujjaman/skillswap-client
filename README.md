# 🚀 Skillwrap — Micro-Task Freelance Platform

Skillwrap is a modern, full-stack micro-task marketplace designed to seamlessly connect clients with skilled freelancers. Clients can easily post concise tasks (such as graphic design, content writing, or software fixes), while freelancers can discover opportunities and submit tailored proposals. 

Built with an emphasis on high performance, clean typography, smooth animations, and role-based access, Skillwrap offers a high-precision freelancing experience.

---

## ✨ Key Features

- **🎯 Skillwrap Branded UI/UX**: Designed with custom vector assets, dark/light contrast balance, crisp visual hierarchy, and smooth micro-interactions powered by Tailwind CSS and Framer Motion.
- **👥 Role-Based Workflows**: Dedicated dashboard experiences and workflows customized for **Clients**, **Freelancers**, and **Admins**.
- **📌 Micro-Task Engine**: End-to-end task posting, filtering by category/budget, proposal submission, and status management.
- **🔐 Secure Authentication**: Dual-method authentication with Google OAuth integration and custom cookie-based session persistence.
- **💳 Stripe Payment Integration**: Secure escrow-like payment processing for tasks before kickoff.
- **📱 Fully Responsive**: Pixel-perfect alignment across mobile, tablet, and desktop screens.
- **⚠️ Error Handling & Form Validations**: Real-time visual feedback and defensive error handling across frontend forms and backend API routes.
- **🔄 Persistent State**: Private dashboard routes preserve state during page refreshes.

---

## 🛠️ Tech Stack

### **Frontend**
- **Core**: React, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, Lucide React (Icons), Motion (Framer Motion)
- **Routing & Requests**: React Router DOM, Axios

### **Backend & Database**
- **Runtime & Server**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM

### **Security & Payments**
- Stripe API
- JSON Web Tokens (`jsonwebtoken`)
- Password Hashing (`bcryptjs`)
- `cookie-parser`, `cors`, `dotenv`

---

## ⚙️ Environment Variables

To run Skillwrap locally, configure a `.env.local` file in the root directory with the following keys:

```env
# Client Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Authentication & OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret_key

# Database
MONGODB_URI=your_mongodb_connection_string

# Stripe Payments
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
