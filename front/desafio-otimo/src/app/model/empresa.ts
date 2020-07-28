import { Endereco } from './endereco';
export class Empresa {
  id: number;
  cnpj: String;
  tipo: String;
  nome: String;
  razao_social: String;
  contato: String;
  email: String;
  endereco: Endereco;
}
