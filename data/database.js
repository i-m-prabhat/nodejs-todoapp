const mongoose = require("mongoose");
require("dotenv").config();


const databaseDB = () => mongoose.connect(process.env.MONGO_URI, {
    dbname: "backendApi"
})
    .then((c) => console.log(`Database connected with ${c.connection.host}`))
    .catch((e) => console.log(e));

module.exports = databaseDB