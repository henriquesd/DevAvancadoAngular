import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BarComponent } from './bar.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { BarUnidadeConfig, BAR_UNIDADE_CONFIG } from './bar.config';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BarComponent
    ],
    exports: [
        BarComponent
    ]
})
export class BarModule {
    // O nome forRoot não é obrigatório, pode usar qualquer nome;
    static forRoot(config: BarUnidadeConfig) : ModuleWithProviders {
        return {
            ngModule: BarModule,
            // A diferença de por o providers aqui, ao invés de por no @NgModule acima,
            // é que aqui você vai fornecer os providers conforme o método que for chamado;
            providers: [
                { provide: 'ConfigManualUnidade', useValue: config },
                { provide: BAR_UNIDADE_CONFIG, useValue: config }
            ]
        }
    }

    static forChild() {

    }
 }