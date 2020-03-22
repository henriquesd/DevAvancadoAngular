import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.services';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styles: []
})
export class EditarProdutoComponent implements OnInit {

  produto: Produto;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.produto = this.produtoService.obterPorId(params['id']);

        // console.log(params['id']); // esse nome utilizado aqui deve ser o mesmo nome usado no produto.route.ts;
      });
  }

  salvar() {
    // fazer comunicação com backend

    this.router.navigate(['/produtos']); // vai invocar a rota sem o usuário perceber;
    // this.router.navigate(['/produtos', 2]);
    // this.router.navigateByUrl(['/produtos']); // vai recarregar a aplicação como se tivesse feito a navegação pelo browser (não é visualmente perceptível);

  }
  
}
