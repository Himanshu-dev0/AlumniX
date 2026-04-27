const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');


// Middleware
const bodyParser = require('body-Parser');
app.use(express.json());

// Model
const Profile = require('./models/profile');

// TEST route
app.get("/api/profile", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SAVE PROFILE API
app.post('/api/profile', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();

    res.status(200).json({
      message: "Profile saved successfully",
      data: profile
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port,"0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});