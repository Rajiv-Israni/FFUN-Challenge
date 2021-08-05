const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const carSchema = new Schema({
    make: { type: String, required: true },
    make_model: { type: String, required: true },
    year: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Car', carSchema);