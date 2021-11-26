import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { RequestParam, ResponseParam } from './config.models';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private baseUrl: string;
  private reqParam: RequestParam | undefined;
  private httpOptions: any;

  constructor(
    private http: HttpClient
    ) {
    this.init();
  }

  private init(): void {
    this.baseUrl = 'http://localhost:8081';
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'}),
    }
  }

  getConfig(path:string) {
    return this.http.get<RequestParam>(this.baseUrl+path);
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){
      console.error(`통신 에러: ${error.error.message}`, );
    }else{
      console.error(`서버 코드: ${error.status}, 에러내용: ${error.error}`);
    }

    return throwError('통신 에러 발생하였습니다.')
  }

  httpGet(path:string, data?: RequestParam): Observable<any> {
    const url = this.baseUrl + path;
    return this.http
      .get(url, {...this.httpOptions, params: data})
      .pipe(timeout(Number(120000)), catchError(this.handleError));
  }
}

