var mongoose = require("mongoose"),
    itsystemSchema = new mongoose.Schema({
        name: String,
        icto: String,
        release: String,
        apdexValue: String,
        apdexRating: String,
        author: String,
        created: {type: Date, default: Date.now} 
    })
    
module.exports = mongoose.model("Itsystem", itsystemSchema)