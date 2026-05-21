import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173/"],
  },
});

export function getRecieverSockedId(userId) {
  return onlineSocketMap[userId];
}

// object used to store online users
const onlineSocketMap = {}; //{onlineId: socketId}

io.on("connection", (socket) => {
  console.log("A user is connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) onlineSocketMap[userId] = socket.id;

  socket.on("disconnect", () => {
    console.log("A user is disconnected", socket.id);
    delete onlineSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(onlineSocketMap));
  });
});

export { io, app, server };
