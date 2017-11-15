var express = require("express"),
    router = express.Router(),
    Apdexvalue = require("../models/apdexvalue")

//INDEX
router.get("/", function(req, res){
    Apdexvalue.find({}).sort('-created').exec(function(err, allApdexvalues){
        if(err){
            console.log("ERR | couldn't load all apdexvalues from db | " + err)
        } else {
            var amountMaxEntries = 0
            for(var i=0; i<allApdexvalues.length; i++){
                if(allApdexvalues[i].amountEntries > amountMaxEntries) amountMaxEntries = allApdexvalues[i].amountEntries
            }
            res.render("home", {apdexValues: allApdexvalues, amountMaxEntries: amountMaxEntries})
        }
    })
})

module.exports = router