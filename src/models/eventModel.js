const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    image_url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    pay: { type: Boolean, required: true },
    type: { type: String, required: true },
    localgoogleurl: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
