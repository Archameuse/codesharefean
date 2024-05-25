import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  url = 'https://codesharemean-api.vercel.app/api/codes'
  constructor(public http:HttpClient) {}
  getCodes(id:string): Observable<any> {
    return this.http.get(this.url, {params: {id}})
  }
  postCode(code:string,language:string): Observable<any> {
    return this.http.post(this.url, {code,language})
  }
}
