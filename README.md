# NatureStay Homestay Booking App

A complete, modern, production-ready homestay booking web application built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**.

## 🚀 Key Features

- **Mobile-First Design:** Fully responsive UI with a premium "Forest Green" aesthetic.
- **WhatsApp-Based Booking:** Frictionless booking flow generating pre-formatted WhatsApp messages.
- **AI Chat Assistant:** Multi-language AI support (English, Hindi, Bengali, Nepali) with fallback logic.
- **Admin Dashboard:** Secure management of property availability and bookings.
- **Availability Calendar:** Dynamic calendar with color indicators for booked/available dates.
- **Optimized Performance:** Next.js Image components, lazy loading, and priority LCP optimization.

## 🛠️ Technical Stack

- **Framework:** Next.js 15.1.0 (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Animations:** Framer Motion
- **Auth:** JWT Session Cookies (jose)
- **State Management:** React Hooks + Server Actions (simulated)

## ⚠️ Current Limitations (MVP / Demo Mode)

This project is currently configured in **Demo Mode** for immediate deployment and testing:

1.  **Mock Availability:** Availability data is currently stored in-memory. **Important:** Changes made in the Admin Panel will reset when the server restarts or in serverless environments like Vercel.
2.  **No Payment Gateway:** Bookings are processed via WhatsApp to maximize conversion and build trust.
3.  **Local State:** AI chat uses mock responses if an OpenAI API key is not provided.

## 🚢 Production Setup Checklist

To move from Demo to full Production:

### 1. Persistence (Supabase)
- Set up a [Supabase](https://supabase.com/) project.
- Create `stays`, `experiences`, and `availability` tables.
- Add your credentials to `.env.local`:
  ```bash
  NEXT_PUBLIC_SUPABASE_URL=your_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
  ```

### 2. AI Integration (OpenAI)
- Obtain an OpenAI API key.
- Add it to your environment variables:
  ```bash
  OPENAI_API_KEY=your_openai_key
  ```

### 3. Admin Security
- Configure unique admin credentials:
  ```bash
  ADMIN_USERNAME=your_admin
  ADMIN_PASSWORD=your_password
  JWT_SECRET=your_random_string
  ```

## 💻 Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000)

**Admin Credentials:** `admin` / `nature123`

## 📦 Deployment on Vercel

The easiest way to deploy is using the Vercel Platform:

1. Push your code to GitHub.
2. Import the project in Vercel.
3. Add the environment variables from the checklist above.
4. Deploy!

---
Developed as a Senior Full-Stack Web App. Focus on clean code and scalable architecture.
