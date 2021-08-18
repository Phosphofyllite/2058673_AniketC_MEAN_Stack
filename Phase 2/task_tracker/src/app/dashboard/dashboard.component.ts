import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  entries: Array<any> = [];

  todoRef = new FormGroup({
    id:new FormControl("", [Validators.required]),
    name:new FormControl("", [Validators.required]),
    task:new FormControl("", [Validators.required]),
    deadline:new FormControl("", [Validators.required])
  })
  
  usableID?:any = "%";
  usableName?:any = "%" ;
  usableTask?:any = "%" ;
  usableDeadline?:any = "%" ;



  displayedColumns: string[] = ['todoID', 'todoName', 'todoTask', 'todoDeadline'];
  dataSource = this.entries;

  @ViewChild(MatTable) table!: MatTable<todoTaskEntry>;
  
  addData() {
    
    //console.log(this.entries)
    console.log(this.table.dataSource)
    let todo = this.todoRef.value;
    this.usableID = todo.id;
    this.usableName = todo.name;
    this.usableTask = todo.task;
    this.usableDeadline = todo.deadline;
    let entry = {tID:this.usableID, tName:this.usableName,tTask:this.usableTask, tDeadline:this.usableDeadline};
    this.dataSource.push(entry);
    this.table.renderRows();

    //console.log(this.entries)
    //console.log(this.table.dataSource)
    
    
  }




}

export interface todoTaskEntry {
  todoID: any;
  todoName: any;
  todoTask: any;
  todoDeadline: any;
}



