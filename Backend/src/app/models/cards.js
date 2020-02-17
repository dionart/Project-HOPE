const mongoose = require('../../database');

//Modelo de cards
const CardsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    type: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    }
});

const Card = mongoose.model('Card', CardsSchema);

module.exports = Card;