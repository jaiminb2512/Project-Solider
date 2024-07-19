const router = require('express').Router();
const Note = require('../models/Note');
const User = require('../models/User'); 

// Create a note
router.post("/createnote", async (req, res) => {
  const { userid, title, description, tag } = req.body;
  
  try {
    // Check if the userid exists in the User collection
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newNote = new Note({
      user: userid,
      title,
      description,
      tag: tag || "General"
    });

    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all notes for a specific user
router.get("/getnotes/:userid", async (req, res) => {
  const { userid } = req.params;

  try {
    // Find all notes where user field matches the provided userid
    const notes = await Note.find({ user: userid });
    res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete a note by ID
router.delete('/deletenote/:id', async (req, res) => {
  try {
      const noteId = req.params.id;
      await Note.findByIdAndDelete(noteId);
      res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a note by ID
router.put("/editnote/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { title, description, tag } = req.body;

  try {
    // Check if the note exists
    let note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Update note fields
    note.title = title;
    note.description = description;
    note.tag = tag || "General";

    // Save updated note
    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
