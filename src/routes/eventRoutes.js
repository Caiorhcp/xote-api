const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Middleware para logar as requisições
router.use((req, res, next) => {
    console.log(`Método: ${req.method}, URL: ${req.originalUrl}`);
    next();
});

// Roteadores de eventos
router.get('/', eventController.getAllEvents);         // Obter todos os eventos
router.get('/:id', eventController.getEventById);      // Obter evento por ID
router.post('/', eventController.createEvent);         // Criar novo evento
router.put('/:id', eventController.updateEvent);       // Atualizar evento por ID
router.delete('/:id', eventController.deleteEvent);    // Deletar evento por ID

module.exports = router;
