var express = require("express"),
    router = express.Router(),
    Itsystem = require("../models/itsystem"),
    Apdexvalue = require("../models/apdexvalue"),
    dateFormat = require("date-format")

//INDEX
router.get("/", function(req, res){
    Itsystem.find({}, function(err, allItsystems){
        if(err){
            console.log("ERR | couldn't load all itsystems from db | " + err)
        } else {
            res.render("index", {itsystems: allItsystems})
        }
    })
})

//NEW
router.get("/new", function(req, res){
    res.render("new")
})

//SHOW - not needed atm

//CREATE
router.post("/", function(req, res){
    var newItSystem = req.body.itsystem
    //TODO put real name!
    newItSystem.author = "Steve Lohr"
    newItSystem.apdexRating = determineApdexRating(newItSystem.apdexValue)
    Itsystem.create(newItSystem, function(err, createdItsystem){
        if(err){
            console.log("ERR | couldn't create itsystem | " + err)
        } else {
            console.log("INF | itsystem added | " + createdItsystem)
            updateApdexReport()
        }
    })
    res.redirect("/itsystems")
})

//EDIT
router.get("/:id/edit", function(req, res){
    Itsystem.findById(req.params.id, function(err, foundItsystem){
        if(err){
            console.log("ERR | couldn't find itsystem with id: " + req.params.id + " | " + err)
            res.redirect("/:id")
        } else {
            res.render("edit", {itsystem: foundItsystem})
        }
    })
})

//UPDATE
router.put("/:id", function(req, res){
    var updatedItSystem = req.body.itsystem
    updatedItSystem.apdexRating = determineApdexRating(updatedItSystem.apdexValue)
    Itsystem.findByIdAndUpdate(req.params.id, updatedItSystem, function(err, addedItsystem){
        if(err){
            console.log("ERR | couldn't update itsystem with id: " + req.params.id + " | " + err)
        } else {
            console.log("INF | itsystem " + addedItsystem.name + " changed")
            updateApdexReport()
        }
    })
    res.redirect("/itsystems")
})

//DESTROY
router.delete("/:id", function(req, res){
    Itsystem.findByIdAndRemove(req.params.id, req.body.itsystem, function(err, deletedItsystem){
        if(err){
            console.log("ERR | couldn't delete itsystem with id: " + req.params.id + " | " + err)
        } else {
            console.log("INF | itsystem " + deletedItsystem.name + " deleted")
            updateApdexReport()
        }
    })
    res.redirect("/itsystems")
})

function determineApdexRating(apdexValue){
    if(apdexValue > 0.93){
        return "excellent"
    }
    if(apdexValue > 0.84){
        return "good"
    }
    if(apdexValue > 0.69){
        return "fair"
    }
    if(apdexValue > 0.49){
        return "poor"
    }
    if(apdexValue > 0){
        return "unacceptable"
    }
    if(apdexValue == "0.NS" || apdexValue.includes("*")){
        return "invalid"
    }
}

function updateApdexReport(){
    Itsystem.find({}, function(err, allItsystems){
        if(err){
            console.log("ERR | couldn't load all itsystems from db | " + err)
        } else {
            var now = new Date(),
                apdexValue = {
                    month: String,
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
                }
            //TODO can I do this shorter?
            apdexValue.amountExcellent = 0
            apdexValue.amountGood = 0
            apdexValue.amountFair = 0
            apdexValue.amountPoor = 0
            apdexValue.amountUnacceptable = 0
            apdexValue.amountInvalid = 0
            apdexValue.amountEntries = allItsystems.length
            apdexValue.month = now.toLocaleDateString("en-US", {year: "numeric", month: "numeric"})
            for(var i = 0; i<allItsystems.length; i++){
                switch(determineApdexRating(allItsystems[i].apdexValue)) {
                    case "excellent": apdexValue.amountExcellent++; apdexValue.listExcellent.push(allItsystems[i]); break
                    case "good": apdexValue.amountGood++; apdexValue.listGood.push(allItsystems[i]); break
                    case "fair": apdexValue.amountFair++; apdexValue.listFair.push(allItsystems[i]); break
                    case "poor": apdexValue.amountPoor++; apdexValue.listPoor.push(allItsystems[i]); break
                    case "unacceptable": apdexValue.amountUnacceptable++; apdexValue.listUnacceptable.push(allItsystems[i]); break
                    case "invalid": apdexValue.amountInvalid++; apdexValue.listInvalid.push(allItsystems[i]); break
                }
            }
            Apdexvalue.findOne({month: apdexValue.month}, function(err, foundApdexvalue){
                if(err){
                    console.log("ERR | couldn't check if the given month was already in db | " + err)
                } else {
                    if(foundApdexvalue != null){
                        Apdexvalue.findByIdAndUpdate(foundApdexvalue._id, apdexValue, function(err, updatedApdexvalue){
                            if(err){
                                console.log("ERR | couldn't update apdexvalue for " + updatedApdexvalue.month + " | " + err)
                            } else {
                                console.log("INF | apdexvalue value for " + updatedApdexvalue.month + " updated | " + updatedApdexvalue)
                            }
                        })
                    } else {
                        Apdexvalue.create(apdexValue, function(err, createdApdexvalue){
                            if(err){
                                console.log("ERR | couldn't save new apdexvalue to db | " + err)
                            } else {
                                console.log("INF | new apdexvalue value added | " + createdApdexvalue)
                            }
                        }) 
                    }
                }
            })
        }
    })
}

module.exports = router