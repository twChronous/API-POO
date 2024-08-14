# Express Backend Server

Este projeto é um servidor backend simples construído com [Express](https://expressjs.com/) e TypeScript, seguindo os princípios de programação orientada a objetos (OOP).

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado na sua máquina:

- [Bun](https://bun.sh/) (recomendado)
- [Node.js](https://nodejs.org/) (caso queira utilizar o Node ao invés do Bun, use a versão 14 ou superior)
- [Bruno](https://www.usebruno.com/) (recomendado)
- [TypeScript](https://www.typescriptlang.org/)

## Configuração do Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/twChronous/projetodoiso.git
   cd projetodoiso
   ```

2. Instale as dependências do projeto:

   Usando Bun:
   ```bash
   bun install
   ```

   Usando npm:
   ```bash
   npm install
   ```

3. Configure o TypeScript:

   Certifique-se de que o arquivo `tsconfig.json` esteja configurado corretamente para suportar módulos ES6 e outras opções desejadas.

## Estrutura do Projeto

A estrutura do projeto segue um design orientado a objetos. Aqui estão os diretórios principais e seus propósitos:

- **bruno_reqs/**: Contém os arquivos de ferramentas de teste do [Bruno](https://www.usebruno.com/).
- **src/**: Contém o código-fonte principal do projeto.
  - **database/**: Faz conexão com o banco de dados além de criar os schemas necessários.
  - **models/**: Contém definições de modelos e esquemas de dados.
  - **routes/**: Define as rotas para o servidor.
  - **utils/**: Inclui funcionalidades auxiliares ou integradas.
  - **Client.ts**: Arquivo principal do código, onde se inicializa todo o servidor.
  - **index.ts**: Ponto de entrada do aplicativo, onde o servidor é instanciado.
- **.env**: Contém configurações e dados sensíveis do projeto.

## Executando o Servidor

Para rodar o servidor, execute o seguinte comando:

Usando Bun:
```bash
bun run src/index.ts
```

Usando npm (após compilar TypeScript para JavaScript):
```bash
npm start
```

O servidor será iniciado na porta definida (por padrão, `3333`). Você pode acessar o servidor no navegador ou via ferramenta de API no endereço: `http://localhost:3333`.

## Endpoints Disponíveis

### GET /

- **Descrição**: Retorna uma mensagem de boas-vindas.
- **Exemplo de Requisição**:

  ```http
  GET / HTTP/1.1
  Host: localhost:3333
  ```

- **Exemplo de Resposta**:

  ```json
  {
    "message": "Hello World"
  }
  ```

## Ferramenta de Verificação

Este projeto utiliza o [Bruno](https://www.usebruno.com/) para verificar e testar as rotas, garantindo que todas estejam funcionando conforme o esperado.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
