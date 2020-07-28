import { Cep } from './../../model/cep';
import { EmpresaService } from './../../service/empresa.service';

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
  @Input() id: number;
  @Input() empresa: Empresa;
  cnpj: FormControl;
  tipo: FormControl;
  nome: FormControl;
  razao_social: FormControl;
  contato: FormControl;
  email: FormControl;
  cep: FormControl;
  estado: FormControl;
  bairro: FormControl;
  cidade: FormControl;
  logradouro: FormControl;
  complemento: FormControl;
  tipos = [{nome:"Matriz"}, {nome:"Filial"}];

  constructor(protected ref: NbDialogRef<CadastrarEmpresaComponent>, private service: EmpresaService) {
    if (this.empresa === undefined) {
      this.empresa = new Empresa();
      this.empresa.endereco = new Endereco;
    }
    this.cnpj = new FormControl(this.empresa.cnpj, Validators.required);
    this.tipo = new FormControl(this.empresa.tipo, Validators.required);
    this.nome = new FormControl(this.empresa.nome, Validators.required);
    this.razao_social = new FormControl(this.empresa.razao_social, Validators.required);
    this.contato = new FormControl(this.empresa.contato, Validators.required);
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

  buscarCEP() {
    this.service.getCEP(this.empresa.endereco.cep).subscribe((c:Cep) => {
      this.empresa.endereco.estado = this.getNomeEstado(c.uf);
      this.empresa.endereco.bairro = c.bairro;
      this.empresa.endereco.cidade = c.localidade;
      this.empresa.endereco.logradouro = c.logradouro;
      this.empresa.endereco.complemento = c.complemento;
    });
  }

  cadastra(){
    this.service.cadastrarEmpresa(this.empresa).subscribe(x => {
      window.location.reload();
    });
  }

  atualiza(){
    this.service.atualizarEmpresa(this.empresa.id, this.empresa).subscribe(x => {
      window.location.reload();
    });
  }

  dismiss() {
    this.ref.close();
  }

  getNomeEstado(estado: string) {
    switch (estado) {
      case 'AC': { return 'Acre'; break; }
      case 'AL': { return 'Alagoas'; break; }
      case 'AP': { return 'Amapá'; break; }
      case 'AM': { return 'Amazonas'; break; }
      case 'BA': { return 'Bahia'; break; }
      case 'CE': { return 'Ceará'; break; }
      case 'DF': { return 'Distrito Federal'; break; }
      case 'ES': { return 'Espírito Santo'; break; }
      case 'GO': { return 'Goiás'; break; }
      case 'MA': { return 'Maranhão'; break; }
      case 'MT': { return 'Mato Grosso'; break; }
      case 'MS': { return 'Mato Grosso do Sul'; break; }
      case 'MG': { return 'Minas Gerais'; break; }
      case 'PA': { return 'Pará'; break; }
      case 'PB': { return 'Paraíba'; break; }
      case 'PR': { return 'Paraná'; break; }
      case 'PE': { return 'Pernambuco'; break; }
      case 'PI': { return 'Piauí'; break; }
      case 'RJ': { return 'Rio de Janeiro'; break; }
      case 'RN': { return 'Rio Grande do Norte'; break; }
      case 'RS': { return 'Rio Grande do Sul'; break; }
      case 'RO': { return 'Rondônia'; break; }
      case 'RR': { return 'Roraima'; break; }
      case 'SC': { return 'Santa Catarina'; break; }
      case 'SP': { return 'São Paulo'; break; }
      case 'SE': { return 'Sergipe'; break; }
      case 'TO': { return 'Tocantins'; break; }
    }
  }
}
