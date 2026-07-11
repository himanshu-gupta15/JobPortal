# HireHeaven Frontend - Next.js Web App

This is the Next.js frontend application for the **HireHeaven AI-Powered Job Portal**. It is built using the App Router, styled with Tailwind CSS v4, and integrates with multiple backend microservices to deliver a responsive, feature-rich user experience.

---

## 🎨 Design & Features

* **AI Tools**:
  * **Resume Analyzer**: Upload PDF resumes, score them against industry standards, and get actionable improvement recommendations.
  * **Career Advisor**: Input skills to retrieve customized job suggestions, skill gaps to bridge, and targeted learning resources.
* **Core Job Portal Flows**:
  * User authentication (Jobseekers & Recruiters)
  * Rich profile management (resume uploads, details edit, profile picture changes)
  * Dynamic job search, job details, and job application flows
  * Recruiter controls for posting new roles and screening applicants
* **Subscriptions & Billing**:
  * Native integration with Razorpay Checkout for purchasing premium plans, unlocking enhanced AI credits and job application limits.
* **Modern Interface**:
  * Dark & Light mode support powered by `next-themes`.
  * Premium, animated visual layout styled with Tailwind CSS v4 and Framer Motion / CSS Transitions.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + React 19
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 + Radix UI Primitives
* **Icons**: Lucide React
* **Theme Management**: `next-themes`
* **HTTP requests**: Axios
* **Session Management**: Cookie-based authentication (`js-cookie`)
* **State Management**: `AppContext.tsx` providing authentication state, user metadata, and unified service client calls.

---

## 📂 Directory Organization

```
frontend/
├── public/               # Static assets & icons
├── src/
│   ├── app/              # Next.js App Router Page Layouts
│   │   ├── (auth)/       # Authentication pages (login, signup, password resets)
│   │   ├── about/        # Static About Page
│   │   ├── account/      # Jobseeker Profile details & Resume management
│   │   ├── company/      # Recruiter Dashboard & Job Creation
│   │   ├── jobs/         # Job listings, job details page, search flow
│   │   ├── payment/      # Razorpay payment gateways
│   │   └── subscribe/    # Premium Subscription plans showcase
│   ├── components/       # Custom React Elements
│   │   ├── ui/           # Shared Shadcn UI primitives (button, dialog, input, etc.)
│   │   ├── hero.tsx      # Landing Hero Section
│   │   ├── navbar.tsx    # Navigation bar with role-based links & theme toggle
│   │   ├── resume-analyzer.tsx # Interface for uploading resume PDFs to Google Gemini API
│   │   └── carrer-guide.tsx    # AI Career roadmap generator
│   ├── context/
│   │   └── AppContext.tsx # Context provider containing user states and API URL variables
│   └── type.ts           # Shared TypeScript interfaces (User, Job, Application, etc.)
```

---

## ⚙️ Development Setup

### 1. Configure Environments
Create a file named `.env.local` in the root of the `frontend` folder:

```env
NEXT_PUBLIC_AUTH_SERVICE=http://localhost:4000
NEXT_PUBLIC_USER_SERVICE=http://localhost:5002
NEXT_PUBLIC_JOB_SERVICE=http://localhost:5003
NEXT_PUBLIC_PAYMENT_SERVICE=http://localhost:5001
NEXT_PUBLIC_UTILS_SERVICE=http://localhost:5001
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the web app.

---

## 🔗 Root Documentation
For information on the complete microservices architecture, backend APIs, Apache Kafka setup, and database schemas, check the master [README.md](../README.md) in the parent directory.
