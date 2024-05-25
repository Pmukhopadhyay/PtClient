import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { share } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session: any;
  username: any;
  constructor(private http: HttpClient,public cookieService: CookieService) { 
    let session =  this.cookieService.get('session');
    let username = this.cookieService.get('username');
    this.username = username;
    if(session) this.session = JSON.stringify(session);
  }

  login(username:string,password:string){
    let ob = this.http.post('https://dummyjson.com/auth/login',{
      username: username,
      password: password,
    }).pipe(share());
    
    ob.subscribe((response) => {
      this.session = response;
      this.username = username;
      this.cookieService.set('session', JSON.stringify(this.session));
      this.cookieService.set('username', username);
    });
    return ob;
  }

  logout(){
    this.session=undefined;
    this.cookieService.deleteAll();
  }
}
