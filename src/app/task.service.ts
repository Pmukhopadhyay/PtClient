import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import {map} from 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { response } from 'express';
import {Task} from './task.model.js';
import {Observable,of, from } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$!: Observable<Task[]>;
  errorMessage: string = '';
  constructor(private http: HttpClient) { }


  getTasks(token:string){
    const headers = { 'Authorization': 'Bearer ' + token }
    this.tasks$ = this.http.get<Task[]>('http://localhost:3000/api/tasks/',{ headers })
    .pipe(
      catchError((error: any) => {
        this.errorMessage = error;
        return throwError(() => new Error(error));
    }));
    return this.tasks$;
  }
}
