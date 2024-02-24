import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 public common_url="https://json-eco.onrender.com"
  constructor(private http:HttpClient,private apiService:ApiService) { }

  allProduct():Observable<any>{
    return this.apiService.get(this.common_url+"/products");
  }
  addNewProduct(product_dto:any):Observable<any>{
    return this.http.post(this.common_url+"/products",product_dto);
  }

  singleProduct(id:any){
    return this.apiService.get(this.common_url+"/products/"+id);
  }
  updateProduct(id:any,product_dto:any):Observable<any>{
    return this.http.put(this.common_url+"/products/"+id,product_dto);
  }
  deleteProduct(id:any):Observable<any>{
    return this.http.delete(this.common_url+"/products/"+id);
  }
}
