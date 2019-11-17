const express= require ("express");
const path = require ("path");
const cors = require ("cors");
const mongoose= require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const routes = require("./routes");

const app= express();
const server = http.Server(app);
const io = socketio(server);

mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb+srv://user:qwer1245@cluster0-x73mg.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true });

const connectedUsers = {};

io.on("connection" , socket =>{
	const { user_id } = socket.handshake.query;
	
	connectedUsers[user_id] = socket.id;
	
});

app.use((req, res, next)=>{
	req.io = io;
	req.connectedUsers = connectedUsers;
	
	return next();
});

app.use ( cors () );
app.use( express.json() );
app.use("/files", express.static(path.resolve (__dirname, ".." , "uploads")) );
app.use(routes);

server.listen(3001);