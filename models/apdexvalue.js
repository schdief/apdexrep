var mongoose = require("mongoose"),
    apdexvalueSchema = new mongoose.Schema({
        month: String,
        amountEntries: Number,
        amountExcellent: Number,
        amountGood: Number,
        amountFair: Number,
        amountPoor: Number,
        amountUnacceptable: Number,
        amountInvalid: Number,
        listExcellent: [],
        listGood: [],
        listFair: [],
        listPoor: [],
        listUnacceptable: [],
        listInvalid: [],
        created: {type: Date, default: Date.now} 
    })
    
module.exports = mongoose.model("Apdexvalue", apdexvalueSchema)