import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.services';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styles: []
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.produto = this.produtoService.obterPorId(params['id']);

        // console.log(params['id']); // esse nome utilizado aqui deve ser o mesmo nome usado no produto.route.ts;
      });
  }
  
}
