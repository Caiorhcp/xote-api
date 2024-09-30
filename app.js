require('dotenv').config();
const express = require("express");
const connectDB = require('./config/database');
const eventRoutes = require('./src/routes/eventRoutes');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDB();

// Usar rotas
app.use("/xote", eventRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
