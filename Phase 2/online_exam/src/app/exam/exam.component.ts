
import { ExamReaderService } from '../exam-reader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ExamReader } from '../ExamReader.model';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})



export class ExamComponent implements OnInit {
  myForm:FormGroup;
  constructor(public form:FormBuilder, public examReaderSer:ExamReaderService) { 
    this.myForm = form.group({});
  }
  myQuestions:Array<ExamReader> = [];
  answersMap:Map<string, ExamReader> = new Map;
  

  
  
  ngOnInit(): void {
    this.examReaderSer.checkExam().subscribe(result=> {
      for (let q of result) {
       
        this.myForm.addControl(q.question, this.form.control(""));
        this.myQuestions.push(q);
        this.answersMap.set(q.question, q)
        
      }
        
    })
    console.log(this.myQuestions)
  }
  


  score:number = 0;
  submit() {
    
    
    Object.keys(this.myForm.value).forEach(key => {
      console.log(this.myForm.value[key]);// This logs the selected answer
      let curElem:any = document.getElementById(this.myForm.value[key])
      if (this.myForm.value[key] == this.answersMap.get(key)?.correctAns) {
        this.score+= 1;
        curElem.style.color = 'green';
        curElem.style.backgroundColor = 'lightgreen'
        curElem.innerHTML = `${this.myForm.value[key]} CORRECT`;
      } 
      else {
        let answer = this.answersMap.get(key)?.correctAns;
        if (answer != undefined) {
          let correctElem:any = document.getElementById(answer);
          
          curElem.style.color = 'red';
          curElem.style.backgroundColor = '#e69898'
          curElem.innerHTML = `${this.myForm.value[key]} INCORRECT`;
          correctElem.style.color=  'green'
          correctElem.style.backgroundColor = 'lightgreen'
        }
      }
      
    })
    
    let result = document.getElementById("result");
    if (result === null) {
    } else {
      result.innerHTML = this.score + "/" + this.myQuestions.length;
    }
   this.myForm.disable(); 

  }


}

    
  

 


