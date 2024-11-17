# Mercadinho Preço Bom

Programa de caixa de mercado simples feito com Tauri, React, Vite, SASS e NestJS, em Typescript, TSX (HTML5) e CSS3, para nota avaliativa. O sistema foi feito com o intutio do estudo de desenvolvimento de `sistemas desktop` e `programação orientada a objetos`.

O ``Vite`` compila os arquivos do Frontend para uma pasta estática `.dist`. O `Tauri` então compila essa pasta e gera um `installer`, que quando for executado instalará o arquivo binário `.exe` do sistema.

O `NestJS` instancia os seus módulos e suas dependências, fazendo a comunicação entre eles de maneira estruturada e organizada, através das camadas de `controller`, `service` e `repository`, organizadas nos `modules`.

O programa executável de Windows deve ser instalado no computador e se comunica com o servidor Backend externo. Pensando na forma como um caixa de verdade funcionaria, vários programas instalados em computadores diferentes se comunicariam com um servidor hospedado remotamente.

## Dependências

* Node ``20.16.0`` ou acima;
* npm ``10.6.0`` ou acima;
- Postgres `15` ou acima;
* Rust;
* As demais dependências serão instaladas pelo `npm`.

## Configurações

### 1. Banco de Dados
- Instale o ``Postgres`` na versão 15 ou acima;
- Instale o `pgAdmin4` ou o gerenciador de sua preferência;
- Conecte o `pgAdmin4` ao `servidor postgres` instalado;
- Crie um banco de dados com o nome ``mercadinho_preco_bom``.

### 2. Variáveis de ambiente no Backend
- Acesse a pasta `backend`;
- Acesse o arquivo `.env.example` e use-o como base para criar o arquivo `.env`, ainda dentro da pasta `backend`. Configure a porta para o Backend rodar (porta `3000` por exemplo). Configure as variáveis do banco de dados que você criou;
- Ao final, seu arquivo deve ser algo assim:
    ```bash
    DB_HOST = localhost # Ou 127.0.0.1 ou o servidor onde você hospedou seu banco de dados
    DB_PORT = 5432 # A porta que você configurou na instalação do banco
    DB_USERNAME = postgres # O nome de usuário que você configurou na instlação do banco de dados
    DB_PASSWORD = root # A senha que você configurou na instlação do banco de dados
    DB_NAME = mercadinho_preco_bom # Ou o nome de banco que você escolheu
    # DB_SCHEMA =

    CORS_WHITELIST = http://localhost:1420,http://tauri.localhost # NÃO ALTERE. tauri.localhost é a origem que o tauri usa para enviar as requisições quando compilado em exe.

    PORT = 3000 # A porta em que o Backend irá rodar
    ```
### 3. Variáveis de ambiente no Frontend
- Acesse a pasta `mercado`;
- Crie o arquivo `.env` de acordo com abaixo:
    ```bash
    VITE_BACKEND_URL = http://localhost:3000 # Onde seu servidor Backend está hospedado
    ```
## Rodar o projeto
Você pode querer rodar o projeto em `Produção` ou em `Ambiente de Desenvolvimento`.

### Executável + Backend (Produção)
#### Backend
- Acesse a pasta `backend` via terminal;
- Rode o comando abaixo, ele instalará as dependências, compilará o backend e rodará em modo de produção:
    ```bash
    npm run production
    ```
#### Programa executável

- Acesse a pasta `installers` e execute qualquer um dos instaladores Siga os passos do instalador.
- Caso o instalador não abra o programa, <b>execute o programa instalado</b>.

Caso queria você mesmo gerar o instalador, siga os passos abaixo:
- Acesse a pasta `mercado` via terminal e rode o comando abaixo, ele instalará as dependências, compilará o Frontend e compilará o projeto para binário:
    ```bash
    npm run tauri:build
    ```
- Seus instaladores foram gerados dentro da pasta `mercado/src-tauri/target/release/bundle`
### Ambiente de Desenvolvimento
#### Backend
- Acesse a pasta `backend` via terminal e rode o comando abaixo para instalar as dependências:
    ```bash
    npm i
    ```
- Execute o comando abaixo para rodar o Backend:
    ```bash
    npm run start:dev
    ```
#### Frontend e Programa simulado
- Acesse a pasta `mercado` via terminal e rode o comando abaixo para iniciar em desenvolvimento. Ele rodará um programa simulando o que será gerado em produção e rodará também em uma porta que pode ser acessada pelo navegador.
    ```bash
    npm run tauri dev
    ```