import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';
import { MatTableModule } from '@angular/material/table';
import {Task} from './task.model.js';
import {Observable,of, from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'PtClient';
  tasks$!: Observable<Task[]>;
  taskDatasource: MatTableDataSource<Task>;
  taskColumns: string[] = ['title', 'description', 'status'];
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //@ViewChild(MatSort, { static: true }) sort: MatSort;
 
  form: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });
  constructor(
    private fb: FormBuilder, 
    public authService: AuthService,
    public taskService: TaskService,
  ){

    this.taskDatasource = new MatTableDataSource<Task>();
    this.taskColumns = ['title', 'description', 'status'];
  }


  submit(){
    this.authService
      .login(this.form.value.email,this.form.value.password)
      .subscribe((response)=>{
        this.taskService.getTasks(this.authService.getToken())
        .subscribe(tasks => {
          this.taskDatasource.data = tasks;
        });
        })
        console.log("From app component, tasks="+this.taskDatasource);
      }

}
