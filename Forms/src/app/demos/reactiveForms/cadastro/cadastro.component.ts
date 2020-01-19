import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';

import { Usuario } from './models/usuario';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ng2-validation';
import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validation';
import { fromEvent, Observable, merge } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';
  MASKS = utilsBr.MASKS;
  
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder) {
    
    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres', // essa chave 'minlength' é definida com base no Validator;
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        cpf: 'CPF em formato inválido'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      senha: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

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

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      // nome: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: senha,
      senhaConfirmacao: senhaConfirm
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // vai aplicar para todos os itens da coleção, a implementação; o que faz para um, ele aplica pra todos;
    // vai fazer o subscribe uma vez, para toda a coleção de Observables;
    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
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
