const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Experience = require('./models/Experience');
const Message = require('./models/Message');
const Skill = require('./models/Skill');
const Project = require('./models/Project.js');

const app = express();

// MIDDLEWARE
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));


app.get('/api/experience', async (req, res) => {
    try {
        const jobs = await Experience.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.post('/api/message', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ message: "Message Saved Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
});