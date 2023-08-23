const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up MongoDB connection
mongoose.connect('mongodb://mongodb:27017/notesDB', { useNewUrlParser: true, useUnifiedTopology: true });
const Note = mongoose.model('Note', { title: String, content: String });

const app = express();
app.use(bodyParser.json());

// API routes for CRUD operations
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.status(201).json(newNote);
});

// ... Similar routes for update, delete, etc.

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
