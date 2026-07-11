# HireHeaven: AI-Powered Job Portal

HireHeaven is an advanced, event-driven, microservices-based job portal. It features multi-role accounts (Jobseekers & Recruiters), premium subscriptions with Razorpay, and state-of-the-art AI-powered features such as a Resume Analyzer and Career Advising Guide driven by Google's Gemini API.

---

## 🏗️ System Architecture & Workflow

The project is built on an **Event-Driven Microservices Architecture** to ensure high scalability, reliability, and loose coupling between services.

### 🔄 Project Workflow & Communication
1. **User Authentication & Action**: When a user registers or requests password resets via the **Auth Service**, it publishes a message (e.g., mail payload) to the **Apache Kafka** broker on the `send-mail` topic.
2. **Asynchronous Mail Consumption**: The **Utils Service** runs an active Kafka consumer. It listens to the `send-mail` topic, processes the payload, and sends transactional emails asynchronously using **Nodemailer** without blocking the user response.
3. **Database Layer**: Services persist data independently to **Neon Serverless PostgreSQL** database.
4. **Cache Layer**: The **Auth Service** utilizes **Redis** for quick token blacklisting, caching, or rate limiting.
5. **Storage Flow**: When user updates profiles, resumes (PDFs) or profile pictures are processed by the **User Service**, uploaded to **Cloudinary** via the **Utils Service**'s secure endpoints, and stored safely in the cloud.
6. **Payment & Premium System**: Users buy premium subscription plans, handled by the **Payment Service** integrated with **Razorpay**. Premium users unlock unlimited applications and AI tools.
7. **AI Analysis Flow**:
   - **Resume Analyzer**: Extract features from uploaded PDF resumes, compile and score them, and provide specific improvement points.
   - **Career Guide**: Analyze user skills and offer structured career options, categories of new skills to learn, and action plans.

---

## 🛠️ Tech Stack

### Frontend (Next.js Application)
* **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + React 19 + TypeScript
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
* **Global Notifications**: React Hot Toast
* **HTTP Client**: Axios

