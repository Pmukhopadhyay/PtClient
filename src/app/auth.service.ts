import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { share } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session: any;
  email: any;
  constructor(private http: HttpClient,public cookieService: CookieService) { 
    let session =  this.cookieService.get('session');
    let email = this.cookieService.get('email');
    this.email = email;
    if(session) this.session = JSON.stringify(session);
  }

  login(email:string,password:string){
    let ob = this.http.post('http://localhost:3000/api/auth/login',{
      email: email,
      password: password,
    }).pipe(share());
    
    ob.subscribe((response) => {
      this.session = response;
      this.email = email;
      this.cookieService.set('session', JSON.stringify(this.session));
      this.cookieService.set('email', email);
    });
    return ob;
  }

  logout(){
    this.session=undefined;
    this.cookieService.deleteAll();
  }
}
