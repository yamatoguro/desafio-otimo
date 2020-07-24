import { NbDialogService } from '@nebular/theme';
import { ListarEmpresaService } from './../../service/listar-empresa.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Empresa } from '../../model/empresa';
import { CadastrarEmpresaComponent } from '../cadastrar-empresa/cadastrar-empresa.component';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css'],
})
export class ListarEmpresaComponent implements OnInit {
  filtro: string = '';
  data = [];
  current = 0;
  size = 0;

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

  getEmpresasComFiltro(page) {
    this.service.getSize(this.filtro).subscribe(n => {
      this.size = n;
      this.data = [];
      this.service.getEmpresasFiltradas(this.filtro, page).subscribe(empresas => {
        empresas.content.map((d: Empresa) => {
          this.data.push({
            cnpj: d.cnpj,
            tipo: d.tipo,
            razaoSocial: d.razao_social,
            nome: d.nome
          });
        });
      });
    });
  }

  getEmpresas(page) {
    this.service.getSize(undefined).subscribe(n => {
      this.size = n;
      this.data = [];
      this.service.getEmpresas(page).subscribe(empresas => {
        empresas.content.map((d: Empresa) => {
          this.data.push({
            cnpj: d.cnpj,
            tipo: d.tipo,
            razaoSocial: d.razao_social,
            nome: d.nome
          });
        });
      });
    });
  }

  protected onCreate() {
    this.dialogService.open(CadastrarEmpresaComponent, { context: { title: 'Cadastrar Empresa' } });
  }

  protected onEdit(cnpj){
    var empresa: Empresa = new Empresa();
    this.data.forEach(e => {
      if (e.cnpj.includes(cnpj)) {
        empresa = e;
        this.dialogService.open(CadastrarEmpresaComponent, { context: { title: 'Cadastrar Empresa', empresa: empresa } });
      }
    });
  }

  protected onDelete(){
    this.dialogService.open(CadastrarEmpresaComponent, { context: { title: 'Cadastrar Empresa' } });
  }
}
