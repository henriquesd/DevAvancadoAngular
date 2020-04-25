import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from "../../task";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['todo-list.component.css']  
})
export class ToDoListComponent {

  // O Input serve para inputar dados;
  @Input()
  list: Task[];

  // O Output serve para sair eventos; O Output é sempre um evento provocado;
  @Output()
  // O EventEmitter, ele vai emitir o evento para o método responsável;
  toggle = new EventEmitter<any>();

  toggleItem(index: number, acao: string) {
    const task = this.list[index];

    // console.log(task);

    switch (acao) {
      case 'iniciar':
        task.finalizado = false;
        task.iniciado = true;
        break; 
      case 'finalizar':
        task.finalizado = true;
        task.iniciado = false;
        break; 
      case 'retomar':
        task.finalizado = false;
        task.iniciado = true;
        break; 
      case 'cancelar':
        task.finalizado = false;
        task.iniciado = false;
        break;      
    }

    this.toggle.emit({
      task: { ...task }
    });

  }
  
}