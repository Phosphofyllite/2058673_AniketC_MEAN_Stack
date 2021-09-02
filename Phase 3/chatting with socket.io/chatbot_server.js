const { response } = require("express");
let express = require("express");

let app = express();

let http = require("http").Server(app);



let  io = require('socket.io')(http);


app.get("/", (req,res)=> {
    res.sendFile(__dirname+"\\chatbot_page.html");
})



io.on("connection", (socket)=> {
    console.log("Client connected");

    //receive message from client application (browser)
    socket.on("obj", msg=> {
        io.emit("obj", msg);
        console.log("Client says: " + msg);
        
    })

    //server sending data to client
    socket.on("obj2", msg=> {
    if (msg.toLowerCase().includes("help")){
        socket.emit("obj2", "How can I help?");
    }
    else if (msg.toLowerCase().includes("hello")){
        socket.emit("obj2", "Hello!");
    }

    

    else {
    let randomMsg = ["Hi how are you?", "How's the weather?", "That makes sense to me.", "It's time to get to work.", "I'm a robot", "Self-destructing in 5 seconds..."]
    let randomNumber = Math.floor(Math.random()*randomMsg.length);
    socket.emit("obj2", randomMsg[randomNumber]);
    console.log("Server says: " +randomMsg[randomNumber])
    }
    })
    

    

})

http.listen(9090, ()=> console.log("server running on port 9090"));