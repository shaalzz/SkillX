---
description: How to run the SkillX platform (Backend & Frontend)
---

To run the full SkillX platform, you need to start both the Python Flask backend and the React Vite frontend.

### 1. Start the Backend (Flask)
The backend handles the API, database, and AI features.

1. Open a new terminal.
2. Ensure you are in the project root: `C:\Users\USER\Desktop\SkillX\SkillX`.
3. Activate the virtual environment:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
4. Install dependencies (if not already done):
   ```powershell
   pip install -r requirements.txt
   ```
5. Start the server:
   ```powershell
   python run_server.py
   ```
   *The backend will be running at http://localhost:5000*

### 2. Start the Frontend (React)
The frontend provides the modern "Neuro-Cute" user interface.

1. Open a second terminal.
2. Navigate to the `Frontend` directory: `cd Frontend`.
3. Install dependencies (if not already done):
   ```powershell
   npm install
   ```
4. Start the development server:
   ```powershell
   npm run dev
   ```
   *The application will be available at http://localhost:5173*

### 3. Verify Connection
- Once both are running, open your browser to `http://localhost:5173`.
- The frontend will communicate with the backend via the API on port 5000.
