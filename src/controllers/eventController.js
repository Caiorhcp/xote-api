const Event = require('../models/eventModel');

// Listar todos os eventos
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.send({
            XoteEventos: events
        });
    } catch (error) {
        res.status(500).send("Erro ao listar eventos");
    }
};

// Listar um evento por ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send("Evento não encontrado!");
        }
        res.send(event);
    } catch (error) {
        res.status(500).send("Erro ao procurar evento por id");
    }
};

// Criar um novo evento
exports.createEvent = async (req, res) => {
    const event = new Event({
        image_url: req.body.image_url,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
        pay: req.body.pay,
        localgoogleurl: req.body.localgoogleurl,
    });

    try {
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        res.status(500).send("Erro ao criar evento");
    }
};

// Atualizar um evento por ID
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, {
        image_url: req.body.image_url,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
        pay: req.body.pay,
        localgoogleurl: req.body.localgoogleurl,
        }, {
             new: true 
            });

        if (!event) {
            return res.status(404).send("Evento não encontrado");
        }

        res.send(event);
    } catch (error) {
        res.status(500).send("Erro ao atualizar evento");
    }
};

// Deletar um evento por ID
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send("Evento não encontrado");
        }
        res.send(event);
    } catch (error) {
        res.status(500).send("Erro ao deletar evento");
    }
};
