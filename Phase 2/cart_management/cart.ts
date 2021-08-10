
function storeCheetos() {
    
    
    let productName = "Cheetos";
    let productPrice = 3.00;

    var items = JSON.parse(localStorage.getItem("items") || "[]");

    let item = {pName:productName,pPrice:productPrice};
    
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    

    console.log("Data stored in local storage")
    var cartAmountContent = "Cart Amount: "+items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
} 

function storePowerade() {
    
    
    

    

    let productName = "6-Pack of Powerade";
    let productPrice = 4.00;

    var items = JSON.parse(localStorage.getItem("items") || "[]");

    let item = {pName:productName,pPrice:productPrice};
    

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    

    console.log("Data stored in local storage")
    var cartAmountContent = "Cart Amount: "+items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
} 


function storeOreos() {
    
    
    let productName = "Oreos";
    let productPrice = 3.50;

    var items = JSON.parse(localStorage.getItem("items") || "[]");

    let item = {pName:productName,pPrice:productPrice};
    

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    

    console.log("Data stored in local storage")
    var cartAmountContent = "Cart Amount: "+items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
} 

function storeFries() {
    
    
    let productName = "Chester's Hot Fries";
    let productPrice = 2.39;

    var items = JSON.parse(localStorage.getItem("items") || "[]");

    let item = {pName:productName,pPrice:productPrice};
    

    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    

    console.log("Data stored in local storage")
    var cartAmountContent = "Cart Amount: "+items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
} 

function displayCart() {
    let tableEntries = JSON.parse(localStorage.getItem("items") || "[]");
    
    var tableContent = ""
    var startTable ="<table border=1><tr><th>Product Name</th><th>Product Price</th></tr>"
    
    var total = 0;
    tableEntries.forEach(element=>{
        tableContent += "<tr><td>" + element.pName + "</td><td>$" + element.pPrice;
        total += +element.pPrice;
    })

    var endTable = "</table><br> Total price is $" + total;
    tableContent = startTable + tableContent + endTable;

    document.getElementById("table").innerHTML=tableContent;

    
}

function clearCart() {

    localStorage.removeItem("items");
    
     var cartAmountContent = "Cart Amount: 0";
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
    alert("Your cart has been emptied.");
}

function loadCartAmount()
{

    var items = JSON.parse(localStorage.getItem("items") || "[]");
    var cartAmountContent = "Cart Amount: "+items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;


}