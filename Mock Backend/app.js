const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users/profile-settings", (req, res) => {
  const profileSettings = {
    profile_settings: {
      display_name: "string",
      about: "string",
      social_links: [{icon: "Instagram", username:"ahmedtoaima_"}, {icon: "Facebook", username:"ahmedkhaled"}],
      country: "string",
      gender: "Male",
      profile_picture: "string",
      banner_picture: "string",
      nsfw_flag: true,
      allow_followers: true,
      content_visibility: true,
      active_communities_visibility: false,
    },
  };

  res.status(200).json(profileSettings);
});

module.exports = app;
