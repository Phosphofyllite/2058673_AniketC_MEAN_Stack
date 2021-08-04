function storeData() {
    let clientname = document.getElementById("clientname").value;
    let projectname = document.getElementById("projectname").value;
    let budget = document.getElementById("budget").value;

    let entries = JSON.parse(localStorage.getItem("entries") || "[]");

    let entry = {cl:clientname,pr:projectname,bu:budget};
    //let budg = {ClientName:clientname,ProjectName:projectname,age:budget};

    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
    

    console.log("Data stored in local storage")
} 


function removeData() {

    localStorage.removeItem("entries");
    alert("Cleared all data");
}


function displayData() {
    let tableEntries = JSON.parse(localStorage.getItem("entries") || "[]");
    
    var tableContent = ""
    var startTable ="<table border=1><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>"
    
    var total = 0;
    tableEntries.forEach(element=>{
        tableContent += "<tr><td>" + element.cl + "</td><td>" + element.pr + "</td><td>" + element.bu;
        total += +element.bu;
    })

    var endTable = "</table><br> the total is " + total;
    tableContent = startTable + tableContent + endTable;

    document.getElementById("table").innerHTML=tableContent;

    
}
