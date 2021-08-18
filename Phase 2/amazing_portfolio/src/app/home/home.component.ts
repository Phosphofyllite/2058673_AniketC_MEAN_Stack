import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})  
export class HomeComponent implements OnInit {

  
  entries: Array<any> = [];
  

  addContact() {
    let contact = this.portRef.value;

    this.cntnm = contact.contactName;
    this.phnnm = contact.phoneNum;

    //let entries = [];
    let entry = {cName:this.cntnm, pName:this.phnnm};
    this.entries.push(entry);

    console.log(this.entries);

  }

  loginRef = new FormGroup({
    user:new FormControl("", [Validators.required]),
    pass:new FormControl("", [Validators.required])

  })


  registerRef = new FormGroup({
    enterUser:new FormControl("", [Validators.required]),
    enterPass:new FormControl("", [Validators.required]),
    firstname:new FormControl("", [Validators.required]),
    lastname:new FormControl("", [Validators.required])
  })


  portRef = new FormGroup({
    contactName:new FormControl("", [Validators.required]),
    phoneNum:new FormControl("", [Validators.required])

  })
  constructor() { }

  ngOnInit(): void {
  }
  loginmsg:string = ""
  registermsg:string = ""

  flagLogin:boolean = true;
  flagRegister:boolean = false;
  flagPort:boolean = false;
  
  usrnm?:any = "%";
  pswrd?:any = "%" ;
  fname?:any = "%" ;
  lname?:any = "%" ;

  cntnm?:any;
  phnnm?:any;

  checkUser() {
    let login = this.loginRef.value
    // console.log(login);
    // console.log(this.usrnm, this.pswrd)
    if (login.user == this.usrnm && login.pass == this.pswrd) {
      this.loginmsg = "Successful login"
      this.flagLogin = false;
      this.flagRegister = false;
      this.flagPort = true;
    }
    else { 
      this.loginmsg = "Login failed"
    }
    // console.log(login);
    // console.log(this.usrnm, this.pswrd)
    //this.loginRef.reset();
  }


  signUp(){
    this.flagLogin = false;
    this.flagRegister = true;
    this.loginmsg = "";
  }

  register() {
    this.flagLogin = true;
    this.flagRegister = false;
    this.loginmsg = "";

    let register = this.registerRef.value;
    this.usrnm = register.enterUser;
    this.pswrd = register.enterPass;
    this.fname = register.firstname;
    this.lname = register.lastname;
    
  }
  
  

 

  

 


  // showTable(){
  // var tableContent = ""
  //  var startTable ="<table border=1><tr><th>Contact Name</th><th>Phone Number</th></tr>"
  //  let entries = [];
  //  let entry = {cName:this.cntnm, pName:this.phnnm};
  //  entries.push(entry);
  //  entries.forEach(element=>{
  //   tableContent += "<tr><td>" + element.cName + "</td><td>" + element.pName + "</td>"
  //  })

  //  var endTable = "</table><br>" 
    
    
    
    
  //   tableContent = startTable + tableContent + endTable;
  //   document.getElementById("table")!.innerHTML=tableContent;


  // }
 

  


}

 