const Event = require('../models/eventModel');

// Listar todos os eventos
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.send({
            XoteEventos: events,
            count: events.length,
        });
    } catch (error) {
        console.error(error); // Log de erro
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
        res.send({ event });
    } catch (error) {
        console.error(error); // Log de erro
        res.status(500).send("Erro ao procurar evento por ID");
    }
};

// Criar um novo evento
exports.createEvent = async (req, res) => {
    const { image_url, title, description, date, time, type, pay, localgoogleurl } = req.body;

    // Validação simples
    if (!title || !description || !date || !time || !type || localgoogleurl === undefined || pay === undefined) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    const event = new Event({
        image_url,
        title,
        description,
        date,
        time,
        type,
        pay,
        localgoogleurl,
    });

    try {
        await event.save();
        res.status(201).send({
            message: "Evento criado com sucesso",
            event,
        });
    } catch (error) {
        console.error(error); // Log de erro
        if (error.name === 'ValidationError') {
            return res.status(422).send(error.message);
        }
        res.status(500).send("Erro ao criar evento: " + error.message);
    }
};


// Atualizar um evento por ID
exports.updateEvent = async (req, res) => {
    const { image_url, title, description, date, time, type, pay, localgoogleurl } = req.body;

    // Validação simples
    if (!title || !description || !date || !time || !type || localgoogleurl === undefined || pay === undefined) {
        return res.status(400).send("Todos os campos são obrigatórios.");
    }

    try {
        const event = await Event.findByIdAndUpdate(req.params.id, {
            image_url,
            title,
            description,
            date,
            time,
            type,
            pay,
            localgoogleurl,
        }, {
            new: true,
            runValidators: true // Isso ajuda a garantir que os dados sejam válidos conforme o esquema
        });

        if (!event) {
            return res.status(404).send("Evento não encontrado");
        }

        res.send({
            message: "Evento atualizado com sucesso",
            event,
        });
    } catch (error) {
        console.error(error); // Log de erro
        if (error.name === 'ValidationError') {
            return res.status(422).send(error.message);
        }
        res.status(500).send("Erro ao atualizar evento: " + error.message);
    }
};


// Deletar um evento por ID
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send("Evento não encontrado");
        }
        res.send({
            message: "Evento deletado com sucesso",
            event,
        });
    } catch (error) {
        console.error(error); // Log de erro
        res.status(500).send("Erro ao deletar evento");
    }
};
