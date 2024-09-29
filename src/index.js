require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Modelo do json
const Events = mongoose.model('Event', { 
    title: String, 
    description: String,
    image_url: String,
    date: String,  
});

// Rota para listar todos os eventos
app.get("/xote", async (req, res) => {
    try {
        const events = await Events.find(); 
        return res.send(events);
    } catch (error) {
        res.status(500).send("Erro ao listar eventos");
    }
});

// Rota para listar um evento por ID
app.get("/xote/:id", async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);  
        if (!event) {
            return res.status(404).send("Evento não encontrado!");
        }
        return res.send(event);
    } catch (error) {
        res.status(500).send("Erro ao procurar evento por id");
    }
});

// Rota para criar um novo evento
app.post("/xote", async (req, res) => {
    const event = new Events({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        date: req.body.date,  
    });

    try {
        await event.save();
        return res.status(201).send(event);
    } catch (error) {
        res.status(500).send("Erro ao criar evento");
    }
});

// Rota para atualizar um evento por ID
app.put("/xote/:id", async(req, res) => {
    try {
        const event = await Events.findByIdAndUpdate(req.params.id, { 
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            date: req.body.date,
        }, 
        { new: true });

        if (!event) {
            return res.status(404).send("Evento não encontrado");
        }

        return res.send(event);
    } catch (error) {
        res.status(500).send("Erro ao atualizar evento");
    }
});

// Rota para deletar um evento por ID
app.delete("/xote/:id", async(req, res) => {
    try {
        const event = await Events.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send("Evento não encontrado");
        }
        return res.send(event);
    } catch (error) {
        res.status(500).send("Erro ao deletar evento");
    }
});

// Conectando ao banco de dados e iniciando o servidor
app.listen(port, () => {
    mongoose.connect(process.env.MONGODB_URI) 
        .then(() => {
            console.log(`App running on port ${port}`);
        })
        .catch(err => {
            console.error("Error connecting to DataBase", err);
        });
});
