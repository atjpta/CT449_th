const app = require('./app');
const config = require('./app/config');
const mongodb = require("mongoose");

//connet to database
mongodb.connect(config.db.uri)
    .then(() => {
        console.log("Conneted to the database!");
    })
    .catch((error) => {
        console.log("Cannot connet to the database!", error);
        process.exit();
    });

// start sv
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Sever is running on port${PORT}.`);
});

app.post("/test", (req, res) => {
    console.log(req.body);
})