QuantClash

**QuantClash** is a real-time, 1v1 competitive arena built for practicing quantitative aptitude. Players can join private rooms, choose specific focus areas (Arithmetic, Sequences, Logic), and battle in real-time. Every correct answer deals damage to the opponent!

<img width="1365" height="594" alt="Screenshot 2026-02-22 123622" src="https://github.com/user-attachments/assets/87f03318-a80b-4fd0-9a76-ec6984b7779f" />

<img width="1365" height="589" alt="Screenshot 2026-02-22 123635" src="https://github.com/user-attachments/assets/85e2d216-7d32-4fdf-8ce7-5360e1e99e5e" />


Live Demo
- **Frontend:** https://quantclash-backend.onrender.com
- **Backend:** https://quantclash.vercel.app/

---

✨ Features

- **Real-Time Multiplayer:** Powered by **Socket.io** for instant synchronization between players.
- **Dynamic Game Modes:** Choose from `MIXED`, `ARITHMETIC`, `SEQUENCE`, or `QUICK MAX`.
- **Responsive UI:** Fully optimized for mobile and desktop using **100dvh** and **Glassmorphism** design.
- **Smart Logic:** Server-side question generation to prevent client-side cheating.
- **Dark Mode:** Sleek, high-contrast interface designed for focus.

---

🛠️ Tech Stack

- **Frontend:** React.js, Vite, CSS3 (Custom Variables & Animations)
- **Backend:** Node.js, Express.js
- **Real-Time:** Socket.io
- **Deployment:** Vercel (Frontend), Render (Backend)

---

🏗️ Project Structure

```text
quantclash/
├── backend/          
│   ├── index.js      
│   └── package.json
└── frontend/         
    ├── src/
    │   ├── App.jsx   
    │   └── App.css   
    └── package.json

```
---

Roadmap & Future Improvements

- **MongoDB Integration:** Global leaderboard and user win-streaks.
- **Timer System:** 10-second countdown for increased pressure.
- **Sound Effects:** Audio feedback for hits and victories.
- **Global Matchmaking:** Play against random users online.

