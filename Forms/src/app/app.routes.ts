import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { AuthGuard } from './services/app.guard';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'sobre', component: SobreComponent },
    { path: 'cadastro', component: CadastroComponent },
    // o componente está dentro do módulo; para chamar o módulo está configurado usando lazy loading (recomendado) \/;
    { path: 'produtos',
            loadChildren: () => import('./demos/arquitetura-componentes/produto.module')
            .then(m => m.ProdutoModule)},
    { path: 'admin', 
            loadChildren: () => import('./admin/admin.module')
            .then(m => m.AdminModule),
            // o canLoad, ele vai dar uma diretiva se eu devo ou não carregar este módulo, já que ele é lazy-loading,
            // por exemplo, se você não tem permissão para acessar o módulo de Admin, se não tem permissão, para que que eu vou
            // carregar aquele JavaScript extra, se eu nem posso acessar? Então o canLoad diz se eu devo permitir que o Angular
            // entregue este módulo como parte da aplicação; e dentro dele eu vou colocar o guarda da rota, é o serviço, que vai trabalhar pra mim;
            canLoad: [AuthGuard], canActivate: [AuthGuard]},
    // esta configuração sempre deve vir por último \/;
    { path: '**', component: NotFoundComponent },

];

@NgModule({
    imports:[
        // não deixar ativado o enableTracing em produção (isso deixa o console um pouco carregado),
        // use apenas para alguma investigação, para entender algum comportamento; para produção deixe como false;
        RouterModule.forRoot(rootRouterConfig, { enableTracing: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}