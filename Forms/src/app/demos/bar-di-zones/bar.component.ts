import { Component, OnInit, Inject, Injector } from "@angular/core";
import { BarServices, BarServicesMock, BarFactory } from './bar.service';
import { BarUnidadeConfig, BAR_UNIDADE_CONFIG } from './bar.config';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    providers: [
        // { provide: BarServices, useClass: BarServices }
        // Desta maneira é possível utilizar outras classes;
        // { provide: BarServices, useClass: BarServicesMock }
        // { provide: BarServices, useClass: BarServices },
        {
            provide: BarServices, useFactory: BarFactory,
            // coleção de dependências:
            deps: [
                // HttpClient, BAR_UNIDADE_CONFIG
                HttpClient, Injector
            ]
        }
    ]
})
export class BarComponent implements OnInit {

    ConfigManual: BarUnidadeConfig;
    Config: BarUnidadeConfig;
    barBebida1: string;
    dadosUnidade: string;

    constructor(
        private barServices: BarServices,
        @Inject('ConfigManualUnidade') private ApiConfigManual: BarUnidadeConfig,
        @Inject(BAR_UNIDADE_CONFIG) private ApiConfig: BarUnidadeConfig
        ) { }

    ngOnInit(): void {
        this.barBebida1 = this.barServices.obterBebidas();
        this.ConfigManual = this.ApiConfigManual;
        this.Config = this.ApiConfig;

        this.dadosUnidade = this.barServices.obterUnidade();
    }
    
}