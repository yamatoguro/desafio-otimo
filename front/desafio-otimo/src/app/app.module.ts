import { ListarEmpresaService } from './service/listar-empresa.service';
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
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import { config } from 'rxjs';

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
    NbEvaIconsModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbRadioModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbToastrModule.forRoot(config)
  ],
  providers: [ListarEmpresaService],
  bootstrap: [AppComponent],
})
export class AppModule { }
