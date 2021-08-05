function addData() {
    
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    var imageurl = document.getElementById("imageurl").value;
 
    var myDivTag = document.createElement("div");
 
    

    myDivTag.innerHTML += '<div class="col"><div class="card" style="background-color: #ad2cd1;"><img class="card-img-top" src="'+imageurl+'" alt="Card image cap"><div class="card-body"><h4 class="card-title">'+title+'</h4><p class="card-text">' + content + '</p></div></div>  </div>'

    

    document.getElementById("cards").appendChild(myDivTag);
 }
 