import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContadorComponent } from './contator.component';

describe('ContadorComponent', () => {

    let component: ContadorComponent;
    let fixture: ComponentFixture<ContadorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContadorComponent
            ]
        });

        // a fixture é uma instância de uma fixture de teste,
        // e dentro dela tem a instância do componente (ver a linha abaixo da fixture),
        // é como se fosse um Mock - O Mock é um objeto Mock, porém dentro do objeto Mock
        // tem o objeto que você está testando ou simulando;
        fixture = TestBed.createComponent(ContadorComponent);
        // o component é a própria instância do componente;
        component = fixture.componentInstance;

        component.valor = 0;
    });

    it('Deve incrementar corretamente', () => {
        component.incrementar();
        expect(component.valor).toBe(1);
    });

    it('Deve decrementar corretamente', () => {
        component.incrementar();
        expect(component.valor).toBe(1);
        component.decrementar();
        expect(component.valor).toBe(0);
    });

    it('não deve decrementar abaixo do valor permitido', () => {
        component.incrementar()
        expect(component.valor).toBe(1);
        component.decrementar()
        expect(component.valor).toBe(0);
        component.decrementar()
        expect(component.valor).toBe(0);
    });

    it('não deve incrementar acima do valor permitido', () => {
        for (let i = 0; i < 200; i++) {
            component.incrementar();
        }
        expect(component.valor).toBe(100);
    });

});