import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { DisplayMessage, ValidationMessages, GenericValidator } from 'src/app/utils/generic-form-validation';

import { Observable, fromEvent, merge } from 'rxjs';

import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  
  constructor(private fb: FormBuilder,
    private contaService: ContaService) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);
    
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  adicionarConta() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      // Como os nomes dos campos sao exatamente os dados do meu objeto usuario, que são
      // exatamente os mesmos dados que eu vou precisar mandar no corpo, somente é preciso
      // fazer esse mapeamento, senão você teria q montar na mão um mapeamento de um objeto
      // onde o nome de um campo é diferente de outro, por isso é melhor sempre seguir a
      // nomenclatura da documentação do seu back end (conforme vemos no swagger);
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
    
      this.contaService.registrarUsuario(this.usuario);
    }
  }
}
