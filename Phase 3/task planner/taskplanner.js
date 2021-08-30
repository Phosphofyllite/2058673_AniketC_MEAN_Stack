let fs = require("fs");
let http = require("http");
let url = require("url");


let indexPage = `
            <html>
                    <head>

                    </head>
                    <body>
                    <h2>Welcome to Task Planner</h2>
                    <a href="addTaskPage">Add Task Page </a> |
                    <a href="deleteTaskPage">Delete Task Page </a> |
                    <a href="listAllTasksPage">List of All Tasks Page </a> 
                    </body>
            </html>
`


let addTaskPage=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task</title>
</head>
<body>
    <h2>Add Task</h2>
    <form action="addTask">
        <label>Emp ID</label>
        <input type="text" name="empid" required/><br/>
        <label>Task ID</label>
        <input type="text" name="taskid" required/><br/>
        <label>Task Name</label>
        <input type="text" name="taskname"required/><br/>
        <label>Deadline</label>
        <input type="date" name="deadline"required/><br/>
        <input type="submit" value="submit"/>
       <input type="reset" value="reset"/> 
    </form>
    <a href="addTaskPage">Add Task Page </a> |
    <a href="deleteTaskPage">Delete Task Page </a> |
    <a href="listAllTasksPage">List of All Tasks Page </a> 
</body>
</html>
`

let deleteTaskPage=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delete Task</title>
</head>
<body>
    <h2>Delete Task</h2>
    <form action="deleteTask">
        <label>Task ID</label>
        <input type="text" name="taskid" required/><br/>
        <input type="submit" value="submit"/>
       <input type="reset" value="reset"/> 
    </form>
    <a href="addTaskPage">Add Task Page </a> |
    <a href="deleteTaskPage">Delete Task Page </a> |
    <a href="listAllTasksPage">List of All Tasks Page </a> 
</body>
</html>
`

let listAllTasksPage=`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>List of All Tasks</title>
</head>
<body>
    <h2>List of All Tasks</h2>
    
    
`


let server = http.createServer((request,response)=> {
    let urlInfo = url.parse(request.url,true);
    if(urlInfo.path != "/favicon.ico"){
         if(urlInfo.path =="/addTaskPage"){
                response.write(addTaskPage);
        }else if(urlInfo.pathname == "/addTask"){
                
                let newTask = urlInfo.query;
                let tasks = JSON.parse(fs.readFileSync("tasks.json").toString());
                let result = tasks.find(t=>t.tid == newTask.taskid);
                //console.log(result)
                // 200 -success code , content type in header text/html
                response.writeHead(200,{"content-type":"text/html"});
                if (result == undefined){
                let empid = newTask.empid;
                let taskid = newTask.taskid;
                let taskname = newTask.taskname;
                let deadline = newTask.deadline;

                let taskToBeAdded = {eid:empid, tid:taskid, tname: taskname, ddln: deadline}
                //console.log(taskToBeAdded)
                
                tasks.push(taskToBeAdded);    // added user and pass in loginDetails
                fs.writeFileSync("tasks.json", JSON.stringify(tasks));
                response.write(addTaskPage); 
                }
                else {
                    response.write("Task id must be unique!");     
                    response.write(addTaskPage); 
                    }   
                
                    
        }
        else if(urlInfo.path =="/deleteTaskPage"){
            response.write(deleteTaskPage);
            }

        else if(urlInfo.pathname == "/deleteTask"){
            
            let delTask = urlInfo.query;
            let tasks = JSON.parse(fs.readFileSync("tasks.json").toString());
            //let result = tasks.find(t=>t.taskid == tasks.taskid);
            let resultIndex = tasks.findIndex(t=>t.tid == delTask.taskid);
            //console.log(resultIndex);
            // 200 -success code , content type in header text/html
            response.writeHead(200,{"content-type":"text/html"});
            if (resultIndex != -1){
            //console.log("inside if stmt");

            tasks.splice(resultIndex,1);
            
            fs.writeFileSync("tasks.json", JSON.stringify(tasks));
            response.write(deleteTaskPage); 
            }
            else {
                response.write("no task with given id found");     
                response.write(deleteTaskPage); 
                }           
        }
        else if(urlInfo.path =="/listAllTasksPage"){
            let tasks = JSON.parse(fs.readFileSync("tasks.json").toString());
            var tableContent = "";
            var startTable = "<table border = 1><tr><th>Employee ID</th><th>Task ID</th><th>Task Name</th><th>Deadline</th></tr>";
            tasks.forEach(e => {
                tableContent += "<tr><td>" + e.eid + "</td><td>"  + e.tid + "</td><td>"  + e.tname + "</td><td>" + e.ddln + "</td></tr>";
            })
            var endTable = "</table>"
            var links = `<a href="addTaskPage">Add Task Page </a> |
            <a href="deleteTaskPage">Delete Task Page </a> |
            <a href="listAllTasksPage">List of All Tasks Page </a> 
            </body>
            </html>`
            response.write( listAllTasksPage + startTable + tableContent + endTable + links);
        }
    
        else {
            response.write(indexPage);  
        }
    }
    
    response.end();

})

server.listen(9090,()=>console.log("Server running on port number 9090"))