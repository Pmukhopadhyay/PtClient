import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import {map} from 'rxjs/add/operator/map';
import { map } from "rxjs/operators";
import { response } from 'express';
import {Task} from './task.model.js';
import {Observable,forkJoin} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$!: Observable<Task[]>;
  errorMessage: string = '';
  constructor(private http: HttpClient,public authService: AuthService) { }
  private serviceUrl = 'http://localhost:3000/api/tasks/';


  getTasks(token:string){
    const headers = { 'Authorization': 'Bearer ' + token }
    this.tasks$ = this.http.get<Task[]>(this.serviceUrl,{ headers })
    .pipe(
      catchError((error: any) => {
        this.errorMessage = error;
        return throwError(() => new Error(error));
    }));
    return this.tasks$;
  }

  getHeaders(){
    const headers = { 'Authorization': 'Bearer ' + this.authService.getToken() }
    return headers;
  }

  updateTask(task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.put<Task>(`${this.serviceUrl}/${task._id}`, task, { headers });
  }

  addTask(task: Task): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.post<Task>(`${this.serviceUrl}/add`, task, { headers });
  }

  deleteTask(id: string): Observable<Task> {
    const headers = this.getHeaders();
    return this.http.delete<Task>(`${this.serviceUrl}/${id}`, { headers });
  }

  deleteTasks(tasks: Task[]): Observable<Task[]> {
    const headers = this.getHeaders();
    return forkJoin(
      tasks.map((task) =>
        this.http.delete<Task>(`${this.serviceUrl}/${task._id}`, { headers })
      )
    );
  }

}
