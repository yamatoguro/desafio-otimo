# Desafio Ótimo Tecnologia

## Table of Contents

- [Sobre](#about)
- [Endpoints](#endpoints)
- [Considerações](#consideracoes)

## Sobre <a name = "about"></a>

A aplicação consistem em um cadastro e gestão de dados de empresas divididas em Matriz e Filial, o frontend foi desenvolvido usando Angular 10 e o backend usando Spring Boot 2.4.0-SNAPSHOT.

## Endpoints <a name = "endpoints"></a>

```
EmpresaController
├─@method GET /Empresa
│    └─@return Obter todas as empresas
|         └─curl -X GET \
|             http://localhost:12333/empresa \
|             -H 'accept: application/json, text/plain, */*' \
|             -H 'cache-control: no-cache' \
|             -H 'dnt: 1' \
|             -H 'postman-token: 87d19862-45e2-bbcc-6d84-d3dca1d1ae65' \
|             -H 'sec-fetch-dest: empty' \
|             -H 'sec-fetch-mode: cors' \
|             -H 'sec-fetch-site: same-site' \
|             -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
│
├─@method GET /Empresa/{id}
│    └─@return Obter uma empresa por ID
|         └─curl -X GET \
|             http://localhost:12333/empresa/1 \
|             -H 'accept: application/json, text/plain, */*' \
|             -H 'cache-control: no-cache' \
|             -H 'dnt: 1' \
|             -H 'postman-token: cbbd1258-2231-e99b-2b6b-2def373d399e' \
|             -H 'sec-fetch-dest: empty' \
|             -H 'sec-fetch-mode: cors' \
|             -H 'sec-fetch-site: same-site' \
|             -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
|
├─@method POST /Empresa
│    └─@return Inserir um novoa empresa
|         └─curl -X POST \
|            http://localhost:12333/empresa \
|            -H 'accept: application/json, text/plain, */*' \
|            -H 'cache-control: no-cache' \
|            -H 'content-type: application/json' \
|            -H 'dnt: 1' \
|            -H 'postman-token: 7451d023-9f44-1a12-1623-e76fceeb4b26' \
|            -H 'sec-fetch-dest: empty' \
|            -H 'sec-fetch-mode: cors' \
|            -H 'sec-fetch-site: same-site' \
|            -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36' \
|            -d 'empresa=%7B%22endereco%22:%7B%22cep%22:%2270762540%22,%22estado%22:%22Distrito%20Federal%22,%22cidade%22:%22Bras%C3%ADlia%22,%22bairro%22:%22Asa%20Norte%22,%22logradouro%22:%22CLN%20112%20Bloco%20D%22,%22complemento%22:%22%22%7D,%22cnpj%22:%2200000000000000%22,%22tipo%22:%22Matriz%22,%22nome%22:%22Teste%22,%22razao_social%22:%22Raz%C3%A3o%20Teste%22,%22contato%22:%22+00000000000%22,%22email%22:%22email@dominio.com%22%7D'
|
├─@method PUT /Empresa/{id}
│    └─@return Alterar os dados de uma empresa
|         └─curl -X PUT \
|             http://localhost:12333/empresa/1 \
|             -H 'accept: application/json, text/plain, */*' \
|             -H 'cache-control: no-cache' \
|             -H 'content-type: application/json' \
|             -H 'dnt: 1' \
|             -H 'postman-token: 9e0eb6b8-1b1f-f66b-001c-befe13811c31' \
|             -H 'sec-fetch-dest: empty' \
|             -H 'sec-fetch-mode: cors' \
|             -H 'sec-fetch-site: same-site' \
|             -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36' \
|             -d 'empresa=%7B%22id%22:4,%22cnpj%22:%2237208839000120%22,%22tipo%22:%22Matriz%22,%22nome%22:%22Cipher%22,%22razao_social%22:%22Iago%22,%22contato%22:%22%2055999354110%22,%22email%22:%22oiago@hotmail.com%22,%22endereco%22:%7B%22id_endereco%22:2,%22cep%22:71725204,%22estado%22:%22Distrito%20Federal%22,%22bairro%22:%22Candangol%C3%A2ndia%22,%22cidade%22:%22Bras%C3%ADlia%22,%22logradouro%22:%22QR%202%20Conjunto%20D%22,%22complemento%22:%22%22%7D%7D'
│
└─@method DELETE /Empresa/{id}
    └─@return Excluir uma empresa
          └─curl -X DELETE \
              http://localhost:12333/empresa/1 \
              -H 'accept: application/json, text/plain, */*' \
              -H 'cache-control: no-cache' \
              -H 'dnt: 1' \
              -H 'postman-token: 9c21fd25-accc-88dc-b59d-51ce0d666dba' \
              -H 'sec-fetch-dest: empty' \
              -H 'sec-fetch-mode: cors' \
              -H 'sec-fetch-site: same-site' \
              -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36'
```

## Considerações <a name = "consideracoes"></a>

---
Houveram dificuldades decorrentes do tempo disponível para o desenvolvimento, o desafio se mostrou mais extenso que o previsto.

- Iago Faria dos Reis
- oiago@hotmail.com
- +55 61 99935-4110
