import { Component, OnInit } from "@angular/core";
import { BarServices, BarServicesMock } from './bar.service';

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    providers: [
        // { provide: BarServices, useClass: BarServices }
        // Desta maneira é possível utilizar outras classes;
        // { provide: BarServices, useClass: BarServicesMock }
        { provide: BarServices, useClass: BarServices }
    ]
})
export class BarComponent implements OnInit {

    barBebida1: string;

    constructor(private barServices: BarServices) { }

    ngOnInit(): void {
        this.barBebida1 = this.barServices.obterBebidas();
    }
    
}