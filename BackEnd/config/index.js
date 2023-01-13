require("dotenv").config();
const config = {
    database: {
        url: process.env.DB_URL,
        option: {
            user: "",
            pass: "",
            autoIndex: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        },
    },
};
module.exports = config;
