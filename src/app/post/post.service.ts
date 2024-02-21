import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';


// Importar aquí las interfaces necesarias

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private apiURL = 'http://localhost:3000';

// Http Header Options

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

// Constructor

  constructor(private httpClient: HttpClient) { }

  // Metodos

 // GET
	getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/');
  } // usar adecuadamente las interfaces

// CREATE

  create(post:Post): Observable<any> {

    return this.httpClient.post(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
  }

// BUSCAR

  find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/' + id)
  }

// ACTUALIZAR

  update(id:number, post:Post): Observable<any> {
    return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)

  }

// BORRAR
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
  }

}
