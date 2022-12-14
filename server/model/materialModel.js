const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    reference:{
        type: String,
        required: true,
        unique:true,
    },
    description: {
        type: String,
        required: true,
    },
    statut: {
        type: Boolean,
        default: false,
    }
});

const Materialdb= mongoose.model('materialdb', schema);

module.exports = Materialdb
