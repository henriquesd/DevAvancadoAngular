import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  todolist$: Observable<any[]>

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.todolist$ = this.taskService.getTodoList$;
  }  
}