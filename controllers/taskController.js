const Task = require("../models/task");

const task = {
    newTask: async (req, res) =>
    {
        const { title, description } = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            message: "Task Added Successfully",
        });
    },
    getMyTask: async (req, res, next) =>
    {
        const userId = req.user._id;

        const tasks = await Task.find({ user: userId });

        res.status(200).json({
            success: true,
            tasks,
        });
    },
    updateTask: async (req, res, next) =>
    {
        const task = await Task.findById(req.params.id);

        if (!task)
            return res.status(404).json({
                success: false,
                message: "Invalid Id",
            });

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated"
        });
    },
    deleteTask: async (req, res, next) =>
    {
        const task = await Task.findById(req.params.id);

        if (!task)
            return res.status(404).json({
                success: false,
                message: "Invalid Id",
            });

        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task Deleted",
        });
    },
}

module.exports = task