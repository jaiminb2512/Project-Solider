const router = require('express').Router();
const Note = require('../models/Note');
const User = require('../models/User'); 
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Wrong username or password");
    }

    //validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong username or password");
    }

    //send response
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

// Get all notes added by a specific user
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

module.exports = router;
