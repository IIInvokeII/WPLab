var bodyParser = require("body-parser");
var express = require("express");
const mongodb = require('mongodb');
var app = express();
var port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')


app.get("/", (req, res) => {
    res.render("login.ejs")
});

app.get("/login", (req, res) => {
    res.render("login.ejs")
});

app.get("/addreminder", (req, res) => {
    res.render("remind.ejs")
});

app.get("/viewreminder", (req, res) => {
    res.render("view.ejs")
});

app.get("/timeita", (req, res) => {
    res.render("timeita.ejs");
});

app.get("/timeitb", (req, res) => {
    res.render("timeitb.ejs");
});

app.get('/rems', async (req, res) => {
    const db = await mongodb.MongoClient.connect("mongodb://localhost:27017/trial").catch(err => {
        res.status(400).send("Error fetching reminders");
    });
    try {
        reminders = await db.db("reminders").collection('details').find().toArray();
        var responseList = []
        for (var i = 0; i < reminders.length; i++) {
            var reminder = {
                name: reminders[i].remname,
                type: reminders[i].remtype,
                details: reminders[i].remdetails
            }
            responseList.push(reminder)
        }
        res.status(200).send(JSON.stringify(responseList));
    } catch (err) {
        res.status(400).send("Error fetching reminders");
    } finally {
        db.close();
    }
})

app.post('/addnewrem', (req, res) => {
    try {
        reminder = {
            remname: req.body.remname,
            remtype: req.body.remtype,
            remdetails: req.body.remdetails,
        }

        mongodb.MongoClient.connect("mongodb://localhost:27017/trial", function (err, db) {
            if (err) throw err;
            var dbo = db.db("reminders");
            dbo.collection("details").insertOne(reminder, function (err, result) {
                if (err) {
                    res.redirect('/')
                } else {
                    res.redirect('/')
                }
            });
        });

    } catch {
        res.redirect('/')
    }
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
