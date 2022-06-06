const express = require("express");
const app = express ();
constbodyParser = require("body-parser");
constmoment = require("moment");
constfs = require("fs");
constpath = require("path");
const port = 3000;
app.use(express.static("public"));
app.listen (port, () =>{
    console.log(`Server naslouchá na portu ${port}`);
});

consturlencodedParser = bodyParser.urlencoded({extended: false});
app.post('/savedata', urlencodedParser, (req, res) =>{
    letdate = moment().format('YYYY-MM-DD');
    letstr = `"${req.body.ukol}","${req.body.predmet}","${date}","${req.body.odevzdani}"\n`;
    fs.appendFile(path.join(__dirname, 'data/ukoly.csv'), str, function(err) {
        if(err) {
            console.error(err);
            returnres.status(400).json({
                success: false,
                message: "Nastala chyba během ukládání souboru"
            });
        }
    });
    res.redirect(301, '/');
});