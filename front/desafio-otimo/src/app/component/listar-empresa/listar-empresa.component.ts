import { NbDialogService } from '@nebular/theme';
import { ListarEmpresaService } from './../../service/listar-empresa.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Empresa } from '../../model/empresa';
import { FormsModule } from '@angular/forms';
import { CadastrarEmpresaComponent } from '../cadastrar-empresa/cadastrar-empresa.component';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css'],
})
export class ListarEmpresaComponent implements OnInit {
  filtro: string = '';

  //✎✓
  settings = {
    mode: external,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      cnpj: {
        title: 'CNPJ',
        type: 'string',
        editable: false
      },
      nome: {
        title: 'Nome',
        type: 'string',
        editable: false
      },
      razaoSocial: {
        title: 'Razão Social',
        type: 'string',
        editable: false
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
        editable: false
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ListarEmpresaService, private dialogService: NbDialogService) {
    this.getEmpresas()
  }

  ngOnInit(): void { }

  onFilter() {
    console.log('FILTRO => ' + this.filtro);
    if(this.filtro.length === 0){
      this.getEmpresas();
    } else {
      this.getEmpresasComFiltro();
    }
  }

  getEmpresasComFiltro(){
    var data = [];
    this.service.getEmpresasFiltradas(this.filtro).subscribe(empresas => {
      console.log(empresas);
      empresas.content.map((d: Empresa) => {
        data.push({
          cnpj: d.cnpj,
          tipo: d.tipo,
          razaoSocial: d.razao_social,
          nome: d.nome
        });
      });
      console.log(data);
      this.source.load(data);
    });
  }

  getEmpresas(){
    this.source.reset();
    var data = [];
    this.service.getEmpresas().subscribe(empresas => {
      console.log(empresas);
      empresas.content.map((d: Empresa) => {
        data.push({
          cnpj: d.cnpj,
          tipo: d.tipo,
          razaoSocial: d.razao_social,
          nome: d.nome
        });
      });
      console.log(data);
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  protected open() {
    this.dialogService.open(CadastrarEmpresaComponent, { context: {title: 'Teste'} });
  }
}
