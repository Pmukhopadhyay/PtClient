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
  form: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });
  constructor(private fb: FormBuilder, public authService: AuthService, ){}
  
  submit(){
    this.authService
      .login(this.form.value.email,this.form.value.password)
      .subscribe((response)=>{
        
      });
  }
}
