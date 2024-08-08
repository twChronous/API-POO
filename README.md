# Express Backend Server

Este projeto é um servidor backend simples construído com [Express](https://expressjs.com/) e TypeScript, seguindo os princípios de programação orientada a objetos (OOP). 

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado na sua máquina:

- [Bun](https://bun.sh/) (recomendado)
- [Node.js](https://nodejs.org/) (caso queira utilizar o node ao invés do bun, use versão 14 ou superior)
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

- **src/**: Contém o código-fonte principal do projeto.
  - **controllers/**: Armazena os controladores que gerenciam a lógica de negócio.
  - **models/**: Contém definições de modelos e esquemas de dados.
  - **routes/**: Define as rotas para o servidor.
  - **services/**: Inclui serviços que fornecem funcionalidades auxiliares ou integradas.
  - **index.ts**: Ponto de entrada do aplicativo, onde o servidor é inicializado.

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

O servidor será iniciado na porta definida (por padrão, `8080`). Você pode acessar o servidor no navegador ou via ferramenta de API no endereço: `http://localhost:8080`.

## Endpoints Disponíveis

### GET /

- **Descrição**: Retorna uma mensagem de boas-vindas.
- **Exemplo de Requisição**:

  ```http
  GET / HTTP/1.1
  Host: localhost:8080
  ```

- **Exemplo de Resposta**:

  ```json
  {
    "message": "Hello World"
  }
  ```

## Contribuição

Se você quiser contribuir para este projeto, siga os passos abaixo:

1. Fork o repositório.
2. Crie uma nova branch para a sua feature (`git checkout -b feature/nome-da-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adicionei uma nova feature'`).
4. Faça push para a branch (`git push origin feature/nome-da-feature`).
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
