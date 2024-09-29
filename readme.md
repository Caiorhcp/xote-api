# XoteCariri API

A XoteCariri API é uma API para gerenciar eventos na plataforma XoteCariri. Esta documentação orienta você sobre como configurar e utilizar a API.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MongoDB](https://www.mongodb.com/) (ou acesso a um cluster MongoDB no Atlas)
- [Postman](https://www.postman.com/) (opcional, para testar a API)

## Configuração do Ambiente

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu_usuario/xotecariri.git
   cd xotecariri

2. Instale as Dependências

```bash
npm install
```
3. Configuração do Banco de Dados

Crie um banco de dados no MongoDB ou utilize um cluster no MongoDB Atlas.
Crie um arquivo chamado config.js na raiz do projeto e adicione as seguintes linhas, substituindo <USERNAME> e <PASSWORD> pelas suas credenciais do MongoDB:

```bash
module.exports = {
    dbURI: 'mongodb+srv://<USERNAME>:<PASSWORD>@xote.0mz6p.mongodb.net/xote?retryWrites=true&w=majority'
};
```

4. Inicie o Servidor

Execute o seguinte comando no terminal:
```bash
node src/index.js
```

O servidor deve iniciar e você verá a mensagem "app running" no terminal.


## Como Utilizar a API
Testando com o Postman
Após iniciar o servidor, você pode utilizar o Postman para interagir com a API.

Obter todos os eventos

Método: GET
URL: http://localhost:3000/xote
Descrição: Retorna todos os eventos.
Criar um novo evento

Método: POST
URL: http://localhost:3000/xote
Body: Selecione raw e JSON e insira o seguinte:

```bash
{
    "title": "Festival de Música Cariri",
    "description": "Um festival com apresentações de bandas regionais.",
    "image_url": "https://example.com/festival.jpg",
    "data": "2024-12-01"
}
```
Descrição: Cria um novo evento e retorna o evento criado.
Obter um evento por ID

Método: GET
URL: http://localhost:3000/xote/{id} (substitua {id} pelo ID do evento)
Descrição: Retorna os detalhes de um evento específico.
Atualizar um evento por ID

Método: PUT
URL: http://localhost:3000/xote/{id} (substitua {id} pelo ID do evento)
Body: Selecione raw e JSON e insira o seguinte:

```bash
{
    "title": "Festival de Música Atualizado",
    "description": "Descrição atualizada do festival.",
    "image_url": "https://example.com/festival-atualizado.jpg",
    "data": "2024-12-02"
}
```
Descrição: Atualiza um evento específico e retorna o evento atualizado.
Deletar um evento por ID

Método: DELETE
URL: http://localhost:3000/xote/{id} (substitua {id} pelo ID do evento)
Descrição: Deleta um evento específico.