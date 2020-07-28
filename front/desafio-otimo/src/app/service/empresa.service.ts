import { Cep } from './../model/cep';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, HostBinding } from '@angular/core';
import { Empresa } from '../model/empresa';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {

  private index: number = 0;

  @HostBinding('class')
  classes = 'items-rows';

  constructor(private http: HttpClient, private toastrService: NbToastrService) { }

  url = 'http://localhost:12333/empresa';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getEmpresa(id: string): Observable<Empresa> {
    return this.http.get<Empresa>(this.url + "/" + id).pipe(retry(2), catchError(this.handleError));
  }

  getEmpresas(page) {
    var params: HttpParams = new HttpParams().set('page', page);
    return this.http.get(this.url, { params }).pipe(retry(2), catchError(this.handleError));
  }

  getEmpresasFiltradas(filtro: string, page) {
    var params: HttpParams = new HttpParams().set('page', page).set('searchTerm', filtro);
    return this.http.get(this.url + "/filter", { params }).pipe(retry(2), catchError(this.handleError));
  }

  getSize(filtro) {
    if (filtro != undefined) {
      var params: HttpParams = new HttpParams().set('searchTerm', filtro);
    }
    return this.http.get<number>(this.url + '/count', { params }).pipe(retry(2), catchError(this.handleError));
  }

  getCEP(cep){
    var urlCEP = "https://viacep.com.br/ws/" + cep + "/json/";
    return this.http.get<Cep>(urlCEP);
  }

  cadastrarEmpresa(empresa: Empresa): Observable<Empresa> {
    var params: HttpParams = new HttpParams().set('empresa', JSON.stringify(empresa));
    return this.http.post<Empresa>(this.url, params, this.httpOptions);
  }

  atualizarEmpresa(id, empresa: Empresa): Observable<Empresa> {
    var params: HttpParams = new HttpParams().set('empresa', JSON.stringify(empresa));
    return this.http.put<Empresa>(this.url + '/' + id, params, this.httpOptions);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    this.showToast('top-right', errorMessage, 'Danger');
    return throwError(errorMessage);
  }

  showToast(position, status, type) {
    const duration = 1000;
    this.toastrService.show(
      status || 'Primary',
      `Erro`,
      { duration, position, status });
  }
}
