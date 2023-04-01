const express = require("express");
const app = express();
const userRoute = require("./routes/userRoutes");
const taskRoute = require("./routes/taskRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");


//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Using Routes 
app.use("/api/v1/users", userRoute);
app.use("/api/v1/task", taskRoute);

app.get("/", (req, res) =>
{
    res.send("Nice Working");
})

module.exports = app