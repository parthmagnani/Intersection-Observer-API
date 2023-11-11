import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  private anotherUrl = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) { }

  getPosts(page: number, limit: number): any{
    const url = `${this.apiUrl}?_page=${page}&_limit=${limit}`;
    return this.http.get<any[]>(url, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any[]>) => {
          const totalCountHeader = response.headers.get('x-total-count');
          console.log("totalCountHeader-->>", totalCountHeader)
          const totalCount = totalCountHeader ? +totalCountHeader : 0;
          const totalPages = Math.ceil(totalCount / limit);
          return { data: response.body, totalPages };
        })
      );
  }

  getPhotos(){
    return this.http.get(this.anotherUrl + '/photos/1').subscribe((res: any) =>{
      console.log("This is reposnse from another fake api-->>", res)
    })
  }
}
