# Lal Khobor (লাল খবর)

A modern, fast, and responsive Bengali news portal web application built with Next.js 16, React 19, MongoDB, and Better Auth.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation️ & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Contributions](#contributions)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

---

## About the Project

**Lal Khobor (লাল খবর)** is a dynamic digital newspaper and media platform designed to deliver the latest breaking news, category-based stories, and in-depth articles in Bengali. The platform provides a fast, clean, and accessible reading experience for readers across all devices, complete with modern authentication, article bookmarks, and customized user profiles.

---

## Project Overview

The objective of Lal Khobor is to bridge modern web technologies with traditional journalism, providing users with a seamless, responsive, and interactive experience:

- **Fast Performance:** Server-side and static optimization with Next.js 16 and Turbopack.
- **Engaging UI/UX:** Clean editorial typography, breaking news ticker marquee, and tailored mobile-first layouts.
- **Personalized Reader Experience:** Safe authentication allowing users to bookmark articles for reading later and manage their profiles.

---

## Key Features

- **Live News Marquee:** Real-time scrolling ticker displaying urgent and breaking news headlines.
- **Category Browsing:** Categorized news feeds covering National, Politics, International, Sports, Technology, Entertainment, and more.
- **Detailed Article View:** Rich editorial article reading layout with featured images, dates, and related news.
- **Bookmark System:** Logged-in users can bookmark articles directly from news pages and manage them in their profile with live count badges.
- **Authentication & Security:** Secure login, registration, and social login (Google & GitHub) powered by Better Auth.
- **User Profile Dashboard:** Dedicated user profile page with profile editing and saved bookmarks management.
- **Interactive Feedback:** Clean toast notifications with `react-hot-toast` for real-time user actions.
- **Responsive Design:** Optimized for mobile phones, tablets, and desktop displays with Tailwind CSS and DaisyUI.

---

## Tech Stack

**Frontend:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · DaisyUI · TypeScript  
**Backend:** Next.js API Routes · MongoDB Native Driver · Better Auth  
**Tools & Libraries:** Lucide React · React Hot Toast · React Marquee Text · Vercel · Git

---

## Dependencies

Major libraries and dependencies used in this project:

```json
{
  "next": "16.3.8",
  "react": "19.2.8",
  "react-dom": "19.2.8",
  "better-auth": "^1.7.7",
  "@better-auth/mongo-adapter": "^1.7.7",
  "mongodb": "^7.7.0",
  "react-hot-toast": "^2.6.1",
  "lucide-react": "^1.52.0",
  "react-marquee-text": "^1.0.6",
  "tailwindcss": "^4",
  "daisyui": "^5.7.47",
  "typescript": "^5"
}
```

---

## Installation️ & Setup

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/masudbuilds/lal-khobor.git
cd lal-khobor
npm install
```

2. Set up environment variables by creating a `.env` file in the root directory:

```env
# Authentication
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000

# Database
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/lal_khobor

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Folder Structure

```plaintext
lal-khobor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...all]/   # Better Auth API handler
│   │   │   └── bookmarks/       # Bookmarking API endpoints
│   │   ├── category/[categoryId]/ # Category news feed pages
│   │   ├── news/[newsId]/       # Single news article details
│   │   ├── profile/             # User profile & saved articles
│   │   ├── signin/              # Sign in page
│   │   ├── signup/              # Registration page
│   │   ├── layout.tsx           # Global layout & toast provider
│   │   ├── loading.tsx          # Custom loading animation
│   │   ├── not-found.tsx        # Custom 404 page
│   │   └── page.tsx             # Homepage
│   ├── components/
│   │   ├── cards/               # News display card components
│   │   ├── comon/               # Header, Footer, Navigation, UserInfo
│   │   ├── home/                # Main news & top story widgets
│   │   ├── news/                # Bookmark button & article widgets
│   │   └── others/              # Live coverage & banner notices
│   ├── lib/
│   │   ├── auth.ts              # Server-side Better Auth setup
│   │   ├── auth-client.ts       # Client-side auth helpers
│   │   └── db.ts                # MongoDB connection client
│   ├── types/                   # TypeScript interfaces & types
│   └── utils/                   # Helper functions & API utilities
├── public/                      # Static assets & icons
├── next.config.ts               # Next.js configuration
├── package.json
└── README.md
```

---

## Contributions

| Name       | Role                 | Contributions                                                 |
| ---------- | -------------------- | ------------------------------------------------------------- |
| Masud Rana | Full Stack Developer | Fullstack development, Authentication, Bookmarking, and UI/UX |

---

## How to Contribute

- Fork the Project
- Create a feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Live URL:** [Live Site](https://lal-khobor.vercel.app/)  
**GitHub Repository:** [https://github.com/masudbuilds/lal-khobor](https://github.com/masudbuilds/lal-khobor)
