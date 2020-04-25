import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient) { }
  
  // quando coloca esse sinal de dólar no final, está dizendo que
  // é uma propriedade, que vai se comportar como Observable; (é uma convenção de nome);
  getTodoList$: Observable<Task[]> = this.http
    .get<Task[]>('http://localhost:3000/todolist');

  // getToDoList() : Observable<Task[]> {
  //   return this.http
  //     .get<Task[]>('http://localhost:3000/todolist');
  // }
}