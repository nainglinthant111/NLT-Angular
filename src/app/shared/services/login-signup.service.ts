import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/Model/object-model';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
    public common_url="http://localhost:3000"
  apiService: any;
  constructor(private http:HttpClient,private api:ApiService) { }
  //User Login
  authLogin(user_name:any,password: any):Observable<any>{
    return this.api.get(this.common_url+"/user?email="+user_name+"&password="+password);
  }
  //create New User
  userRegister(user_dto: User): Observable<User> {
    return this.http.post<User>(this.common_url + "/user", user_dto);
  }
  //User Login by role
  adminLogin(user_name:any,password:any):Observable<any>{
    return this.api.get(this.common_url+"/user?email="+user_name+"&password="+password+"&role=admin");
  }
}
