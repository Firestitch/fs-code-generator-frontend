import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root',
})
export class ConstService {
  constructor(private _http: HttpClient) {
  }

  public getEnumsForModule(modulePath: string) {
    return this._http.get('/generate/enums-list', { params: { enumPath: modulePath } });
  }

  public getEnumDetails(enumPath: string) {
    if (environment.production) {
      return this._http.get('/generate/enum-keys-list', {
        params: {
          enumPath: enumPath
        }
      });
    } else {
      return of({"name":"Visitors","members":["Active","Closed"]});
    }
  }
}
