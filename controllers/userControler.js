const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendCookie = require("../utils/features");
require("dotenv").config();

const users = {
    login: async (req, res) =>
    {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select("+password");

        if (!user)
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password",
            });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password",
            });

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);

    },
    register: async (req, res) =>
    {
        const { name, email, password } = req.body;

        let user = await UserModel.findOne({ email });

        if (user)
            return res.status(404).json({
                success: false,
                message: "User Already Exist",
            });

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await UserModel.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered Successfully", 201);
    },

    getMyProfile: (req, res) =>
    {
        res.status(200).json({
            success: true,
            user: req.user,
        })

    },
    logout: (req, res) =>
    {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "Lax" : "None",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "You are Logged Out",
            user: req.user,
        })

    },
}

module.exports = users