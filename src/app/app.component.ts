import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PtClient';
  form: FormGroup = this.fb.group({
    username: [''],
    password: ['']
  });
  constructor(private fb: FormBuilder, public authService: AuthService, ){}
  
  submit(){
    this.authService
      .login(this.form.value.username,this.form.value.password)
      .subscribe((response)=>{
        //alert("you have successfully logged in");
        //console.log("response="+JSON.stringify(response));
        //JSONObject myobject = new JSONObject(response);
        //console.log("firstName="+response.'firstName']);
      });
  }
}
