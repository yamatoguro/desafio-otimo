import { EmpresaService } from './service/empresa.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarEmpresaComponent } from './component/cadastrar-empresa/cadastrar-empresa.component';
import { ListarEmpresaComponent } from './component/listar-empresa/listar-empresa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbCheckboxModule,
  NbRadioModule,
  NbButtonModule,
  NbDialogModule,
  NbToastrModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarEmpresaComponent,
    ListarEmpresaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbRadioModule,
    NbButtonModule,
    NbToastrModule.forRoot(),
    FormsModule,
    NbDialogModule.forRoot()
  ],
  providers: [EmpresaService],
  bootstrap: [AppComponent],
})
export class AppModule { }
