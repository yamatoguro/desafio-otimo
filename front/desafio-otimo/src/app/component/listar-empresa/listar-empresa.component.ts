import { EmpresaTable } from './../../model/dto/empresaTable';
import { ListarEmpresaService } from './../../service/listar-empresa.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../assets/smart-table';
import { Empresa } from '../../model/empresa';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css'],
})
export class ListarEmpresaComponent implements OnInit {

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

  constructor(private service: ListarEmpresaService) {
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

  ngOnInit(): void { }

  onEdit() {
    this.service.showToast('top-right', 'TESTESTESTESTESTESTESTESTE', 'Success');
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
