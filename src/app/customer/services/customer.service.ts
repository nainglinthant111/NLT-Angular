import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../core/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private single_product_id = new BehaviorSubject(null);
  currentProduct = this.single_product_id.asObservable();
  public common_url = "https://json-eco.onrender.com";

  constructor(private apiService: ApiService, private http: HttpClient) { }

  allProduct(): Observable<any> {
    return this.apiService.get(this.common_url + "/products");
  }

  quickByproduct(product_id: any) {
    this.single_product_id.next(product_id);
  }

  individualProduct(id: any) {
    return this.apiService.get(this.common_url + "/products/" + id);
  }

  userDetail(id: any) {
    return this.apiService.get(this.common_url + "/user/" + id);
  }

  insertNewOrder(order_dto: any): Observable<any> {
    return this.http.post(this.common_url + "/orders", order_dto);
  }
  orderDashboardData(): Observable<any> {
    return this.apiService.get(this.common_url + "/orders");
  }

  productDashboardData(): Observable<any> {
    return this.apiService.get(this.common_url + "/products");
  }
}
