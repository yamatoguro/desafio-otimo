import { NbDialogService } from '@nebular/theme';
import { ListarEmpresaService } from './../../service/listar-empresa.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Empresa } from '../../model/empresa';
import { FormsModule } from '@angular/forms';
import { CadastrarEmpresaComponent } from '../cadastrar-empresa/cadastrar-empresa.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css'],
})
export class ListarEmpresaComponent implements OnInit {
  filtro: string = '';
  data = [];
  current = 0;
  currentSize = 0;
  //✎✓

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ListarEmpresaService, private dialogService: NbDialogService) {
    this.getEmpresas(0)
  }

  ngOnInit(): void { }

  onFilter() {
    if (this.filtro.length === 0) {
      this.getEmpresas(0);
    } else {
      this.getEmpresasComFiltro(0);
    }
  }

  next() {
    if (this.filtro.length === 0) {
      this.getEmpresas(++this.current);
    } else {
      this.getEmpresasComFiltro(++this.current);
    }
  }

  back() {
    if (this.filtro.length === 0) {
      this.getEmpresas(--this.current);
    } else {
      this.getEmpresasComFiltro(--this.current);
    }
  }

  protected open() {
    this.dialogService.open(CadastrarEmpresaComponent, { context: { title: 'Cadastrar Empresa' } });
  }

  getEmpresasComFiltro(page) {
    this.service.getEmpresasFiltradas(this.filtro, page).subscribe(empresas => {
      this.data = [];
      this.currentSize = empresas.content.length;
      console.log(this.currentSize);
      empresas.content.map((d: Empresa) => {
        this.data.push({
          cnpj: d.cnpj,
          tipo: d.tipo,
          razaoSocial: d.razao_social,
          nome: d.nome
        });
      });
    });
  }

  getEmpresas(page) {
    this.service.getEmpresas(page).subscribe(empresas => {
      this.data = [];
      this.currentSize = empresas.content.length;
      console.log(this.currentSize);
      empresas.content.map((d: Empresa) => {
        this.data.push({
          cnpj: d.cnpj,
          tipo: d.tipo,
          razaoSocial: d.razao_social,
          nome: d.nome
        });
      });
    });
  }
}
