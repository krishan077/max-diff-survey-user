import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.production';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  getApi(endpoint: string) {
    return this._http.get(environment.apiUrl + endpoint);
  }

  postApi(endpoint: string, payload: any) {
    return this._http.post(environment.apiUrl + endpoint, payload)
  }

}
