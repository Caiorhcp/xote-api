# XoteCariri API

A **XoteCariri API** é uma solução desenvolvida para gerenciar eventos na plataforma **XoteCariri**, que conecta os usuários a eventos na região de Juazeiro do Norte e Cariri. Foi projetada por **Caio Vinicius Gonçalves de Sousa**, **Giovanny Lucas** e **Lucas Vieira**, como parte de um projeto acadêmico.  
A API utiliza **Node.js**, **Express**, **MongoDB** e **Mongoose**, seguindo o padrão **MVC** (Model-View-Controller), o que garante organização, escalabilidade e manutenibilidade do código.

---

**Link do Postman Collection**
### https://www.postman.com/caio44/db-xote/folder/eub81mm/collections?action=share&source=copy-link&creator=38010609&ctx=documentation

## URL Principal da API

**Base URL**:  
`https://xote-api-development.up.railway.app/xote/{endpoint}`

### Endpoints Públicos

#### **GET**
- `/get` – Retorna todos os eventos.  
- `/get/{id}` – Retorna um evento específico pelo ID.  
- `/recent` – Retorna os eventos mais recentes.  
- `/isFavoriteTrue` – Retorna os eventos marcados como favoritos.  
- `/city/{nome_da_city}` – Retorna eventos de uma cidade específica.  
- `/paid` – Retorna eventos pagos.  
- `/paid/desc` – Retorna eventos pagos ordenados por preço decrescente.  
- `/paid/asc` – Retorna eventos pagos ordenados por preço crescente.  
- `/free` – Retorna eventos gratuitos.  
- `/date/desc` – Retorna eventos ordenados por data decrescente.  
- `/date/asc` – Retorna eventos ordenados por data crescente.

#### **POST**
- `/post` – Cria um novo evento.

#### **PUT**
- `/put/{id}` – Atualiza os dados de um evento pelo ID.

#### **DELETE**
- `/delete/{id}` – Remove um evento específico pelo ID.

---

## Tecnologias Utilizadas

- **Node.js**  
- **Express**  
- **MongoDB**  
- **Mongoose**  
- **Swagger** (para documentação da API)

---

## Pré-requisitos

Antes de começar, você precisará ter:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MongoDB](https://www.mongodb.com/) (ou um cluster MongoDB no Atlas)
- [Postman](https://www.postman.com/) (opcional, para testes)

---

## Configuração do Projeto

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/Caiorhcp/xote-api.git
   cd xote-api

2. **Instale as Dependências**

```bash
npm install
```
3. **Configuração do Banco de Dados**

Configure um banco no MongoDB Atlas ou localmente. Crie um arquivo .env na raiz do projeto com as variáveis de ambiente:

env
```bash
DATABASE_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster.mongodb.net/xote?retryWrites=true&w=majority
```

4. **Inicie o Servidor**

```bash
npm start
O servidor estará disponível em http://localhost:3000/
```

5. **Testando a API**
Aqui estão alguns exemplos de como interagir com os endpoints utilizando o Postman:

1. Listar Todos os Eventos
Método: GET
URL: /get
2. Criar um Novo Evento
Método: POST

URL: /post

Body (JSON):

json
```bash
Copy code
{
  "image_url": "https://example.com/event.jpg",
  "title": "Evento Teste",
  "local": local,
  "localDescription": descricao,
  "description": "Descrição do evento.",
  "date": "26-10-2024",
  "time": "20:00",
  "pay": true,
  "price": 01.50,
  "type": "Cultural",
  "localgoogleurl": "https://maps.google.com/example"
}
```
3. Atualizar um Evento por ID
Método: PUT

URL: /put/{id}

Body (JSON):

json
```bash
{
  "image_url": "https://example.com/event.jpg",
  "title": "Evento Teste",
  "local": local,
  "localDescription": descricao,
  "description": "Descrição do evento.",
  "date": "26-10-2024",
  "time": "20:00",
  "pay": true,
  "price": 01.50,
  "type": "Cultural",
  "localgoogleurl": "https://maps.google.com/example"
}
```
4. Deletar um Evento
Método: DELETE
URL: /delete/{id}
Estrutura do Projeto
A aplicação foi estruturada utilizando o padrão MVC:

```bash

/project-root
│
├── /controllers      # Lógica de negócios
│   └── eventController.js
│
├── /models           # Modelos do MongoDB com Mongoose
│   └── eventModel.js
│
├── /routes           # Rotas da API
│   └── eventRoutes.js
│
├── /config           # Configurações do projeto
│   └── database.js
│
├── app.js            # Arquivo principal da aplicação
├── package.json      # Dependências do projeto
└── .env              # Variáveis de ambiente
```
# Contribuidores

## Caio Vinicius Gonçalves de Sousa
## Giovanny Lucas
## Lucas Vieira

## Observações
A documentação detalhada da API pode ser acessada pelo arquivo Swagger incluído no repositório. Para visualizá-lo, utilize o Swagger Editor.

## Obrigado pela atenção!