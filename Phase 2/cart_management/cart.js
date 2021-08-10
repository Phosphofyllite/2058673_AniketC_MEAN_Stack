function storeCheetos() {
    var productName = "Cheetos";
    var productPrice = 3.00;
    var items = JSON.parse(localStorage.getItem("items") || "[]");
    var item = { pName: productName, pPrice: productPrice };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    console.log("Data stored in local storage");
    var cartAmountContent = "Cart Amount: " + items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
}
function storePowerade() {
    var productName = "6-Pack of Powerade";
    var productPrice = 4.00;
    var items = JSON.parse(localStorage.getItem("items") || "[]");
    var item = { pName: productName, pPrice: productPrice };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    console.log("Data stored in local storage");
    var cartAmountContent = "Cart Amount: " + items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
}
function storeOreos() {
    var productName = "Oreos";
    var productPrice = 3.50;
    var items = JSON.parse(localStorage.getItem("items") || "[]");
    var item = { pName: productName, pPrice: productPrice };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    console.log("Data stored in local storage");
    var cartAmountContent = "Cart Amount: " + items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
}
function storeFries() {
    var productName = "Chester's Hot Fries";
    var productPrice = 2.39;
    var items = JSON.parse(localStorage.getItem("items") || "[]");
    var item = { pName: productName, pPrice: productPrice };
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
    console.log("Data stored in local storage");
    var cartAmountContent = "Cart Amount: " + items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
}
function displayCart() {
    var tableEntries = JSON.parse(localStorage.getItem("items") || "[]");
    var tableContent = "";
    var startTable = "<table border=1><tr><th>Product Name</th><th>Product Price</th></tr>";
    var total = 0;
    tableEntries.forEach(function (element) {
        tableContent += "<tr><td>" + element.pName + "</td><td>$" + element.pPrice;
        total += +element.pPrice;
    });
    var endTable = "</table><br> Total price is $" + total;
    tableContent = startTable + tableContent + endTable;
    document.getElementById("table").innerHTML = tableContent;
}
function clearCart() {
    localStorage.removeItem("items");
    var cartAmountContent = "Cart Amount: 0";
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
    alert("Your cart has been emptied.");
}
function loadCartAmount() {
    var items = JSON.parse(localStorage.getItem("items") || "[]");
    var cartAmountContent = "Cart Amount: " + items.length;
    document.getElementById("cartAmount").innerHTML = cartAmountContent;
}
