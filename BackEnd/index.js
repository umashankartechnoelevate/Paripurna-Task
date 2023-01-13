const express = require("express");
require('dotenv').config()
const config = require("./config/index");
const app = express();
port = process.env.PORT
const { db } = require('./helper/dbConnect')

let userRoutes = require('./routes/user/userRoutes').userRoutes()

const expressServer = async () => {
    db.connect(config.database.url, config.database.option);

    //CORS handling

    const cors = require("cors");
    app.use(cors({
        origin: '*'
    }));
    app.all("/*", (request, response, next) => {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "*");
        response.header("Access-Control-Expose-Headers", "*");
        response.header(
            "Access-Control-Allow-Methods",
            "GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH"
        );
        response.header("Access-Control-Allow-Credentials", true);
        next();
    });

    app.use(express.urlencoded({ extended: true, limit: "20mb" }));
    app.use(express.json({ limit: "20mb" }));
    app.use(express.static("public"));

    //routing 
    app.use('/', userRoutes)

    //middleware for default error
    app.use((err, req, res, next) => {
        res.status(500).json({ error: true, message: err.message });
    });

};



app.listen(port, () => {
    console.log(`port is listening on port number ${port}`)
})

expressServer();
module.exports = app;

