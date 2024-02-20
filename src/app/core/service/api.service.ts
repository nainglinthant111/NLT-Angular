import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOption={
    headers:new HttpHeaders({
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin":"*"
    })
  }
  constructor(private http:HttpClient) { }
  private formatErroes(error:any){
    return throwError(error.error)
  }
  get(path:string,params:HttpParams=new HttpParams()):Observable<any>{
    return this.http.get(path,{params}).pipe(catchError(this.formatErroes))
  }
  put(path:string,body:Object={}):Observable<any>{
    return this.http.put(path,JSON.stringify(body),this.httpOption).pipe(catchError(this.formatErroes))
  }

  post(path:string,body:Object={}):Observable<any>{
    return this.http.post(path,JSON.stringify(body),this.httpOption).pipe(catchError(this.formatErroes))
  }
  delete(path:string):Observable<any>{
    return this.http.delete(path).pipe(catchError(this.formatErroes))
  }
}
