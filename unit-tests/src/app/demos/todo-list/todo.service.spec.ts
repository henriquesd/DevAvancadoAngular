import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Observable, Observer } from 'rxjs';
import { TasksService } from './todo.service';
import { Store } from './todo.store';
import { Task } from './task';

const todolist: Task[] = [{ "id": 1, "nome": "Responder e-mails", "finalizado": true, "iniciado": false }];

// Método que simula uma resposta - uma resposta em formato de Observable;
function createResponse(body) {
    return Observable.create((observer: Observer<any>) => {
        observer.next(body);
    });
}

class MockHttp {
    get() {
        return createResponse(todolist);
    }
}

describe('TasksService', () => {

    let service: TasksService;
    let http: HttpClient;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useClass: MockHttp },
                TasksService,
                Store
            ]
        });
        http = bed.get(HttpClient);
        service = bed.get(TasksService);
    });

    it('Deve retornar lista de tarefas', () => {
        // Esse 'spyOn' não é necessário, porque o próprio método get já chama o createResponse,
        // então não preciso fornecer o resultado para ele já que ele sozinho ele chama; a não ser que
        // se você realmente estivesse usando uma instância do HttpClient sem fazer o useClass: MockHttp (no provider),
        // porque ai de verdade você estaria chamando o método get da classe HttpClient, e ai não adianta você querer 
        // interceptar falando o que que ela vai retornar ou não (como fizemos aqui na MockHttp método get), porque você
        // não pode interferir em uma classe que não é sua;
        //spyOn(http, 'get').and.returnValue(createResponse(todolist));

        // esse dólar ($) no final significa que ele já vai retornar em formato de Observable;
        service.getTodoList$
            .subscribe((result) => {
                expect(result.length).toBe(1);
                console.log(result);
                console.log(todolist);

                expect(result).toEqual(todolist);
            });
    });

});