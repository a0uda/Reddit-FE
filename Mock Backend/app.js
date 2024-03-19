const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Add PATCH method here
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

let profileSettings = {
  profile_settings: {
    display_name: "string",
    about: "string",
    social_links: [
      { icon: "Instagram", username: "ahmedtoaima_" },
      {
        icon: "Facebook",
        username: "ahmedkhaled",
        displayName: "Ahmed Khaled",
      },
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

app.get("/users/profile-settings", (req, res) => {
  res.status(200).json(profileSettings);
});

app.patch("/users/change-profile-settings", (req, res) => {
  profileSettings.profile_settings[Object.keys(req.body)[0]] = Object.values(
    req.body
  )[0];
  res.status(200).json(profileSettings);
});

app.post("/users/clear-history", (req, res) => {
  res.sendStatus(200);
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
  emailSettings = {
    ...emailSettings,
    ...updatedSettings,
  };
  res.status(200).json(emailSettings);
});

let feedSettings = {
  Adult_content_flag: true,
  autoplay_media: true,
  community_content_sort: {
    type: "top",
    sort_remember_per_community: true,
  },
  global_content: {
    global_content_view: "classic",
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
  feedSettings = {
    ...feedSettings,
    ...updatedSettings,
  };
  res.sendStatus(200);
});

app.post("/users/add-social-link", (req, res) => {
  const { icon, username, displayName } = req.body;
  profileSettings.profile_settings.social_links.push({
    icon: icon,
    username: username,
    displayName: displayName,
  });
  res.sendStatus(200);
});

app.post("/users/delete-social-link", (req, res) => {
  const { icon, username, displayName } = req.body;
  profileSettings.profile_settings.social_links.pop({
    icon: icon,
    username: username,
    displayName: displayName,
  });
  res.sendStatus(200);
});

const safetySettings = {
  safety_and_privacy_settings: {
    blocked_users: [
      {
        id: "1",
        username: "Ahmed",
        blocked_date: "2023/10/10",
        profile_picture: "firebase.com",
      },
      {
        id: "2",
        username: "Omar",
        blocked_date: "2023/5/5",
        profile_picture: "firebase.com",
      },
      {
        id: "3",
        username: "Karim",
        blocked_date: "2023/1/1",
        profile_picture: "firebase.com",
      },
    ],
    muted_communities: [
      {
        id: "1",
        "community-title": "Ahmed",
        muted_date: "2023/10/10",
        profile_picture: "firebase.com",
      },
      {
        id: "2",
        "community-title": "Omar",
        muted_date: "2023/5/5",
        profile_picture: "firebase.com",
      },
      {
        id: "3",
        "community-title": "Karim",
        muted_date: "2023/1/1",
        profile_picture: "firebase.com",
      },
    ],
  },
};
app.get("/users/safety-settings", (req, res) => {
  res.status(200).json(safetySettings);
});

app.post("/users/block-unblock-user", (req, res) => {
  const { blocked_username, block } = req.body;
  if (!block) {
    safetySettings.safety_and_privacy_settings.blocked_users =
      safetySettings.safety_and_privacy_settings.blocked_users.filter(
        (user) => user.username !== blocked_username
      );
  } else {
    safetySettings.safety_and_privacy_settings.blocked_users.push({
      username: blocked_username,
      blocked_date: new Date(),
    });
  }

  res.sendStatus(200);
});

app.post("/users/mute-unmute-community", (req, res) => {
  if (!req.body.mute) {
    safetySettings.safety_and_privacy_settings.muted_communities =
      safetySettings.safety_and_privacy_settings.muted_communities.filter(
        (user) => user["community-title"] !== req.body["community-title"]
      );
  } else {
    safetySettings.safety_and_privacy_settings.muted_communities.push({
      "community-title": req.body["community-title"],
      muted_date: new Date(),
    });
  }
  res.sendStatus(200);
});

let chatSettings = {
  who_send_chat_request_flag: "Everyone",
  who_send_private_messages_flag: "Everyone",
};
app.get("/users/chats-and-msgs-settings", (req, res) => {
  res.status(200).json(chatSettings);
});
app.patch("/users/change-chats-and-msgs-settings", (req, res) => {
  chatSettings[Object.keys(req.body)[0]] = Object.values(req.body)[0];
  console.log(chatSettings);
  res.sendStatus(200);
});

let users = [];

app.post("/users/signup", (req, res) => {
  const { username, email, password } = req.body;

  const newUser = {
    username,
    email,
    password,
  };
  users.push(newUser);
  const token = jwt.sign({ username }, "RedditToken@", { expiresIn: "1h" });
  res.status(201).json({ message: "User created successfully", token });
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign({ username }, "RedditToken@", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

app.post("/users/forget-username", (req, res) => {
  const { email } = req.body;
  res.status(200).json({ message: "Email sent successfully" });
});
app.post("/users/forget-password", (req, res) => {
  const { username, email } = req.body;
  res.status(200).json({ message: "Email sent successfully" });
});

module.exports = app;
