import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // // aspas em branco porque aqui vai o valor que vai preencher o formulário,
    // e como é um formulário de cadastro não vai vir nada preenchido;
    // let nome = new FormControl('');

    // this.cadastroForm = new FormGroup({
    //   nome: new FormControl(''),
    //   cpf: new FormControl(''),
    //   email: new FormControl(''),
    //   senha: new FormControl(''),
    //   senhaConfirmacao: new FormControl('')
    // });

    this.cadastroForm = this.fb.group({
      nome: [''],
      cpf: [''],
      email: [''],
      senha: [''],
      senhaConfirmacao: ['']
    });
  }

  adicionarUsuario() {
    debugger;
    let x = this.cadastroForm.value;
  }

}
