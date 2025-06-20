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


## 📡 API Routes
The following RESTful API routes are available for interacting with job applications.

🔹 GET /api/jobs
Fetch all job applications.
Response: 200 OK with JSON array of jobs.
🔹 POST /api/jobs
Create a new job application.
Body:
{
  "title": "Backend Engineer",
  "company": "Chaos Inc.",
  "link": "https://example.com/job",
  "status": "Applied"
}
Response: 201 Created with newly created job.
🔹 PUT /api/jobs/:id
Update an existing job by its id.
Body:
{
  "title": "Updated Title",
  "status": "Interviewing"
}
Response: 200 OK with success message.
🔹 DELETE /api/jobs/:id
Delete a job by its id.
Response: 200 OK with confirmation.
🤖 POST /api/analyze
Analyze a job description using AI (OpenAI).
Body:
{
  "description": "We need a backend engineer with Node.js, Docker, and PostgreSQL experience."
}
Response:
{
  "summary": "This role focuses on backend development using modern tech.",
  "skills": ["Node.js", "Docker", "PostgreSQL"]
}