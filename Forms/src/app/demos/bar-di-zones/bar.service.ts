import { Injectable, Inject, Injector } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BAR_UNIDADE_CONFIG, BarUnidadeConfig } from './bar.config';

// export function BarFactory(http: HttpClient, config: BarUnidadeConfig) {
//     return new BarServices(http, config);
// }

export function BarFactory(http: HttpClient, injector: Injector) {

    // Service Locator - Você vai passar o nome da referência (BAR_UNIDADE_CONFIG) e ele vai localizar
    // dentro do container de injeção de dependência do mecanismo do Angular;
    return new BarServices(http, injector.get(BAR_UNIDADE_CONFIG));
}

@Injectable()
export class BarServices {

    constructor(
        private http: HttpClient,
        @Inject(BAR_UNIDADE_CONFIG) private config: BarUnidadeConfig
    ) { }

    public obterUnidade(): string {
        return 'Unidade ID: ' + this.config.unidadeId + ' Token: ' + this.config.unidadeToken
    }

    obterBebidas(): string {
        return 'Bebidas';
    }

    obterPorcoes(): string {
        return 'Porções';
    }

    obterRefeicoes(): string {
        return 'Refeições';
    }
}

export class BarServicesMock {

    constructor(private http: HttpClient) { }

    obterBebidas(): string {
        return 'Mock';
    }

    obterPorcoes(): string {
        return 'Mock';
    }

    obterRefeicoes(): string {
        return 'Mock';
    }
}

export abstract class BebidaService {
    obterBebidas: () => string
}