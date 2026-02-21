import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
const socket = io.connect("https://quantclash-backend.onrender.com");

function App() {
  const [view, setView] = useState("landing");
  const [room, setRoom] = useState("");
  const [health, setHealth] = useState(100);
  const [question, setQuestion] = useState("Loading..."); // Fix: Set default loading text
  const [category, setCategory] = useState("...");
  const [myAnswer, setMyAnswer] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedMode, setSelectedMode] = useState("MIXED");

  const categories = ["MIXED", "ARITHMETIC", "SEQUENCE", "MAX"];

  const handleStartGame = () => {
    if (room.trim() !== "") {
      socket.emit("join_room", { room, mode: selectedMode });
      setView("battle");
    }
  };

  const submitAnswer = () => {
    if (!myAnswer) return;
    socket.emit("submit_answer", { answer: myAnswer, room });
    setMyAnswer("");
  };

  useEffect(() => {
    socket.on("new_question", (data) => {
      setQuestion(data.text);
      setCategory(data.category);
    });

    socket.on("receive_damage", (data) => {
  // Uses the 10 damage from the server, defaults to 10 if something is wrong
  const damageAmount = data.damage || 10;
  setHealth((prev) => Math.max(0, prev - damageAmount));
  
  // Visual feedback
  setIsHit(true);
  setTimeout(() => setIsHit(false), 400);
});
    socket.on("you_won", () => {
      alert("🏆 VICTORY!");
      window.location.reload();
    });

    if (health <= 0 && view === "battle") {
      socket.emit("game_over_notify", room);
    }
  }, [health, view, room]);

  return (
    <div className="app-wrapper" data-theme={darkMode ? "dark" : "light"}>
      {view === "landing" ? (
        <div className="landing-card">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          
          <h1 style={{fontSize: '2.5rem', marginBottom: '5px'}}>QuantClash</h1>
          <p style={{color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '0.9rem'}}>Select your focus area</p>
          
          <div className="category-list">
            {categories.map(cat => (
              <div 
                key={cat} 
                className={`category-pill ${selectedMode === cat ? 'active' : ''}`}
                onClick={() => setSelectedMode(cat)}
              >
                {cat}
              </div>
            ))}
          </div>

          <input type="text" placeholder="ENTER ROOM CODE" value={room} onChange={(e) => setRoom(e.target.value.toUpperCase())} />
          <button className="action-btn" onClick={handleStartGame}>INITIATE DUEL</button>
        </div>
      ) : (
        <div className="game-card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span style={{fontWeight: '800', letterSpacing: '1px'}}>{room}</span>
            <span style={{fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold'}}>{selectedMode} MODE</span>
          </div>
          
          <div className="hp-track"><div className="hp-fill" style={{ width: `${health}%` }}></div></div>
          
          <div style={{margin: '40px 0'}}>
            <span style={{color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px'}}>{category}</span>
            <h2 style={{ fontSize: "3rem", margin: "10px 0", letterSpacing: '-1px' }}>{question}</h2>
          </div>

          <input type="number" placeholder="?" value={myAnswer} onChange={(e) => setMyAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submitAnswer()} autoFocus />
          <button className="action-btn" onClick={submitAnswer}>SEND ATTACK</button>
        </div>
      )}
    </div>
  );
}

export default App;