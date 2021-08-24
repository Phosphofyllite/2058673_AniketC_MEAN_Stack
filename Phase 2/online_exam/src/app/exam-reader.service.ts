
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamReader } from './ExamReader.model';
@Injectable({
  providedIn: 'root'
})
export class ExamReaderService {

  constructor(public http:HttpClient) { }


  checkExam(): Observable<ExamReader[]>{
    return this.http.get<ExamReader[]>("/assets/exam.json")
  }
  
}