import { TestBed } from '@angular/core/testing';

import { Produto } from '../models/produto';
import { ProdutoService } from './produto.service';

const produtosFake: Produto[] = [{
    id: 1,
    nome: 'Teste',
    ativo: true,
    valor: 100,
    imagem: 'celular.jpg'
},
{
    id: 2,
    nome: 'Teste 2',
    ativo: true,
    valor: 200,
    imagem: 'gopro.jpg'
},
{
    id: 3,
    nome: 'Teste 3',
    ativo: true,
    valor: 300,
    imagem: 'laptop.jpg'
}];

const produtoFake: Produto = 
{
    id: 2,
    nome: 'Teste 2',
    ativo: true,
    valor: 200,
    imagem: 'gopro.jpg'
};

describe('ProdutoService', () => {

    let service: ProdutoService;

    beforeEach(() => {
        // declaração do módulo em tempo de execução para testes;
        const bed = TestBed.configureTestingModule({
            providers: [
                ProdutoService
            ]
        });

        // O serviço, diferente do componente, que você pega o fixture
        // e a instância do componente, aqui não, você pega o seu módulo
        // e chama o método get;
        // Esse get aqui é como se fosse um service locator, ele vai te devolver
        // a instância desse tipo de classe aqui que no caso é o serviço (ProdutoService);
        // Esse get ele te devolve uma instância de um objeto que foi declarado como um provider;
        service = bed.get(ProdutoService);
    });

    it('Deve retornar uma lista de produtos', () => {
        // Quando coloca esse método 'spyOn', eu estou falando pra ele criar aqui,
        // como se fosse um interceptor; então dentro do meu service (que é minha instância de ProdutoService,
        // existe um método 'obterTodos', quando ele for chamado, então ('and'), retorne o valor ProdutosFake,
        // então estamos fazendo aqui um Mock;
        spyOn(service, 'obterTodos').and.returnValue(produtosFake);
        // Toda vez que você precisar interagir com algum método que vai retornar valor,
        // porém você não quer ir lá buscar o valor, você usa esse 'spyOn' para setar o 'returnValue';


        let result = service.obterTodos('ativos');

        expect(result.length).toBe(3);

        expect(result).toEqual(produtosFake);
    });

    it('Deve retornar um produto', () => {
        spyOn(service, 'obterPorId').and.returnValue(produtoFake);

        let result = service.obterPorId(2)

        expect(result).toEqual(produtoFake);
        expect(result.id).toEqual(2);
    });
});
