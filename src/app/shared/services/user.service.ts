import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserData(user_id: any) {
    throw new Error('Method not implemented.');
  }
  public common_url="http://localhost:3000"
  constructor(private http:HttpClient, private router:Router, private apiService:ApiService) { }

//get invidual user
  userData(user_id:any){
    return this.apiService.get(this.common_url+"/user/"+user_id);
  }

  //update data by user_id
  updateUserData(user_id:any,user_data:any):Observable<any>{
    return this.http.put(this.common_url+"/user/"+user_id,user_data);
  }
}
