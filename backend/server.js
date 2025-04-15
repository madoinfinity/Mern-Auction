import { Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import mongoose from "mongoose";


config({
  path: "./configuration.env",
});


const server = http.createServer(app);

// Initialize Socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


mongoose.connect("mongodb+srv://madoinfinity12:PIq4I3EbE9M85YJe@cluster0.ir1rxam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  socket.on("myEvent", (myData) => {
    console.log('Received myMessage:', myData);
  });

 
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED:", socket.id);
  });

  
  socket.on("sendMessage", (message) => {
    console.log("Received message:", message);
    socket.broadcast.emit("receiveMessage", message);
  });
});

//listening on port 8000
server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
