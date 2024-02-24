import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/Model/object-model';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public common_url="https://json-eco.onrender.com";

  constructor(private apiService:ApiService,private http:HttpClient) { }

  userDashboardData(){
    return this.apiService.get(this.common_url+"/user/")
  }

  productDashboardData(){
    return this.apiService.get(this.common_url+"/products")
  }
  allUser():Observable<any>{
    console.log(this.apiService.get(this.common_url+"/user"));
    return this.apiService.get(this.common_url+"/user");
  }
  addUser(user_dto: User){
    console.log("ok");
    return this.http.post<User>(this.common_url+"/user",user_dto);
  }
  //get data of individual user
  singleuUser(user_id:any){
    return this.apiService.get(this.common_url+"/user/"+user_id);
  }
  //update data of individual user
  editUser(user_id:any,user_dto:any):Observable<any>{
    return this.http.put(this.common_url+"/user/"+user_id,user_dto);
  }
  deleteUser(user_id:any){
    return this.apiService.delete(this.common_url+"/user/"+user_id);
  }
}
