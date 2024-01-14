var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date", function (req, res) {
    const inputDate = req.params.date;
    let dateInUnix;

    if (!inputDate) {
        inputDate = new Date().toISOString();
    }

    if (isNaN(inputDate)) {
        dateInUnix = Date.parse(inputDate);
    } else {
        dateInUnix = parseInt(inputDate);
    }

    try {
        const utcString = new Date(dateInUnix).toUTCString();
        res.json({ unix: dateInUnix, utc: utcString });
    } catch (error) {
        res.json({ error: "Invalid Date" });
    }
});

var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
