import { NbDialogService } from '@nebular/theme';
import { EmpresaService } from './../../service/empresa.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Empresa } from '../../model/empresa';
import { CadastrarEmpresaComponent } from '../cadastrar-empresa/cadastrar-empresa.component';
import { Page } from '../../../assets/page';

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

  constructor(private service: EmpresaService, private dialogService: NbDialogService) {
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
      this.service.getEmpresasFiltradas(this.filtro, page).subscribe((empresas: Page) => {
        empresas.content.map((d: Empresa) => {
          this.data.push({
            id: d.id,
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
      this.service.getEmpresas(page).subscribe((empresas: Page) => {
        empresas.content.map((d: Empresa) => {
          this.data.push({
            id: d.id,
            cnpj: d.cnpj,
            tipo: d.tipo,
            razaoSocial: d.razao_social,
            nome: d.nome
          });
        });
      });
    });
  }

   onCreate() {
    this.dialogService.open(CadastrarEmpresaComponent, { context: { title: 'Cadastrar Empresa' } });
  }

   onEdit(id){
    this.service.getEmpresa(id).subscribe(e => {
        this.dialogService.open(CadastrarEmpresaComponent, { context: { title: 'Cadastrar Empresa', id: e.id, empresa: e } });
    });
  }

  onDelete(id): void {
    if (window.confirm('Tem certeza que deseja excluir a empresa?')) {
      this.service.excluirEmpresa(id).subscribe(x => {
        window.location.reload();
      });
    }
  }
}
