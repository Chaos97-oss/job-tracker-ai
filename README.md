# 🧠 Job Tracker AI

A full-stack job application tracker built with **Next.js**, **TypeScript**, and **Tailwind CSS**, featuring AI-powered job description analysis via OpenAI.

![screenshot](./public/screenshot.png)

## ✨ Features

- 📋 Add, edit, and delete job applications
- 📊 Dashboard table view with job statuses
- 🧠 AI Analyzer to summarize job descriptions and extract relevant skills
- 💾 Data stored locally in a `jobs.json` file (no database needed)
- 🔥 Beautiful UI with Tailwind CSS
- ✅ Built with App Router and API routes (Next.js 14+)

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: API Routes (Node.js), local JSON storage
- **AI Integration**: OpenAI GPT-3.5 (via API)
- **Deployment**: Vercel

---

## 📦 Getting Started

```bash
git clone https://github.com/yourusername/job-tracker-ai.git
cd job-tracker-ai

npm install
cp .env.local.example .env.local
# Add your OpenAI API key to .env.local

npm run dev