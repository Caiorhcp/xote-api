const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Middleware para logar as requisições
router.use((req, res, next) => {
    console.log(`Método: ${req.method}, URL: ${req.originalUrl}`);
    next();
});

// Rotas publicas
router.get('/get', eventController.getAllEvents);                  // Obter todos os eventos
router.get('/get/:id', eventController.getEventById);              // Obter evento por ID

router.get('/recent', eventController.getRecentEvents);             // Obter eventos recentes

router.get('/isFavoriteTrue', eventController.getFavoriteEvents);       // Obter eventos favoritos

router.get('/city/:city', eventController.getEventsByCity);         // Buscar eventos por cidade

router.get('/paid', eventController.getPaidEvents);                 // Obter todos os eventos pagos
router.get('/free', eventController.getFreeEvents);                 // Obter todos os eventos gratuitos

router.get('/get/type/:eventType', eventController.getEventsByType); // Obter eventos pelo tipo

router.get('/paid/desc', eventController.getEventsByPriceDesc);     // Obter eventos pagos ordenados pelo maior valor
router.get('/paid/asc', eventController.getEventsByPriceAsc);       // Obter eventos pagos ordenados pelo menor valor

router.get('/date/asc', eventController.getEventsByDateAsc);        // Listar eventos por data (mais próximos)
router.get('/date/desc', eventController.getEventsByDateDesc);      // Listar eventos por data (mais distantes)



//Rotas privadas(nescessita login e senha)
router.post('/post', eventController.createEvent);                   // Criar novo evento

router.post('/favorite/:id', eventController.favoriteEvent); // Favoritar evento por ID
router.post('/unfavorite/:id', eventController.unfavoriteEvent); // Desfavoritar evento por ID

router.put('/put/:id', eventController.updateEvent);                 // Atualizar evento por ID

router.delete('/delete/:id', eventController.deleteEvent);           // Deletar evento por ID
router.delete('/deleteAll', eventController.deleteAllEvents);        // Deletar todos os eventos

module.exports = router;
