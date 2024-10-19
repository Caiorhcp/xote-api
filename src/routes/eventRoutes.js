const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Middleware para logar as requisições
router.use((req, res, next) => {
    console.log(`Método: ${req.method}, URL: ${req.originalUrl}`);
    next();
});

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
