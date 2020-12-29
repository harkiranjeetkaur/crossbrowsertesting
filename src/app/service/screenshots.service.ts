import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Item {
  id: number;
  page: string;
  testId: string;
  versionId: string;
  completed: boolean;
}

export interface Details {
  os: string;
  device: string;
  browser: string;
  resolution: string;
  thumb: string;
  fullpage: string;
}


@Injectable()
export class ScreenshotsService {
  items: Item[] = [];
  constructor(private http: HttpClient) { }

  basicAuth = btoa(unescape(encodeURIComponent('yue.shi@caseware.com:casewareqa123')));
  baseUrl = 'https://crossbrowsertesting.com/api/v3/screenshots';

  runScreenshotTest(item: Item): any {
    const headers = {
      Authorization: 'Basic ' + this.basicAuth
    };
    return this.http.post(`${this.baseUrl}/${item.testId}/${item.versionId}`, {},  {headers}).subscribe( data => {
      return data;
    });
  }

  getTestResult(item: Item): Observable<any> {
    const headers = {
      Authorization: 'Basic ' + this.basicAuth
    };
    return this.http.get(`${this.baseUrl}/${item.testId}`,  { headers });
  }

  loadData(): Observable<Item[]> {
    return this.http.get<Item[]>('assets/data.json').pipe(tap(data => {
      this.items = data;
    }));
  }

  getItem(id: number): Item | undefined {
    return this.items.find(item => item.id === Number(id));
  }

}
