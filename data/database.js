const mongoose = require("mongoose");
require("dotenv").config();


const databaseDB = () => mongoose.connect(process.env.MONGO_URI, {
    dbname: "backendApi"
})
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e));

module.exports = databaseDB