var mongoose = require("mongoose"),
    Itsystem = require("./models/itsystem")
    
function cleanItSystems(){
    Itsystem.remove({}, function(err){
        if(err){
            console.log("ERR | couldn't clean itsystems")
        } else {
            console.log("INF | removed all itsystems")
        }        
    })
}

module.exports = cleanItSystems