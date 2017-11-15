var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    Itsystem = require("./models/itsystem"),
    bodyParser = require("body-parser"),
    cleanItSystems = require("./cleanItSystems"),
    methodOverride = require("method-override"),
    populateDBWithApdexValues = require("./populateDBWithApdexValues"),
    favicon = require('serve-favicon')

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(favicon("public/favicon.ico"))

mongoose.connect("mongodb://localhost/apdexrep", {
    useMongoClient: true,
})

//modify testdata
//cleanItSystems()
//populateDBWithApdexValues()

//ROUTES
var apdexvalueRoutes = require("./routes/apdexvalue"),
    itsystemRoutes = require("./routes/itsystem")
app.use(apdexvalueRoutes)
app.use("/itsystems", itsystemRoutes)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("INF | ApdexRep service started")
})

//TODO
//v1
//- bei Eingabe prüfen, ob IT-System, ICTO oder Release schon angelegt sind -> dann Flashmessage und zum Bearbeiten Dialog
//- Authentifizierung lokal
//- Deployment Openshift inkl. Pipeline
//v1.1
//- Releases anstatt nur itsystem
//- Zuordnung Release-Objekte zu Apdexvalues anstatt redundante Speicherung
//- .csv-Download
//- LDAP Authentifizierung