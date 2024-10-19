require('dotenv').config(); // Carregar variáveis de ambiente do .env
const express = require("express");
const cors = require("cors"); 
const connectDB = require('./config/database'); // Importar a função de conexão do banco de dados
const eventRoutes = require('./src/routes/eventRoutes'); // Importar as rotas dos eventos
const helmet = require('helmet'); // Importar helmet para segurança

const app = express();
app.use(cors()); // Habilitar CORS
app.use(helmet()); // Adicionar segurança com Helmet
app.use(express.json()); // Permitir que a aplicação receba JSON

const port = process.env.PORT || 3000; // Usar a porta definida nas variáveis de ambiente ou 3000 como padrão

// Conectar ao banco de dados
connectDB()
    .then(() => {
        // Usar rotas
        app.use("/xote", eventRoutes); // Prefixo para as rotas de eventos

        // Iniciar o servidor
        app.listen(port, () => {
            console.log(`App running on port ${port}`); // Mensagem para indicar que o servidor está rodando
        });
    })
    .catch(error => {
        console.error("Erro ao conectar ao banco de dados:", error); // Log de erro na conexão
        process.exit(1); // Sair do processo se a conexão falhar
    });

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log de erro
    res.status(500).send("Algo deu errado!"); // Resposta genérica de erro
});
