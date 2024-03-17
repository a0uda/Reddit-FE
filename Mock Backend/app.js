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
      social_links: [
        { icon: "Instagram", username: "ahmedtoaima_" },
        { icon: "Facebook", username: "ahmedkhaled" },
      ],
      country: "string",
      gender: "Male",
      profile_picture: "string",
      banner_picture: "string",
      nsfw_flag: false,
      allow_followers: true,
      content_visibility: true,
      active_communities_visibility: false,
    },
  };

  res.status(200).json(profileSettings);
});

let notificationSettings = {
  private_messages: false,
  chat_messages: false,
  chat_requests: false,
  mentions: false,
  comments: false,
  upvotes_posts: false,
  upvotes_comments: true,
  replies: true,
  new_followers: true,
  invitations: true,
  posts: true,
};
app.get("/users/notification-settings", (req, res) => {
  res.status(200).json(notificationSettings);
});
app.patch("/users/change-notification-settings", (req, res) => {
  const updatedSettings = req.body;
  console.log(updatedSettings);
  notificationSettings = {
    ...notificationSettings,
    ...updatedSettings,
  };
  res.status(200).json(notificationSettings);
});

let emailSettings = {
  new_follower_email: true,
  chat_request_email: true,
  unsubscribe_from_all_emails: true,
};
app.get("/users/email-settings", (req, res) => {
  res.status(200).json(emailSettings);
});
app.patch("/users/change-email-settings", (req, res) => {
  const updatedSettings = req.body;
  console.log(updatedSettings);
  emailSettings = {
    ...emailSettings,
    ...updatedSettings,
  };
  res.status(200).json(emailSettings);
});

let feedSettings = {
  Adult_content_flag: true,
  autoplay_media: true,
  communitiy_content_sort: {
    type: ["top","hot","new","reem"],
    sort_remember_per_community: true,
  },
  global_content: {
    global_content_view: ["classic","compact"],
    global_remember_per_community: true,
  },
  Open_posts_in_new_tab: true,
  community_themes: true,
};
app.get("/users/feed-settings", (req, res) => {
  res.status(200).json(feedSettings);
});
app.patch("/users/change-feed-settings", (req, res) => {
  const updatedSettings = req.body;
  console.log(updatedSettings);
  feedSettings = {
    ...feedSettings,
    ...updatedSettings,
  };
  res.status(200).json(feedSettings);
});

module.exports = app;
