const mongoose = require("mongoose");

var schema = new mongoose.Schema({
   email: {
    type: String,
    required: true
   },
   startDate: {
    type: Date,
    required: true
   },
   endDate: {
    type: Date,
   },
   material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "materialdb"
   }
    
});

const Loandb= mongoose.model('loandb', schema);

module.exports = Loandb
