
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Empresa } from '../../model/empresa';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Endereco } from 'src/app/model/endereco';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css'],
})
export class CadastrarEmpresaComponent implements OnInit {

  @Input() title: string;
  @Input() empresa: Empresa;
  cnpj: FormControl;
  tipo: FormControl;
  nome: FormControl;
  contato: FormControl;
  email: FormControl;
  cep: FormControl;
  estado: FormControl;
  bairro: FormControl;
  cidade: FormControl;
  logradouro: FormControl;
  complemento: FormControl;

  constructor(protected ref: NbDialogRef<CadastrarEmpresaComponent>) {
    if (this.empresa === undefined) {
      this.empresa = new Empresa();
      this.empresa.endereco = new Endereco;
    }
    this.cnpj = new FormControl(this.empresa.cnpj, Validators.required);
    this.tipo = new FormControl(this.empresa.tipo, Validators.required);
    this.nome = new FormControl(this.empresa.nome, Validators.required);
    this.contato = new FormControl(this.empresa.telefone, Validators.required);
    this.email = new FormControl(this.empresa.email, Validators.required);
    this.cep = new FormControl(this.empresa.endereco.cep, Validators.required);
    this.estado = new FormControl(this.empresa.endereco.estado, Validators.required);
    this.bairro = new FormControl(this.empresa.endereco.bairro, Validators.required);
    this.cidade = new FormControl(this.empresa.endereco.cidade, Validators.required);
    this.logradouro = new FormControl(this.empresa.endereco.logradouro, Validators.required);
    this.complemento = new FormControl(this.empresa.endereco.complemento);
  }
  ngOnInit(): void {

  }

  dismiss() {
    this.ref.close();
  }
}
