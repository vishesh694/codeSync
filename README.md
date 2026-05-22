# 🚀 CodeSync

A powerful real-time collaborative code editor built using **React, Socket.IO, Express, and CodeMirror**.

CodeSync allows multiple users to join the same room and collaborate on code instantly.

---

## ✨ Features

- 🔥 Real-time code synchronization
- 👥 Multi-user collaboration
- 🧠 Live room joining system
- 📋 Copy Room ID functionality
- ⚡ Fast UUID-based room creation
- 🎨 Modern responsive UI
- 🌙 Dracula themed editor
- 🟢 Live connected users sidebar
- 🔔 Beautiful toast notifications
- 🔄 Auto sync when new user joins
- 🚪 Leave room functionality
- 📱 Responsive design
- ⚙️ Socket.IO powered realtime communication

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- CodeMirror
- React Hot Toast
- React Avatar
- UUID
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO

---

## 📂 Project Structure

```bash
code-editor/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Client.jsx
│   │   ├── Editor.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── EditorPage.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── socket.js
│   ├── Actions.js
│
├── server.cjs
├── package.json
├── README.md
```


## ⚙️ Installation & Setup

```bash
# Clone Repository
git clone https://github.com/vishesh694/codeSync.git

# Move Into Project Directory
cd codeSync

# Install Dependencies
npm install

# Create Environment File
# Create a .env file in root directory and add:

VITE_BACKEND_URL=http://localhost:8001

# Start Frontend
npm run dev

# Frontend will run on:
# http://localhost:5173

# Open another terminal and start backend
npm run start

# Backend will run on:
# http://localhost:8001
```