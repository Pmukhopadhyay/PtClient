import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';
import { MatTableModule } from '@angular/material/table';
import {Task} from './task.model.js';
import {Observable,of, from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators'
import { Router  } from '@angular/router';
import {NavigationEnd} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'PtClient';
  tasks$!: Observable<Task[]>;
  taskDatasource: MatTableDataSource<Task>;
  taskColumns: string[] = ['title', 'description', 'status', 'delete row'];
 
  form: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(
    private fb: FormBuilder, 
    public authService: AuthService,
    public taskService: TaskService,
    private router: Router
  ){

    this.taskDatasource = new MatTableDataSource<Task>();
    this.taskColumns = ['title', 'description', 'status', 'delete row'];
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (
        event.id === 1 &&
        event.url === event.urlAfterRedirects
      ) {
          this.authService.logout();
      }
    });
  }



  submit(){

    this.authService
      .login(this.form.value.email,this.form.value.password)
      .subscribe((response)=>{
        this.taskService.getTasks(this.authService.getToken())
        .subscribe(tasks => {
          this.taskDatasource.data = tasks;
        });
      });
      }
    
     onSelected() {
      console.log("from select box ");

      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.taskDatasource.filter = filterValue.trim().toLowerCase();
      }

      deleteTask(event: Event){
        const id = (event.target as HTMLInputElement).id;
        let temp = id.split('-');
        let taskId = temp[1];
        console.log("taskId="+taskId);
        this.taskService.deleteTask(taskId)
        .subscribe(
          (data)=> {this.taskService.getTasks(this.authService.getToken())
            .subscribe(tasks => {
              this.taskDatasource.data = tasks;
            });},
    
        );
      }

}
