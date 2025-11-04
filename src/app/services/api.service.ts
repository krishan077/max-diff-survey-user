import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.production';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }


  private _toast = new Subject<{ type: 'success' | 'error', msg: string }>();
  toast$ = this._toast.asObservable();

  show(type: 'success' | 'error', msg: string) {
    this._toast.next({ type, msg });
  }

  getApi(endpoint: string) {
    return this._http.get(environment.apiUrl + endpoint);
  }

  postApi(endpoint: string, payload: any) {
    return this._http.post(environment.apiUrl + endpoint, payload)
  }

  getDiyApi(endpoint: string) {
    return this._http.get(environment.diyUrl + endpoint);
  }

}
