import { Component, OnInit, OnDestroy } from '@angular/core';

import { TasksService } from '../../todo.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '../../todo.store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnDestroy {

  todolist$: Observable<any[]>
  subscription: Subscription;

  constructor(private taskService: TasksService, private store: Store) {}

  ngOnInit() {
    // this.todolist$ = this.taskService.getTodoList$;
    this.todolist$ = this.store.getTodoList()
    .pipe(
      map(todolist => todolist.filter(task => !task.iniciado && !task.finalizado)));

      // chama o método Subscriber para ativar o fluxo de dados;
      this.subscription = this.taskService.getTodoList$.subscribe();
  } 

  onToggle(event) {
    this.taskService.toggle(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}