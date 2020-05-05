import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

  error = new Subject<string>()

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content }
        this.http
        .post<{ name: string }>
        ('https://udemyangular-97ffb.firebaseio.com/posts.json',
         postData
         )
         .subscribe(responseData => {
          console.log(responseData)
         }, error => {
          this.error.next(error.message)
         });
    }
    fetchPosts() {
    return this.http
    .get<{ [key: string]: Post}>('https://udemyangular-97ffb.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders({'Custom-Header': 'Hiii'})
    }
  )
    .pipe(
      map(responseData => {
      const postsArray: Post[] = []
      for (const key in responseData) {
        if(responseData.hasOwnProperty(key)){
          postsArray.push({ ...responseData[key], id: key })
        }
      }
      return postsArray;
    })
  )
 
  }

  deletePost() {
    return this.http.delete('https://udemyangular-97ffb.firebaseio.com/posts.json')
  }
}