// load the module 

let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");

//MONGOOSE STUFF****************
let url = "mongodb://localhost:27017/tcsmean";
mongoose.pluralize(null);           // to avoid lower case collection creation and adding s.

// connect the database it return promise object 
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

//to use this db connection we have to call function 
let db = mongoose.connection;   
//MONGOOSE STUFF****************

db.once("open",()=> {
    // We have to defined schema which provide the structure for collection 
    let courseSchema = mongoose.Schema({
        _id:Number,
        //courseid:Number,
        coursename:String,
        description:String,
        amount:Number
    });

    // using schema we have to create the model 
    //1st parameter collection name and 2nd parameter schema reference
    // mongoose intenrally create collection name in lower case 
    // with post fix s.
    let courseModel = mongoose.model("Courses",courseSchema);




//creating the reference of express module 
let app = express();
// which is use to enable post data receving from normal html form. 
app.use(bodyParser.urlencoded({extended:true}))



app.get("/",(request,response)=> {
    response.sendFile(__dirname+"\\index.html");
})

app.get("/index",(request,response)=> {
    
    response.sendFile(__dirname+"\\index.html");
})

app.get("/login",(request,response)=> {
    response.sendFile(__dirname+"\\login.html");
})

app.get("/checkUser",(request,response)=> {
    
    let user = request.query["user"];
    let pass = request.query["pass"];
    let found = userDetails.find(u=>u.uname==user && u.pname==pass);
    if(found != undefined){
            response.send("Successfully Login!");
    }else {
            response.send("Failure try once again!");
    }
})

app.get("/insertPage",(request,response)=> {
    response.sendFile(__dirname+"\\insert.html");
})

//http://localhost:9090/index
app.post("/insert",(request,response)=>{ 
    
    let courseDetail = request.body;      // json data from body. 
    let c1 = new courseModel(courseDetail);
    response.sendFile(__dirname+"\\insert.html");
    courseModel.insertMany(c1,(err,result)=> {
        if(!err){
            console.log(result)
        } else {
            console.log(err);
        }
         
            
})

});


app.get("/updatePage",(request,response)=> {
    response.sendFile(__dirname+"\\update.html");
})

//http://localhost:9090/index
app.post("/update",(request,response)=>{ 
    
    
    let id = request.body._id;
    let amount = request.body.amount;
    response.sendFile(__dirname+"\\update.html");
    courseModel.updateOne({_id:id},{$set:{amount}},(err,result)=> {
        if(!err){
            console.log(result)
            if(result.modifiedCount>0 || result.matchedCount>0){
                    console.log("Course updated successfully")
            }else {
                    console.log("Course didn't update");
            }
        }else {
            console.log(err);
        }
        
    })

});


app.get("/deletePage",(request,response)=> {
    response.sendFile(__dirname+"\\delete.html");
})

//http://localhost:9090/index
app.post("/delete",(request,response)=>{ 
    
    
    let id = request.body._id;
    response.sendFile(__dirname+"\\delete.html");
    courseModel.deleteMany({_id:{$eq:id}},(err,result)=> {
        if(!err){
                if(result.deletedCount>0){
                        console.log("Record deleted successfully");
                }else {
                        console.log("Record not present");
                }
        }else {
                console.log(err)
        }
        
    })

});



app.get("/fetchPage",(request,response)=> {
    response.sendFile(__dirname+"\\fetch.html");
})

//http://localhost:9090/index
app.get("/fetch",(request,response)=> {
    
    var tableContent = "";
    var startTable = "<table border = 1><tr><th>Course ID</th><th>Course Name</th><th>Description</th><th>Amount</th></tr>";
    var endTable = "</table>"
    var endFetchPage = `</body></html>`
    courseModel.find({},(err,doc)=> {
        if(!err){
                doc.forEach(rec=> {
                    tableContent += "<tr><td>" + rec._id + "</td><td>"  + rec.coursename + "</td><td>"  + rec.description + "</td><td>" + rec.amount + "</td></tr>";
                    
                })
                response.write(startTable+tableContent+endTable)
                response.end()
                
        }else {
            console.log(err);
        }
        
    })
})

app.listen(9090,()=>console.log("Server running on port number 9090"))
})