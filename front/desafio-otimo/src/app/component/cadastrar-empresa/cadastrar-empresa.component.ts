
import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Empresa } from '../../model/empresa';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css'],
})
export class CadastrarEmpresaComponent {

  @Input() title: string;
  @Input() empresa: Empresa;

  constructor(protected ref: NbDialogRef<CadastrarEmpresaComponent>) {}

  dismiss() {
    this.ref.close();
  }
}
