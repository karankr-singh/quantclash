const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();

// 🌐 ALLOW ALL ORIGINS FOR DEPLOYMENT
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // In production, you can replace this with your Vercel URL
        methods: ["GET", "POST"]
    }
});

let rooms = {};

// 🧠 THE GENERATOR
const generateQuestion = (mode = "MIXED") => {
    let type = mode;
    if (mode === "MIXED") {
        const types = ["ARITHMETIC", "SEQUENCE", "MAX"];
        type = types[Math.floor(Math.random() * types.length)];
    }

    let text, answer, category;

    if (type === "ARITHMETIC") {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const op = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        text = `${num1} ${op} ${num2}`;
        answer = eval(text).toString();
        category = "🧮 MATH";
    } else if (type === "SEQUENCE") {
        const start = Math.floor(Math.random() * 5) + 1;
        const diff = Math.floor(Math.random() * 4) + 2;
        text = `${start}, ${start + diff}, ${start + diff*2}, ?`;
        answer = (start + diff*3).toString();
        category = "🧩 LOGIC";
    } else {
        const n1 = Math.floor(Math.random() * 100);
        const n2 = Math.floor(Math.random() * 100);
        text = `Max(${n1}, ${n2})`;
        answer = Math.max(n1, n2).toString();
        category = "⚡ QUICK";
    }
    return { text, answer, category };
};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        const room = typeof data === 'string' ? data : data.room;
        const mode = data.mode || "MIXED";

        socket.join(room);
        
        if (!rooms[room]) {
            rooms[room] = { 
                mode: mode,
                currentQuestion: generateQuestion(mode) 
            };
        }
        socket.emit("new_question", rooms[room].currentQuestion);
    });

    socket.on("submit_answer", (data) => {
        const { room, answer } = data;
        const roomData = rooms[room];

        if (roomData && answer === roomData.currentQuestion.answer) {
            // 🎯 Damage set to 10 for ~10 questions per match
            socket.to(room).emit("receive_damage", { damage: 10 });
            
            roomData.currentQuestion = generateQuestion(roomData.mode);
            io.to(room).emit("new_question", roomData.currentQuestion);
        }
    });

    socket.on("game_over_notify", (room) => {
        socket.to(room).emit("you_won");
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// 🚀 DYNAMIC PORT FOR CLOUD PROVIDERS (Render/Heroku/etc)
const PORT = process.env.PORT || 3001;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ SERVER LIVE ON PORT ${PORT}`);
});