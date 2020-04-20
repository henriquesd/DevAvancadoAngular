import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { NgBrazil } from 'ng-brazil';
import { TextMask } from 'ng-brazil';
import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { rootRouterConfig, AppRoutingModule } from './app.routes';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { AuthGuard } from './services/app.guard';
import { CadastroGuard } from './services/cadastro.guard';
import { FilmesComponent } from './demos/pipes/filmes/filmes.component';
import { FileSizePipe } from './demos/pipes/filmes/filesize.pipe';
import { ImageFormaterPipe } from './demos/pipes/filmes/image.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BarModule } from './demos/bar-di-zones/bar.module';
import { BarServices } from './demos/bar-di-zones/bar.service';
import { Provider } from '@angular/compiler/src/compiler_facade_interface';
import { BAR_UNIDADE_CONFIG } from './demos/bar-di-zones/bar.config';
import { TodoModule } from './demos/todo-list/todo.module';

export const BAR_PROVIDERS: Provider[] = [
  BarServices
  // pode adicionar outros e depois usar a coleção BAR_PROVIDERS;
];

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    CadastroComponent,
    FilmesComponent,
    FilmesComponent,
    FileSizePipe,
    ImageFormaterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NavegacaoModule,
    HttpClientModule,
    TextMask.TextMaskModule,
    NgBrazil,
    CustomFormsModule,
    //[RouterModule.forRoot(rootRouterConfig, { useHash: false})]
    AppRoutingModule,
    BarModule.forRoot({
      unidadeId: 1000,
      unidadeToken: 'eca938c99a0e9ff91029dc'
    }),
    TodoModule
  ],
  providers: [
    AuthGuard,
    CadastroGuard,
    // aqui diz que link básico começa com a barra; então ele entende que tudo da barra do domínio para >, é sua base de navegação,
    //  e quando você tem essa sub-rotas ele acaba não entendendo para montar o caminho exato dos recursos do Angular para você baixar via JavaScript;
    //  para resolver isso pode declarar a base de outra forma, adicionado no index.html o '<base href="/">' logo abaixo do head; você estará dizendo
    //  quase a mesma coisa, só que você não vai criar aquela limitação;
    // {provide: APP_BASE_HREF, useValue: '/'} 
    // BAR_PROVIDERS
    // { provide: BAR_UNIDADE_CONFIG, useValue: config }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
