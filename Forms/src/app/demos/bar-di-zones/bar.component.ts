import { Component, OnInit, Inject, Injector, NgZone } from "@angular/core";
import { BarServices, BarServicesMock, BarFactory, BebidaService } from './bar.service';
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
        },
        { provide: BebidaService, useExisting: BarServices }
    ]
})
export class BarComponent implements OnInit {

    ConfigManual: BarUnidadeConfig;
    Config: BarUnidadeConfig;
    barBebida1: string;
    barBebida2: string;
    dadosUnidade: string;

    constructor(
        private barServices: BarServices,
        @Inject('ConfigManualUnidade') private ApiConfigManual: BarUnidadeConfig,
        @Inject(BAR_UNIDADE_CONFIG) private ApiConfig: BarUnidadeConfig,
        private bebidaService : BebidaService,
        private ngZone: NgZone
        ) { }

    ngOnInit(): void {
        this.barBebida1 = this.barServices.obterBebidas();
        this.ConfigManual = this.ApiConfigManual;
        this.Config = this.ApiConfig;
        this.dadosUnidade = this.barServices.obterUnidade();
        
        this.barBebida2 = this.bebidaService.obterBebidas();
    }

    public progress: number = 0;
    public label: string;

    processWithinAngularZone() {
        this.label = 'dentro';
        this.progress = 0;
        this._increaseProgress(() => console.log('Finalizado por dentro do Angular!'));
    }

    processOutsideOfAngularZone() {
        this.label = 'fora';
        this.progress = 0;
        this.ngZone.runOutsideAngular(() => {
        this._increaseProgress(() => {
            this.ngZone.run(() => { console.log('Finalizado fora!'); });
        });
      });
    }
    
    // Ele passa um callback, que é um método void (doneCallback),
    // e esse callback só vai ser chamado quando o progresso for 100,
    // enquanto for menor que 100 ele ta continuando setando o _increaseProgress,
    // quando ele finalizar ele chama o método callback (doneCallback), que no caso
    // ele vai trazer esse processamento para dentro do Angular informando então que
    // ele chegou em 100% (this.ngZone.run(() => { console.log('Finalizado fora!'); }););
    _increaseProgress(doneCallback: () => void) {
        this.progress += 1;
        console.log(`Progresso atual: ${this.progress}%`);
    
        if (this.progress < 100) {
          window.setTimeout(() => this._increaseProgress(doneCallback), 10);
        } else {
          doneCallback();
        }
      }
}