### Backend (Microservices)
* **Runtime / Languages**: Node.js, Express, TypeScript (transpiled/run via `ts-node` in development)
* **Message Broker**: [Apache Kafka](https://kafka.apache.org/) (`kafkajs` client)
* **Caching**: [Redis](https://redis.io/)
* **Database**: [Neon Database](https://neon.tech/) (Serverless PostgreSQL)
* **AI Engine**: [Google GenAI SDK](https://ai.google.dev/) (`gemini-2.5-flash` model)
* **File Uploads**: [Cloudinary](https://cloudinary.com/) (image & document processing)
* **Payments**: [Razorpay SDK](https://razorpay.com/)
* **Mailing**: Nodemailer (via SMTP)

---

## 📂 Repository Structure

```
JobPortal/
├── frontend/                     # Next.js App Router UI
│   ├── src/
│   │   ├── app/                  # Routing pages (auth, company, jobs, subscribe, payment)
│   │   ├── components/           # UI Elements (resume-analyzer, career-guide, job-card, etc.)
│   │   ├── context/              # AppContext managing user session, state & service endpoints
│   │   └── lib/                  # Helper utilities
│   ├── package.json
│   └── tailwind.config.ts
│
└── services/                     # Microservices Folder
    ├── auth/                     # Auth Service (Port 4000) - JWT, Signin, Signup, Kafka Producer
    ├── user/                     # User Service (Port 5002) - User Profile and Resume uploads
    ├── jobs/                     # Jobs Service (Port 5003) - Job Listings, Posting, and Applying
    ├── payment/                  # Payment Service (Port 5001) - Razorpay Subscriptions
    └── utils/                    # Utils Service (Port 5001) - Gemini AI API, Cloudinary uploads, Kafka Mail Consumer
```

---

## 💾 Database Schema (PostgreSQL)

The microservices initialize and sync PostgreSQL schemas on start. For example, the **Auth Service** sets up:

### `users` Table
```sql
CREATE TYPE user_role AS ENUM ('jobseeker', 'recruiter');

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    role user_role NOT NULL,
    bio TEXT,
    resume VARCHAR(255),
    resume_public_id VARCHAR(255),
    profile_pic VARCHAR(255),
    profile_pic_public_id VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subscription TIMESTAMPTZ
);
```

### `skills` & `user_skills` Tables (Many-to-Many Relationship)
```sql
CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE user_skills (
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    skill_id INTEGER NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, skill_id)
);
```

---

## ⚙️ Setting Up Environment Variables

Each sub-project contains its own `.env` file configuration. Create those with the following templates:

### 🖥️ Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_AUTH_SERVICE=http://localhost:4000
NEXT_PUBLIC_USER_SERVICE=http://localhost:5002
NEXT_PUBLIC_JOB_SERVICE=http://localhost:5003
NEXT_PUBLIC_PAYMENT_SERVICE=http://localhost:5001
NEXT_PUBLIC_UTILS_SERVICE=http://localhost:5001
```

### 🔐 Auth Service (`services/auth/.env`)
```env
PORT=4000
DATABASE_URL=your_postgres_neon_connection_string
REDIS_URL=your_redis_connection_string
JWT_SECRET=your_jwt_signing_key
KAFKA_BROKER=localhost:9092
```

### 👤 User Service (`services/user/.env`)
```env
PORT=5002
DATABASE_URL=your_postgres_neon_connection_string
JWT_SECRET=your_jwt_signing_key
```

### 💼 Jobs Service (`services/jobs/.env`)
```env
PORT=5003
DATABASE_URL=your_postgres_neon_connection_string
JWT_SECRET=your_jwt_signing_key
```

### 💳 Payment Service (`services/payment/.env`)
```env
PORT=5001
DATABASE_URL=your_postgres_neon_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_signing_key
```

### 🛠️ Utils Service (`services/utils/.env`)
```env
PORT=5001
DATABASE_URL=your_postgres_neon_connection_string
API_KEY_GEMINI=your_google_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Kafka_Broker=localhost:9092
EMAIL=your_smtp_email_address
EMAIL_PASS=your_smtp_app_password
```

---

## 🚀 Running the Project Locally

### Prerequisites
* **Node.js** (v18+)
* **Docker** (recommended to run Apache Kafka and Redis locally)
* **PostgreSQL / Neon Account**

### Step 1: Start Infrastructure (Kafka & Redis)
Using Docker is the simplest way to run Redis and Kafka brokers locally. Run:
```bash
# Start Redis
docker run -d --name jobportal-redis -p 6379:6379 redis

# Start Kafka (e.g., using fast-data-dev or standard confluentinc images)
# Verify a broker is running on localhost:9092
```

### Step 2: Set Up and Start Backend Services
For each directory in `services/` (`auth`, `user`, `jobs`, `payment`, `utils`):
1. Navigate into the folder:
   ```bash
   cd services/<service-name>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start in development mode:
   ```bash
   npm run dev
   ```

### Step 3: Set Up and Start Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Next.js development server:
   ```bash
   npm run dev
   ```
4. Access the web app at [http://localhost:3000](http://localhost:3000).

---

## 🔗 REST API Endpoints Summary

### Auth Service (`:4000`)
* `POST /api/auth/signup` - Register a new user
* `POST /api/auth/login` - Authenticate user and issue JWT
* `POST /api/auth/forgot-password` - Request a password reset link (triggers email via Kafka)

### User Service (`:5002`)
* `GET /api/user/me` - Get profile of authenticated user
* `PUT /api/user/update/profile` - Update user bio, name, and phone
* `PUT /api/user/update/resume` - Upload/update user resume (PDF)
* `PUT /api/user/update/pic` - Upload/update user profile photo

### Jobs Service (`:5003`)
* `POST /api/jobs/create` - Post a new job (Recruiter)
* `GET /api/jobs/all` - List all job postings
* `POST /api/jobs/apply/:jobId` - Apply to a specific job listing
* `GET /api/jobs/applicants/:jobId` - Get list of job seekers who applied (Recruiter)

### Utils Service (`:5001`)
* `POST /api/career` - Suggest career options and learning approaches based on a list of skills (Google Gemini API)
* `POST /api/resume-analyser` - Score and analyze an uploaded resume PDF using Google Gemini API
* `POST /api/upload` - Securely upload documents or images to Cloudinary
