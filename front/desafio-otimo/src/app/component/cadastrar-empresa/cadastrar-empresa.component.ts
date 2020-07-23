
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Empresa } from '../../model/empresa';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css'],
})
export class CadastrarEmpresaComponent implements OnInit{

  @Input() title: string;
  @Input() empresa: Empresa;
  formEmpresa: FormControl;

  constructor(protected ref: NbDialogRef<CadastrarEmpresaComponent>) {

  }
  ngOnInit(): void {
    this.formEmpresa = new FormControl();
  }

  dismiss() {
    this.ref.close();
  }
}
