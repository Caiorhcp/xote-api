    const Event = require('../models/eventModel');


    const normalizeString = (str) => {
        // Normaliza a string removendo acentos e convertendo para minúsculas
        return str
            .normalize("NFD") // Normaliza a string para decompor caracteres
            .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
            .toLowerCase(); // Converte para minúsculas
    };



    // Listar todos os eventos
    exports.getAllEvents = async (req, res) => {
        try {
            const events = await Event.find();
            res.send({
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
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
            console.error(error);
            res.status(500).send("Erro ao procurar evento por ID");
        }
    };

    // Obter eventos por tipo (pago ou gratuito)
    exports.getEventsByPaymentType = async (req, res) => {
        const { type } = req.params; // 'paid' ou 'free'
        const isPaid = type === 'paid';

        try {
            const events = await Event.find({ pay: isPaid });
            res.send({
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar eventos por tipo de pagamento");
        }
    };

    // Listar eventos pagos em ordem decrescente de preço
    exports.getEventsByPriceDesc = async (req, res) => {
        try {
            const events = await Event.find({ pay: true }).sort({ price: -1 });
            res.send({
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar eventos pagos por preço decrescente");
        }
    };

    // Listar eventos pagos em ordem crescente de preço
    exports.getEventsByPriceAsc = async (req, res) => {
        try {
            const events = await Event.find({ pay: true }).sort({ price: 1 });
            res.send({
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar eventos pagos por preço crescente");
        }
    };

    // Listar eventos por data (mais próximos)
    exports.getEventsByDateAsc = async (req, res) => {
        const { startDate, endDate } = req.query; // Captura parâmetros de consulta para intervalo de datas

        let filter = {}; // Filtro inicial para a busca

        // Adiciona filtros se as datas forem fornecidas e válidas
        if (startDate) {
            const start = new Date(startDate);
            if (isNaN(start)) {
                return res.status(400).send("Data de início inválida.");
            }
            filter.date = { $gte: start }; // A data deve ser maior ou igual à data inicial
        }
        if (endDate) {
            const end = new Date(endDate);
            if (isNaN(end)) {
                return res.status(400).send("Data de término inválida.");
            }
            filter.date = { ...filter.date, $lte: end }; // A data deve ser menor ou igual à data final
        }

        try {
            const events = await Event.find(filter).sort({ date: 1 }); // Busca eventos com filtro e ordenação
            res.send({
                message: "Eventos listados com sucesso",
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar eventos por data (mais próximos)");
        }
    };

    // Listar eventos por data (mais distantes)
    exports.getEventsByDateDesc = async (req, res) => {
        const { startDate, endDate } = req.query; // Captura parâmetros de consulta para intervalo de datas

        let filter = {}; // Filtro inicial para a busca

        // Adiciona filtros se as datas forem fornecidas e válidas
        if (startDate) {
            const start = new Date(startDate);
            if (isNaN(start)) {
                return res.status(400).send("Data de início inválida.");
            }
            filter.date = { $gte: start }; // A data deve ser maior ou igual à data inicial
        }
        if (endDate) {
            const end = new Date(endDate);
            if (isNaN(end)) {
                return res.status(400).send("Data de término inválida.");
            }
            filter.date = { ...filter.date, $lte: end }; // A data deve ser menor ou igual à data final
        }

        try {
            const events = await Event.find(filter).sort({ date: -1 }); // Busca eventos com filtro e ordenação
            res.send({
                message: "Eventos listados com sucesso",
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar eventos por data (mais distantes)");
        }
    };

    // Criar um novo evento
    exports.createEvent = async (req, res) => {
        const { image_url, title, city, local, localDescription, description, date, time, type, pay, isFavorite, price, localgoogleurl } = req.body;

        // Verificar se o evento é pago e se o preço foi fornecido
        if (pay && (price === undefined || price === null)) {
            return res.status(400).send("O preço é obrigatório para eventos pagos.");
        }

        // Verificar se o evento não é pago e se o preço foi fornecido
        if (!pay && price !== undefined) {
            return res.status(400).send("O preço não deve ser fornecido para eventos gratuitos.");
        }

        // Formatar a data para ISO 8601
        const [day, month, year] = date.split("-"); // Divide a string da data
        const formattedDate = new Date(`${year}-${month}-${day}T00:00:00Z`); // Formata para ISO 8601

        const event = new Event({
            image_url,
            title,
            city,
            local,
            localDescription,
            description,
            date: formattedDate, 
            time,
            type,
            pay,
            isFavorite,
            price: pay ? parseFloat(price) : undefined, 
            localgoogleurl,
        });

        try {
            await event.save();
            res.status(201).send({
                message: "Evento criado com sucesso",
                event,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao criar evento");
        }
    };

    // Atualizar um evento por ID
    exports.updateEvent = async (req, res) => {
        const { image_url, title, city, local, localDescription, description, date, time, type, pay, price, isFavorite, localgoogleurl } = req.body;

        // Verificar se o evento é pago e se o preço foi fornecido
        if (pay && (price === undefined || price === null)) {
            return res.status(400).send("O preço é obrigatório para eventos pagos.");
        }

        // Verificar se o evento não é pago e se o preço foi fornecido
        if (!pay && price !== undefined) {
            return res.status(400).send("O preço não deve ser fornecido para eventos gratuitos.");
        }

        // Formatar a data para ISO 8601, se fornecida
        let formattedDate;
        if (date) {
            const [day, month, year] = date.split("-");
            formattedDate = new Date(`${year}-${month}-${day}T00:00:00Z`); // Converte para ISO 8601

            // Verifica se a data é válida
            if (isNaN(formattedDate.getTime())) {
                return res.status(400).send("Formato de data inválido.");
            }
        }

        try {
            const event = await Event.findByIdAndUpdate(req.params.id, {
                image_url,
                title,
                city,
                local,
                localDescription,
                description,
                date: formattedDate || date, 
                time,
                type,
                pay,
                price: pay ? parseFloat(price) : undefined, 
                isFavorite,
                localgoogleurl,
            }, {
                new: true,
                runValidators: true, // Garante que as validações do esquema sejam executadas
            });

            if (!event) {
                return res.status(404).send("Evento não encontrado");
            }

            res.send({
                message: "Evento atualizado com sucesso",
                event,
            });
        } catch (error) {
            console.error(error);
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
            res.send({
                message: "Evento deletado com sucesso",
                event,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao deletar evento");
        }
    };

    // Listar todos os eventos pagos
    exports.getPaidEvents = async (req, res) => {
        try {
            const events = await Event.find({ pay: true });
            res.send({
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar eventos pagos");
        }
    };

    // Listar todos os eventos gratuitos
    exports.getFreeEvents = async (req, res) => {
        try {
            const events = await Event.find({ pay: false });
            res.send({
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar eventos gratuitos");
        }
    };

    // Deletar todos os eventos
    exports.deleteAllEvents = async (req, res) => {
        try {
            const result = await Event.deleteMany({});
            res.send({
                message: "Todos os eventos deletados com sucesso",
                deletedCount: result.deletedCount,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao deletar todos os eventos");
        }
    };

    // Obter eventos por tipo
    exports.getEventsByType = async (req, res) => {
        const eventType = req.params.eventType; // Captura o tipo de evento da URL

        try {
            const events = await Event.find({ type: eventType }); // Busca eventos pelo tipo
            if (events.length === 0) {
                return res.status(404).json({ message: 'Nenhum evento encontrado.' });
            }
            res.json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar eventos.' });
        }
    };

    // Listar eventos recentes
    exports.getRecentEvents = async (req, res) => {
        const limit = parseInt(req.query.limit) || 10;//limite de eventos sendo listados

        try {
            const events = await Event.find().sort({ createdAt: -1 }).limit(limit);
            res.send({
                message: "Eventos recentes listados com sucesso",
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar eventos recentes");
        }
    };

    // Listar todos os eventos favoritos
    exports.getFavoriteEvents = async (req, res) => {
        try {
            const events = await Event.find({ isFavorite: true });
            res.send({
                XoteEventos: events,
                count: events.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao listar Favoritos");
        }
    };

    // Listar eventos por cidade
exports.getEventsByCity = async (req, res) => {
    const cityName = req.params.city; 
    const normalizedCityName = normalizeString(cityName); // Normaliza o nome da cidade

    try {
        // Busca os eventos no banco de dados que correspondem ao nome da cidade
        const events = await Event.find({
            city: { $regex: normalizedCityName, $options: 'i' } // 'i' torna a busca insensível a maiúsculas/minúsculas
        });

        if (events.length === 0) {
            return res.status(404).json({ message: 'Nenhum evento encontrado para esta cidade.' });
        }

        res.send({
            message: "Eventos listados com sucesso",
            XoteEventos: events,
            count: events.length,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar eventos por cidade");
    }
};


    // Favoritar um evento
    exports.favoriteEvent = async (req, res) => {
        const eventId = req.params.id; 

        try {
            // Atualiza o evento para marcar como favorito
            const event = await Event.findByIdAndUpdate(
                eventId,
                { isFavorite: true },
                { new: true }
            );

            if (!event) {
                return res.status(404).send({ message: "Evento não encontrado" });
            }

            res.send({
                message: "Evento favoritado com sucesso",
                event,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao favoritar o evento");
        }
    };

    // Desfavoritar um evento
    exports.unfavoriteEvent = async (req, res) => {
        const eventId = req.params.id; 

        try {
            // Atualiza o evento para desfavoritar
            const event = await Event.findByIdAndUpdate(
                eventId,
                { isFavorite: false }, 
                { new: true } 
            );

            if (!event) {
                return res.status(404).send({ message: "Evento não encontrado" });
            }

            res.send({
                message: "Evento desfavoritado com sucesso",
                event,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao desfavoritar o evento");
        }
    };

    // Função para atualizar o status de favorito do evento
    exports.updateFavoriteStatus = async (req, res) => {
        try {
            const eventId = req.params.id;
            const { isFavorite } = req.body;  // A nova flag de favorito será passada no corpo da requisição
            
            // Encontrando o evento no banco de dados
            const event = await Event.findById(eventId);

            if (!event) {
                return res.status(404).send("Evento não encontrado");
            }

            // Atualizando o status de favorito
            event.isFavorite = isFavorite;  // Atualiza o status de favorito para o valor passado na requisição
            await event.save();

            res.status(200).send({ message: "Status de favorito atualizado com sucesso", event });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erro ao atualizar o status de favorito");
        }
    };
