const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const port = 3000;
const csvtojson = require('csvtojson');

app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.listen(port, () => {
    console.log(`Server naslouchá na portu ${port}`);
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/savedata', urlencodedParser, (req, res) => {
    let date = moment().format('YYYY-MM-DD');
    let str = `"${req.body.ukol}","${req.body.predmet}","${date}","${req.body.odevzdani}","${req.body.odevzdal}"\n`;
    fs.appendFile(path.join(__dirname, 'data/ukoly.csv'), str, function (err) {
        if (err) {
            console.error(err);
            returnres.status(400).json({
                success: false,
                message: "Nastala chyba během ukládání souboru"
            });
        }
    });
    res.redirect(301, '/');
});


app.get("/todolist", (req, res) =>{
    
    
    csvtojson({headers:['ukol','predmet','zadani','odevzdani','odevzdal']}).fromFile(path.join(__dirname, 'data/ukoly.csv'))
    .then(data =>{
        console.log(data);
            res.render('index', {nadpis: "Přehled úkolů", ukoly: data});})
            .catch(err =>{
                console.log(err);
                res.render('error', {nadpis: "Chyba v aplikaci", chyba: err});
            }); 
        });
