var apdexValue = {
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
        listInvalid: []
    },
    Apdexvalue = require("./models/apdexvalue")

function populateDBWithApdexValues(){
    for(var year = 2015; year < 2018; year++){
        for(var month = 1; month < 13; month++){
            apdexValue.amountExcellent = rand(0, 200)
            apdexValue.amountGood = rand(0, 200)
            apdexValue.amountFair = rand(0, 200)
            apdexValue.amountPoor = rand(0, 200)
            apdexValue.amountUnacceptable = rand(0, 200)
            apdexValue.amountInvalid = rand(0, 200)
            apdexValue.listExcellent.push({name: "Testapp", apdexValue: "0.97", release: "1.6.1-12"})
            apdexValue.month = month + "/" + year
            apdexValue.amountEntries = apdexValue.amountExcellent + apdexValue.amountGood + apdexValue.amountFair + apdexValue.amountPoor + apdexValue.amountUnacceptable + apdexValue.amountInvalid
            Apdexvalue.create(apdexValue)    
        }    
    }
}

function rand (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = populateDBWithApdexValues