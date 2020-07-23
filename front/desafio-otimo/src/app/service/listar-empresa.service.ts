import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, HostBinding } from '@angular/core';
import { Empresa } from '../model/empresa';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ListarEmpresaService {
  private index: number = 0;

  @HostBinding('class')
  classes = 'items-rows';

  constructor(private http: HttpClient,private toastrService: NbToastrService) { }

  url = 'http://localhost:12333/empresa';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getEmpresas(page) {
    var params: HttpParams = new HttpParams().set('page', page);
    console.log(params.keys());
    return this.http.get<Empresa[]>(this.url, {params}).pipe(retry(2), catchError(this.handleError));
  }

  getEmpresasFiltradas(filtro: string, page){
    var params: HttpParams = new HttpParams()
    .set('page', page)
    .set('searchTerm', filtro);
    console.log(params.keys());
    return this.http.get<Empresa[]>(this.url, {params}).pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
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
