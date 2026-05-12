require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const TaskSchema = new mongoose.Schema({
    text: String
});

const Task = mongoose.model("Task", TaskSchema);


// GET TASKS
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});


// ADD TASK
app.post("/tasks", async (req, res) => {

    const newTask = new Task({
        text: req.body.text
    });

    await newTask.save();

    res.json(newTask);
});


// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
        message: "Task Deleted"
    });
});

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});