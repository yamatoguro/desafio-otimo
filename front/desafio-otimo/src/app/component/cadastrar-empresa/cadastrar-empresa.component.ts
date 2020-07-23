
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Empresa } from '../../model/empresa';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css'],
})
export class CadastrarEmpresaComponent implements OnInit{

  @Input() title: string;
  @Input() empresa: Empresa;
  formEmpresa: FormGroup;

  constructor(protected ref: NbDialogRef<CadastrarEmpresaComponent>) {

  }
  ngOnInit(): void {
    this.formEmpresa = new FormGroup({
      'cnpj': new FormControl(this.empresa.cnpj, Validators.required),
      'tipo': new FormControl(this.empresa.tipo, Validators.required),
      'nome': new FormControl(this.empresa.nome, Validators.required),
      'contato': new FormControl(this.empresa.telefone, Validators.required),
      'email': new FormControl(this.empresa.email, Validators.required),
      'cep': new FormControl(this.empresa.endereco.cep, Validators.required),
      'estado': new FormControl(this.empresa.endereco.estado, Validators.required),
      'bairro': new FormControl(this.empresa.endereco.bairro, Validators.required),
      'cidade': new FormControl(this.empresa.endereco.cidade, Validators.required),
      'logradouro': new FormControl(this.empresa.endereco.logradouro, Validators.required),
      'complemento': new FormControl(this.empresa.endereco.complemento),
    });
  }

  dismiss() {
    this.ref.close();
  }
}
