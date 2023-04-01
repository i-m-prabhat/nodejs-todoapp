require("dotenv").config();
const port = process.env.PORT || 5000
const app = require("./app.js")
const databaseDB = require("./data/database.js");


databaseDB();

app.listen(port, () =>
{
    console.log(`Server started on port ${port} in ${process.env.NODE_ENV} Mode`);
})