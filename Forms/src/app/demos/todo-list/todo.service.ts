import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';
import { Observable } from 'rxjs';
import { Store } from './todo.store';
import { tap } from 'rxjs/operators';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient, private store: Store) { }
  
  // quando coloca esse sinal de dólar no final, está dizendo que
  // é uma propriedade, que vai se comportar como Observable; (é uma convenção de nome);
  getTodoList$: Observable<Task[]> = this.http
    .get<Task[]>('http://localhost:3000/todolist')
    .pipe(
      // tap é parecido com o map, mas ele serve para você trabalhar em cima
      // do contexto do Observable, então no caso aqui por exemplo, setar um novo valor
      // para a nossa store;
      tap(next => this.store.set('todolist', next)));

  // getToDoList() : Observable<Task[]> {
  //   return this.http
  //     .get<Task[]>('http://localhost:3000/todolist');
  // }
}