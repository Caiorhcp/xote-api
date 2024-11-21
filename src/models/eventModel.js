const mongoose = require('mongoose');

// Validador de data usando o tipo Date
const validateDate = (date) => {
    return !isNaN(Date.parse(date)); // Valida a data de acordo com o formato Date
};

const validateTime = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Formato HH:MM
    return regex.test(time);
};

const eventSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true,
        validate: {
            validator: (url) => /^https?:\/\/.+\..+$/.test(url), 
            message: "URL inválida."
        }
    }, 
    title: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 100 
    },
    city: { 
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 50 
    },
    local: {
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 50
    },
    localDescription: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    description: { 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 500 
    },
    date: { 
        type: Date, 
        required: true,
        validate: {
            validator: validateDate,
            message: "Data inválida."
        }
    },
    time: { 
        type: String, 
        required: true,
        validate: {
            validator: validateTime,
            message: "Hora inválida. Use o formato HH:MM."
        }
    },
    type: { 
        type: String, 
        required: true 
    },
    pay: { 
        type: Boolean, 
        required: true 
    },
    price: { 
        type: Number, 
        required: function() { return this.pay; }, 
        min: 0 
    },
    isFavorite: { 
        type: Boolean, 
    },
    localgoogleurl: { 
        type: String, 
        required: true,
        validate: {
            validator: (url) => /^(https?:\/\/)?(maps\.google\.com\/maps\?q=|maps\.app\.goo\.gl\/).+$/.test(url),
            message: "URL do local no Google Maps inválida."
        }
    },
}, { timestamps: true });

// Pre-save hook para converter a data para o formato correto
eventSchema.pre('save', function(next) {
    if (this.date) {
        const [day, month, year] = this.date.split("-");
        const formattedDate = new Date(`${year}-${month}-${day}`);
        this.date = formattedDate; // Atualiza a data para o formato correto
    }
    next();
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
