const { response } = require("express");
let mongoose = require("mongoose")
let express = require("express");


let url = "mongodb://localhost:27017/tcsmean";
mongoose.pluralize(null);           // to avoid lower case collection creation and adding s.
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))
let db = mongoose.connection;

db.once("open",()=> {

let chatlogSchema = mongoose.Schema({
    msg:String,
    timeSent:String
});

let chatlogModel = mongoose.model("Chatlog",chatlogSchema);


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
        let currentDate = new Date().toLocaleTimeString();
        let chatMsg = {msg:msg, timeSent: currentDate}
        let c1 = new chatlogModel(chatMsg);
        chatlogModel.insertMany(c1,(err,result)=> {
            if(!err){
                console.log(result)
            } else {
                console.log(err);
            }
        })
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
})

