import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PtClient';
  tasks : any;

  form: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });
  constructor(
    private fb: FormBuilder, 
    public authService: AuthService,
    public taskService: TaskService,
  ){}
  
  submit(){
    this.authService
      .login(this.form.value.email,this.form.value.password)
      .subscribe((response)=>{
          this.tasks = this.taskService.getTasks(this.authService.getToken());
          console.log("From app component, tasks="+this.tasks);
      });
  }
}
