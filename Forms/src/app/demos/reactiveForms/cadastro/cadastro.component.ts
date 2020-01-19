import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';
  
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

    // this.cadastroForm = this.fb.group({
    //   nome: [''],
    //   cpf: [''],
    //   email: [''],
    //   senha: [''],
    //   senhaConfirmacao: ['']
    // });

    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: [''],
      email: ['', [Validators.required, Validators.email]],
      senha: [''],
      senhaConfirmacao: ['']
    });
  }

  adicionarUsuario() {
    // let x = this.cadastroForm.value;

    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    }
    else {
      this.formResult = "Não submeteu!!!";
    }
  }

}
