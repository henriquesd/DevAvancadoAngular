import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from '../../todo.service';
import { Store } from '../../todo.store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tasks-iniciadas',
  templateUrl: './tasks-iniciadas.component.html'
})
export class TasksIniciadasComponent implements OnInit {

  iniciados$: Observable<any[]>;
  
  constructor(private tasksService: TasksService, private store: Store) {}

  ngOnInit() {
    // this.iniciados$ = this.tasksService.getTodoList$;
    this.iniciados$ = this.store.getTodoList()
      .pipe( // colocar dentro de um pipe para poder trabalhar aqui um mapeamento;
        map(todolist => todolist.filter(task => task.iniciado && !task.finalizado))
      )
  }
}