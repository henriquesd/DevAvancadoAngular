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

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    CadastroComponent,
    FilmesComponent,
    FilmesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NavegacaoModule,
    TextMask.TextMaskModule,
    NgBrazil,
    CustomFormsModule,
    //[RouterModule.forRoot(rootRouterConfig, { useHash: false})]
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    CadastroGuard
    // aqui diz que link básico começa com a barra; então ele entende que tudo da barra do domínio para >, é sua base de navegação,
    //  e quando você tem essa sub-rotas ele acaba não entendendo para montar o caminho exato dos recursos do Angular para você baixar via JavaScript;
    //  para resolver isso pode declarar a base de outra forma, adicionado no index.html o '<base href="/">' logo abaixo do head; você estará dizendo
    //  quase a mesma coisa, só que você não vai criar aquela limitação;
    // {provide: APP_BASE_HREF, useValue: '/'} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
