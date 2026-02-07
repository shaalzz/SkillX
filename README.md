# SkillX - Career Intelligence Platform

SkillX is a modernized career intelligence platform designed to help users identify skill gaps, learn from premium curated content, and get AI-powered mentoring. This project has been transitioned from a static HTML base to a high-performance **React + Flask** architecture with a premium **Glassmorphism** design system.

## 🚀 Architecture Overview

The application follows a dual-server architecture with seamless integration:

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) + [Tailwind CSS v4](https://tailwindcss.com/)
  - Located in: `frontend-react/`
  - Theme: Premium Glassmorphism (Official SkillX Teal Branding)
  - Connectivity: Uses a Vite Proxy to communicate with the backend.
- **Backend**: [Python Flask](https://flask.palletsprojects.com/) + [SQLite](https://www.sqlite.org/)
  - Located in: `backend/`
  - Integration: RESTful API with standardized JSON responses.
  - Intelligence: Heuristic-based recommendation engine (`ml.py`) and integrated AI Chatbot.

## 🛠️ Getting Started

To run the full platform, you need to start both the backend and frontend servers.

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- Active Python environment with dependencies (`pip install -r requirements.txt waitress`)

### 2. Start the Backend (Flask)
From the root directory:
```bash
python run_server.py
```
*The API will be available at http://localhost:5000*

### 3. Start the Frontend (React)
From the `frontend-react` directory:
```bash
cd frontend-react
npm install
npm run dev
```
*The application UI will be available at http://localhost:5173*

## ✨ Key Features

- **Intelligence Dashboard**: Real-time stats on credits, learning hours, and skill progress.
- **Skill Gap Analysis**: Visual comparison of current vs. target skills.
- **AI Mentor**: Interactive chatbot for personalized career guidance.
- **Premium Learning**: Integrated video player and course catalog with a secure credit-based access system.
- **Gamification**: Achievement badges (e.g., "Quick Learner", "Skill Pioneer").

## 🎨 Branding & Design System

The platform uses the official SkillX brand palette:
- **Primary**: `#005461` (Dark Teal)
- **Secondary**: `#0c7779` (Teal)
- **Accent**: `#249E94` (Turquoise)
- **Background**: Radial gradients with deep teal depths.

## 📁 Project Structure

```
├── backend/            # Flask application logic & DB access
├── frontend-react/     # Modern React application
│   ├── src/components/ # Reusable UI gems (Card, Button, Glass components)
│   ├── src/pages/      # Application views (Dashboard, Courses, etc.)
│   └── vite.config.js  # Proxy configuration
├── Frontend/           # Legacy static assets (Archive)
├── skillx.db           # SQLite database
└── run_server.py       # Main backend entry point
```

---
*Created with ❤️ by the SkillX Team*
