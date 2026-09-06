# ⚔️ QuantClash

> A real-time 1v1 quantitative aptitude battle game built with React, Node.js, Express, and Socket.IO.

QuantClash turns quantitative practice into a competitive multiplayer experience. Players join the same private room, choose a question mode, solve problems in real time, and deal damage to their opponent by answering correctly.

![QuantClash Screenshot](https://github.com/user-attachments/assets/87f03318-a80b-4fd0-9a76-ec6984b7779f)

![QuantClash Gameplay](https://github.com/user-attachments/assets/85e2d216-7d32-4fdf-8ce7-5360e1e99e5e)

## 🚀 Live Demo

- **Frontend:** [QuantClash](https://quantclash-backend.onrender.com)
- **Backend:** [API / Socket.IO server](https://quantclash.vercel.app/)

> Deployment URLs may change as the project evolves.

## ✨ Features

- ⚔️ **Real-time 1v1 battles** using Socket.IO
- 🔐 **Private room codes** for joining the same match
- 🧮 **Multiple question modes:** `MIXED`, `ARITHMETIC`, `SEQUENCE`, and `MAX`
- 🎯 **Server-side question generation** and answer validation
- 💥 **Combat-style scoring** where correct answers deal damage
- 🌙 **Dark/light mode** interface
- 📱 **Responsive UI** designed for desktop and mobile screens
- ⚡ **Instant question synchronization** between connected players

## 🧠 How It Works

```text
Player A ─────┐
              │
              ▼
        Socket.IO Server
              │
       ┌──────┴──────┐
       │             │
   Room State    Question Generator
       │             │
       └──────┬──────┘
              │
              ▼
        New Question
          /       \
         ▼         ▼
     Player A   Player B
         │         │
         └── Answer ──┘
              │
              ▼
       Server Validation
              │
        Correct Answer?
          /        \
        Yes         No
         │           │
         ▼           ▼
   Deal Damage   No Damage
         │
         ▼
   Next Question
```

The backend maintains room state and generates questions. When a player submits an answer, the server validates it against the current room question. A correct answer broadcasts the next question and sends damage to the opponent.

## 🎮 Game Modes

| Mode | Description |
| --- | --- |
| `MIXED` | Randomly selects between arithmetic, sequence, and max-value questions |
| `ARITHMETIC` | Basic addition, subtraction, and multiplication problems |
| `SEQUENCE` | Number-sequence completion problems |
| `MAX` | Determines the larger of two generated numbers |

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Socket.IO Client
- CSS3
- Responsive layout with custom variables and animations

### Backend

- Node.js
- Express
- Socket.IO
- CORS

### Deployment

- Vercel
- Render

## 📂 Project Structure

```text
quantclash/
├── backend/
│   ├── index.js          # Express + Socket.IO server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Game UI and client-side state
│   │   └── App.css       # Interface and theme styling
│   └── package.json
│
└── README.md
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/karankr-singh/quantclash.git
cd quantclash
```

### 2. Start the backend

```bash
cd backend
npm install
node index.js
```

The server listens on the port provided by `PORT`, or `3001` by default.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will display the local frontend URL in the terminal.

## 🔌 Real-Time Events

The current Socket.IO implementation uses a small event-driven protocol:

| Event | Purpose |
| --- | --- |
| `join_room` | Join a room and select a game mode |
| `new_question` | Send the current question to players |
| `submit_answer` | Submit an answer for server-side validation |
| `receive_damage` | Apply damage to the opponent after a correct answer |
| `game_over_notify` | Notify the opponent when a player reaches zero health |
| `you_won` | Signal the winning player |

## 🔒 Design & Engineering Notes

### Server-side validation

Question generation and answer validation happen on the server rather than trusting the browser. This provides a stronger foundation for a competitive multiplayer game because the client does not decide whether an answer is correct.

### Room-based state

Each room stores its selected mode and current question on the server. Connected clients receive updates through Socket.IO rather than repeatedly polling the backend.

### Lightweight architecture

QuantClash deliberately keeps the architecture small: a React client communicates with a Node.js/Socket.IO server that owns the active game state. This makes the project useful as a practical exploration of real-time web communication and multiplayer state synchronization.

## ⚠️ Current Limitations

- Room state is held in server memory and is not persisted.
- There is no user authentication or persistent player identity.
- There is no global matchmaking or leaderboard yet.
- The question pool is procedurally generated and intentionally simple.
- Production deployment should use a restricted CORS origin rather than allowing all origins.
- The current implementation is a prototype rather than a production-scale multiplayer platform.

## 🗺️ Future Improvements

- Persistent user accounts and profiles
- Global leaderboard and match history
- Random matchmaking
- Match timers and countdowns
- More quantitative aptitude categories
- Difficulty levels and adaptive question generation
- Persistent game statistics
- Improved anti-cheat and server-side game-state validation
- Redis-backed room state for multi-instance deployments
- Automated tests and CI

## 💡 What This Project Demonstrates

- Building real-time applications with **WebSockets / Socket.IO**
- Synchronizing state between multiple clients
- Designing an event-driven frontend/backend interaction model
- Implementing server-authoritative game logic
- Building responsive React interfaces
- Deploying a full-stack application across cloud platforms
- Thinking about scalability, persistence, and multiplayer security

## 👨‍💻 Author

**Karan Kumar Singh**

[GitHub](https://github.com/karankr-singh)
