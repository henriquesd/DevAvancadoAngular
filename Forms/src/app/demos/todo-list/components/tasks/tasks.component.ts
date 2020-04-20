import { Component, OnInit } from '@angular/core';

import { TasksService } from '../../todo.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {

  constructor() {}

  ngOnInit() { }  
}