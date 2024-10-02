import { createServer } from "http";
import express, { Application } from "express";
const app: Application = express();
import { Server as IOServer, Socket } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
const server = createServer(app);
const io = new IOServer(server, {
  cors: {
    origin: [String(process.env.CLIENT_URL)],
    methods: ["GET", "POST","PATCH","DELETE","PUT"],
    credentials: true,
  },
});
const userSocketMap: { [key: string]: string } = {};
export const getSocketId = (userId: string): string | undefined => {
  return userSocketMap[userId];
};
io.on("connection", (socket: Socket) => {
  
  const userId: string = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
    //last seen setting here
  } else {
    console.warn("User ID is missing in handshake query");
  }
  //.emit will send a even .on will listen a event

  socket.on("disconnect", () => {
    console.warn("User is disconnectd", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
