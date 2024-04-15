const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Add PATCH method here
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const accountSettings = {
  account_settings: {
    email: "ahmedkhaled1029@gmail.com",
    verified_email_flag: "string",
    country: "Egypt",
    gender: "Male",
    gmail: "ahmedkhaled1029@gmail.com",
    connected_google: true,
    hasPassword: true,
  },
};

app.get("/users/account-settings", (req, res) => {
  res.status(200).json(accountSettings);
});

let c = 0;
app.patch("/users/change-account-settings", (req, res) => {
  accountSettings.account_settings[Object.keys(req.body)[0]] = Object.values(
    req.body
  )[0];
  if (c < 5) {
    c++;
    res.sendStatus(200);
  } else {
    res.status(404).send("Error");
  }
});
app.post("/users/disconnect-google", (req, res) => {
  const { password } = req.body;
  console.log(password);
  accountSettings.account_settings.connected_google = false;
  console.log(accountSettings);
  res.sendStatus(200);
});

app.patch("/users/change-email", (req, res) => {
  const { password, new_email } = req.body;
  accountSettings.account_settings.email = new_email;
  res.sendStatus(200);
});
app.patch("/users/change-password", (req, res) => {
  const { current_password, new_password, verified_new_password } = req.body;
  // accountSettings.account_settings.email = new_email;
  res.sendStatus(200);
});

app.post("/users/delete-account", (req, res) => {
  accountSettings.account_settings = {};
  console.log(accountSettings);
  res.sendStatus(200);
});

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

let users = [
  {
    _id: "661a2c3fab10a4b012e8f59a",
    username: "m",
    created_at: "2024-04-13T06:53:20.537Z",
    email: "me22@gmail.com",
    verified_email_flag: false,
    connected_google: false,
    display_name: "m",
    about: "",
    social_links: [],
    profile_picture: "",
    banner_picture: "",
    gender: "Female",
  },
  {
    _id: "661a2c3fab10a4b012e8f59b",
    username: "n",
    created_at: "2024-04-14T06:53:20.537Z",
    email: "ne22@gmail.com",
    verified_email_flag: false,
    connected_google: false,
    display_name: "n",
    about: "",
    social_links: [],
    profile_picture: "",
    banner_picture: "",
    gender: "Male",
  },
  {
    _id: "661a2c3fab10a4b012e8f59c",
    username: "o",
    created_at: "2024-04-15T06:53:20.537Z",
    email: "oe22@gmail.com",
    verified_email_flag: false,
    connected_google: false,
    display_name: "o",
    about: "",
    social_links: [],
    profile_picture: "",
    banner_picture: "",
    gender: "Female",
  },
  {
    id: "user-1",
    created_at: "2024-01-01",
    username: "JohnDoe",
    email: "john.doe@example.com",
    verified_email_flag: "true",
    gmail: "john.doe@gmail.com",
    facebook_email: null,
    display_name: "John Doe",
    about: "I love creating content!",
    social_links: [],
    profile_picture: "profile.jpg",
    banner_picture: null,
    country: "US",
    gender: "male",
    connected_google: true,
  },
];

app.post("/users/signup", (req, res) => {
  const { username, email, password } = req.body;

  const newUser = {
    username,
    email,
    password,
  };
  users.push(newUser);
  const token = jwt.sign({ username }, "RedditToken@", { expiresIn: "1d" });
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

app.post("/users/signup-google", (req, res) => {
  const { code } = req.body;
  username = "llllllllll";
  const token = jwt.sign({ username }, "RedditToken@", { expiresIn: "1h" });
  res
    .status(200)
    .json({ message: "User logged in with Google successfully", token });
  // const { code } = req.body;
  // const client_id =
  //   "178664293995-s6s92s28mme4eu54lg367sqhnj8bonff.apps.googleusercontent.com";
  // const client_secret = "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";
  // const redirect_uri = "http://localhost";
  // const grant_type = "authorization_code";

  // fetch("<https://oauth2.googleapis.com/token>", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: new URLSearchParams({
  //     code,
  //     client_id,
  //     client_secret,
  //     redirect_uri,
  //     grant_type,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((tokens) => {
  //     res.json(tokens);
  //   })
  //   .catch((error) => {
  //     console.error("Token exchange error:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   });
});

module.exports = app;

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

let popularComunities = [
  {
    id: 1,
    src: "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
    name: "r/sports",
    membersNumber: 1234,
  },
  {
    id: 2,
    src: "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
    name: "r/programming",
    membersNumber: 2000,
  },
  {
    id: 3,
    src: "https://styles.redditmedia.com/t5_2qh1u/styles/communityIcon_21ykcg22rm6c1.png",
    name: "r/Music",
    membersNumber: 1500,
  },
  {
    id: 4,
    src: "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
    name: "r/sports",
    membersNumber: 1000,
  },
  {
    id: 5,
    src: "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
    name: "r/programming",
    membersNumber: 2000,
  },
  {
    id: 6,
    src: "https://styles.redditmedia.com/t5_2qh1u/styles/communityIcon_21ykcg22rm6c1.png",
    name: "r/Music",
    membersNumber: 1500,
  },
  {
    id: 7,
    src: "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
    name: "r/sports",
    membersNumber: 1000,
  },
  {
    id: 8,
    src: "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
    name: "r/programming",
    membersNumber: 2000,
  },
  {
    id: 9,
    src: "https://styles.redditmedia.com/t5_2qh1u/styles/communityIcon_21ykcg22rm6c1.png",
    name: "r/Music",
    membersNumber: 1500,
  },
];
app.get("/communities/get-popular-communities", (req, res) => {
  res.status(200).json(popularComunities);
});

let recentPostsList = [
  {
    id: "1",
    user_id: "user123",
    username: "john_doe",
    title: "My First Post",
    description:
      "This is how Kellyn Acosta won it for the Chicago Fire in the 99th minute",
    created_at: "2024-03-29",
    edited_at: "2024-03-29",
    deleted_at: "2024-03-29",
    type: "image_and_videos",
    link_url: "https://example.com",
    images: [
      {
        path: "image1.jpg",
        caption: "Image caption 1",
        link: "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
      },
      {
        path: "image2.jpg",
        caption: "Image caption 2",
        link: "https://example.com/image2",
      },
    ],
    videos: [
      {
        path: "video1.mp4",
        caption: "Video caption 1",
        link: "https://example.com/video1",
      },
    ],
    poll: {
      options: ["Option 1", "Option 2", "Option 3"],
      votes: [10, 5, 7],
    },
    community_id: "community123",
    "community-name": "sports",
    comments_count: 9,
    // added //
    communityAvatarSrc:
      "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
    communityCoverSrc:
      "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
    joined: true,
    communityDescription:
      "Sports news and discussion about sports culture and sports history",
    communityMembers: 356,
    communityOnline: 12,
    //
    views_count: 100,
    shares_count: 20,
    upvotes_count: 8,
    downvotes_count: 5,
    oc_flag: true,
    spoiler_flag: false,
    nsfw_flag: false,
    locked_flag: false,
    allowreplies_flag: true,
    set_suggested_sort: "None (Recommended)",
    moderator_details: {
      approved_by: "moderator1",
      approved_date: "2024-03-29",
      removed_by: null,
      removed_date: null,
      spammed_by: null,
      spammed_type: null,
    },
    user_details: {
      total_views: 1000,
      upvote_rate: 0.5,
      total_shares: 30,
    },
  },
  {
    id: "2",
    user_id: "user123",
    username: "john_doe",
    title: "My First Post",
    description:
      "This is how Kellyn Acosta won it for the Chicago Fire in the 99th minute",
    created_at: "2024-03-29",
    edited_at: "2024-03-29",
    deleted_at: "2024-03-29",
    type: "image_and_videos",
    link_url: "https://example.com",
    images: [
      {
        path: "image1.jpg",
        caption: "Image caption 1",
        link: "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
      },
      {
        path: "image2.jpg",
        caption: "Image caption 2",
        link: "https://example.com/image2",
      },
    ],
    videos: [
      {
        path: "video1.mp4",
        caption: "Video caption 1",
        link: "https://example.com/video1",
      },
    ],
    poll: {
      options: ["Option 1", "Option 2", "Option 3"],
      votes: [10, 5, 7],
    },
    community_id: "community123",
    "community-name": "programming",
    comments_count: 20,
    // added //
    communityAvatarSrc:
      "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
    communityCoverSrc:
      "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
    joined: false,
    communityDescription:
      "programming news and discussion about programming culture and programming history",
    communityMembers: 2114,
    communityOnline: 63,
    //
    views_count: 100,
    shares_count: 20,
    upvotes_count: 57,
    downvotes_count: 5,
    oc_flag: true,
    spoiler_flag: false,
    nsfw_flag: false,
    locked_flag: false,
    allowreplies_flag: true,
    set_suggested_sort: "None (Recommended)",
    moderator_details: {
      approved_by: "moderator1",
      approved_date: "2024-03-29",
      removed_by: null,
      removed_date: null,
      spammed_by: null,
      spammed_type: null,
    },
    user_details: {
      total_views: 1000,
      upvote_rate: 0.5,
      total_shares: 30,
    },
  },
];

app.get("/communities/get-history-posts", (req, res) => {
  res.status(200).json(recentPostsList);
});

app.post("/users/join-community", (req, res) => {
  const { communityName } = req.body;
  recentPostsList = recentPostsList.map((post) => {
    if (post["community-name"] === communityName) {
      post.joined = true;
      console.log(post);
    }
    return post;
  });
  res.sendStatus(200);
});

app.post("/users/leave-community", (req, res) => {
  const { communityName } = req.body;
  recentPostsList = recentPostsList.map((post) => {
    if (post["community-name"] === communityName) {
      post.joined = false;
      console.log(post);
    }
    return post;
  });
  res.sendStatus(200);
});

let notifications = [
  {
    id: "1",
    created_at: new Date().toISOString().split("T")[0],
    post_id: "post123",
    comment_id: "comment456",
    sending_user_username: "osama_youssef",
    description:
      "first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description",
    unread_flag: true,
    hidden_flag: false,
    type: "message",
    // added //
    community_name: "r/sports",
    communityAvatarSrc:
      "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
  },
  {
    id: "5",
    created_at: new Date().toISOString().split("T")[0],
    post_id: "post123",
    comment_id: "comment456",
    sending_user_username: "osama_youssef",
    description:
      "first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description",
    unread_flag: true,
    hidden_flag: false,
    type: "message",
    // added //
    community_name: "r/sports",
    communityAvatarSrc:
      "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
  },
  {
    id: "6",
    created_at: new Date().toISOString().split("T")[0],
    post_id: "post123",
    comment_id: "comment456",
    sending_user_username: "osama_youssef",
    description:
      "first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description first notification description",
    unread_flag: true,
    hidden_flag: false,
    type: "message",
    // added //
    community_name: "r/sports",
    communityAvatarSrc:
      "https://styles.redditmedia.com/t5_2qgzy/styles/communityIcon_rvt3zjh1fc551.png",
  },
  {
    id: "2",
    created_at: "2024-03-25",
    post_id: "post789",
    comment_id: "comment012",
    sending_user_username: "ahmed_tarek",
    description: "You have a new comment",
    unread_flag: false,
    hidden_flag: false,
    type: "comment",
    // added //
    community_name: "r/programming",
    communityAvatarSrc:
      "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
  },
  {
    id: "3",
    created_at: "2024-03-24",
    post_id: "post345",
    comment_id: "comment678",
    sending_user_username: "osama_youssef",
    description: "You have a new reply",
    unread_flag: true,
    hidden_flag: false,
    type: "reply",
    // added //
    community_name: "r/sports",
    communityAvatarSrc:
      "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
  },
  {
    id: "4",
    created_at: "2024-03-24",
    post_id: "post345",
    comment_id: "comment678",
    sending_user_username: "osama_youssef",
    description: "You have a new reply",
    unread_flag: true,
    hidden_flag: false,
    type: "reply",
    // added //
    community_name: "r/sports",
    communityAvatarSrc:
      "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_1bqa1ibfp8q11.png",
  },
];

app.get("/notifications", (req, res) => {
  res.status(200).json(notifications);
});

app.patch("/notifications/mark-all-as-read", (req, res) => {
  notifications = notifications.map((notification) => ({
    ...notification,
    unread_flag: false,
  }));
  res.sendStatus(200);
});

app.patch("/notifications/mark-as-read/:id", (req, res) => {
  const { id } = req.params;
  const { read_flag } = req.body;
  const notification = notifications.find((notif) => notif.id === id);
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  notification.unread_flag = read_flag;
  res.sendStatus(200);
});

app.patch("/notifications/hide/:id", (req, res) => {
  const { id } = req.params;
  const notificationIndex = notifications.findIndex((notif) => notif.id === id);
  if (notificationIndex === -1) {
    return res.status(404).json({ message: "Notification not found" });
  }
  notifications[notificationIndex].hidden_flag = true;
  notifications.splice(notificationIndex, 1);
  res.sendStatus(200);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
let postsListings = [
  {
    id: "15",
    user_id: "user1",
    username: "john_doe",
    title: "First Post",
    description: "This is the first post",
    created_at: "2024-03-29",
    edited_at: "2024-03-29",
    deleted_at: "2024-03-29",
    type: "image_and_videos",
    link_url: "https://example.com",
    images: [
      {
        path: "image1.jpg",
        caption: "Image 1",
        link: "https://source.unsplash.com/random",
      },
    ],
    videos: [
      {
        path: "video1.mp4",
        caption: "Video 1",
        link: "https://example.com/video1.mp4",
      },
    ],
    poll: {
      options: ["Option 1", "Option 2", "Option 3"],
      votes: [0, 0, 0],
    },
    community_id: "community1",
    "community-name": "Community 1",
    comments_count: 0,
    views_count: 0,
    shares_count: 0,
    upvotes_count: 0,
    downvotes_count: 0,
    oc_flag: true,
    spoiler_flag: true,
    nsfw_flag: true,
    locked_flag: true,
    allowreplies_flag: true,
    set_suggested_sort: "None (Recommended)",
    moderator_details: {
      approved_by: "moderator1",
      approved_date: "2024-03-29",
      removed_by: "moderator2",
      removed_date: "2024-03-29",
      spammed_by: "moderator3",
      spammed_type: "spam",
    },
    user_details: {
      total_views: 0,
      upvote_rate: 0,
      total_shares: 0,
    },
  },
  {
    id: "18",
    user_id: "user2",
    username: "jane_smith",
    title: "Second Post",
    description: "This is the second post",
    created_at: "2024-03-26",
    edited_at: "2024-03-26",
    deleted_at: "2024-03-26",
    type: "image_and_videos",
    link_url: "https://example.com",
    images: [
      {
        path: "image2.jpg",
        caption: "Image 2",
        link: "https://source.unsplash.com/random",
      },
    ],
    videos: [
      {
        path: "video2.mp4",
        caption: "Video 2",
        link: "https://example.com/video2.mp4",
      },
    ],
    poll: {
      options: ["Option 1", "Option 2", "Option 3"],
      votes: [0, 0, 0],
    },
    community_id: "community2",
    "community-name": "Community 2",
    comments_count: 0,
    views_count: 0,
    shares_count: 0,
    upvotes_count: 0,
    downvotes_count: 0,
    oc_flag: true,
    spoiler_flag: true,
    nsfw_flag: true,
    locked_flag: true,
    allowreplies_flag: true,
    set_suggested_sort: "None (Recommended)",
    moderator_details: {
      approved_by: "moderator1",
      approved_date: "2024-03-26",
      removed_by: "moderator2",
      removed_date: "2024-03-26",
      spammed_by: "moderator3",
      spammed_type: "spam",
    },
    user_details: {
      total_views: 0,
      upvote_rate: 0,
      total_shares: 0,
    },
  },
  {
    id: "3",
    user_id: "user3",
    username: "joe_bloggs",
    title: "Third Post",
    description: "This is the third post",
    created_at: "2024-03-27",
    edited_at: "2024-03-27",
    deleted_at: "2024-03-27",
    type: "image_and_videos",
    link_url: "https://example.com",
    images: [
      {
        path: "image3.jpg",
        caption: "Image 3",
        link: "https://source.unsplash.com/random",
      },
    ],
    videos: [
      {
        path: "video3.mp4",
        caption: "Video 3",
        link: "https://example.com/video3.mp4",
      },
    ],
    poll: {
      options: ["Option 1", "Option 2", "Option 3"],
      votes: [0, 0, 0],
    },
    community_id: "community3",
    "community-name": "Community 3",
    comments_count: 0,
    views_count: 0,
    shares_count: 0,
    upvotes_count: 0,
    downvotes_count: 0,
    oc_flag: true,
    spoiler_flag: true,
    nsfw_flag: true,
    locked_flag: true,
    allowreplies_flag: true,
    set_suggested_sort: "None (Recommended)",
    moderator_details: {
      approved_by: "moderator1",
      approved_date: "2024-03-27",
      removed_by: "moderator2",
      removed_date: "2024-03-27",
      spammed_by: "moderator3",
      spammed_type: "spam",
    },
    user_details: {
      total_views: 0,
      upvote_rate: 0,
      total_shares: 0,
    },
  },
  {
    id: "4",
    user_id: "user4",
    username: "john_doe",
    title: "First Post",
    description: "This is the first post",
    created_at: "2024-03-29",
    edited_at: "2024-03-29",
    deleted_at: "2024-03-29",
    type: "image_and_videos",
    link_url: "https://example.com",
    images: [
      {
        path: "image4.jpg",
        caption: "Image 4",
        link: "https://source.unsplash.com/random",
      },
    ],
    videos: [
      {
        path: "video4.mp4",
        caption: "Video 4",
        link: "https://example.com/video4.mp4",
      },
    ],
    poll: {
      options: ["Option 4", "Option 2", "Option 3"],
      votes: [0, 0, 0],
    },
    community_id: "community4",
    "community-name": "Community 4",
    comments_count: 0,
    views_count: 0,
    shares_count: 0,
    upvotes_count: 0,
    downvotes_count: 0,
    oc_flag: true,
    spoiler_flag: true,
    nsfw_flag: true,
    locked_flag: true,
    allowreplies_flag: true,
    set_suggested_sort: "None (Recommended)",
    moderator_details: {
      approved_by: "moderator4",
      approved_date: "2024-03-29",
      removed_by: "moderator2",
      removed_date: "2024-03-29",
      spammed_by: "moderator3",
      spammed_type: "spam",
    },
    user_details: {
      total_views: 0,
      upvote_rate: 0,
      total_shares: 0,
    },
  },
  {
    id: "5",
    user_id: "user5",
    username: "joe_bloggs",
    title: "Third Post",
    description: "This is the third post",
    created_at: "2024-05-27",
    edited_at: "2024-05-27",
    deleted_at: "2024-05-27",
    type: "image_and_videos",
    link_url: "https://example.com",
    images: [
      {
        path: "image5.jpg",
        caption: "Image 5",
        link: "https://source.unsplash.com/random",
      },
    ],
    videos: [
      {
        path: "video5.mp4",
        caption: "Video 5",
        link: "https://example.com/video5.mp4",
      },
    ],
    poll: {
      options: ["Option 1", "Option 2", "Option 3"],
      votes: [0, 0, 0],
    },
    community_id: "community3",
    "community-name": "Community 3",
    comments_count: 0,
    views_count: 0,
    shares_count: 0,
    upvotes_count: 0,
    downvotes_count: 0,
    oc_flag: true,
    spoiler_flag: true,
    nsfw_flag: true,
    locked_flag: true,
    allowreplies_flag: true,
    set_suggested_sort: "None (Recommended)",
    moderator_details: {
      approved_by: "moderator1",
      approved_date: "2024-03-27",
      removed_by: "moderator2",
      removed_date: "2024-03-27",
      spammed_by: "moderator3",
      spammed_type: "spam",
    },
    user_details: {
      total_views: 0,
      upvote_rate: 0,
      total_shares: 0,
    },
  },
  {
    id: "6",
    user_id: "user6",
    username: "jane_smith",
    title: "Second Post",
    description: "This is the second post",
    created_at: "2024-03-26",
    edited_at: "2024-03-26",
    deleted_at: "2024-03-26",
    type: "image_and_videos",
    link_url: "https://example.com",
    images: [
      {
        path: "image2.jpg",
        caption: "Image 2",
        link: "https://source.unsplash.com/random",
      },
    ],
    videos: [
      {
        path: "video2.mp4",
        caption: "Video 2",
        link: "https://example.com/video2.mp4",
      },
    ],
    poll: {
      options: ["Option 1", "Option 2", "Option 3"],
      votes: [0, 0, 0],
    },
    community_id: "community2",
    "community-name": "Community 2",
    comments_count: 0,
    views_count: 0,
    shares_count: 0,
    upvotes_count: 0,
    downvotes_count: 0,
    oc_flag: true,
    spoiler_flag: true,
    nsfw_flag: true,
    locked_flag: true,
    allowreplies_flag: true,
    set_suggested_sort: "None (Recommended)",
    moderator_details: {
      approved_by: "moderator1",
      approved_date: "2024-03-26",
      removed_by: "moderator2",
      removed_date: "2024-03-26",
      spammed_by: "moderator3",
      spammed_type: "spam",
    },
    user_details: {
      total_views: 0,
      upvote_rate: 0,
      total_shares: 0,
    },
  },
].concat(recentPostsList); // m3 haget osama

let comments = [
  {
    id: "11",
    post_id: "7",
    user_id: "567",
    username: "commenter567",
    parent_id: "",
    replies_comments_ids: [],
    created_at: "2024-03-30T11:30:00",
    edited_at: "",
    deleted_at: "",
    description:
      "I found this post thought-provoking. It made me reconsider my own perspective.",
    upvotes_count: 14,
    downvotes_count: 1,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "12",
    post_id: "7",
    user_id: "678",
    username: "user678",
    parent_id: "",
    replies_comments_ids: [],
    created_at: "2024-03-29T14:45:00",
    edited_at: "",
    deleted_at: "",
    description:
      "I have a question regarding one of the points you raised. Can you elaborate?",
    upvotes_count: 6,
    downvotes_count: 3,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "13",
    post_id: "8",
    user_id: "789",
    username: "user789",
    parent_id: "",
    replies_comments_ids: [],
    created_at: "2024-03-28T10:20:00",
    edited_at: "2024-03-28T12:35:00",
    deleted_at: "",
    description:
      "I enjoyed reading your post. It provided a fresh perspective on the topic.",
    upvotes_count: 11,
    downvotes_count: 0,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "moderator123",
      approved_date: "2024-03-28T12:40:00",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "14",
    post_id: "8",
    user_id: "901",
    username: "commenter901",
    parent_id: "",
    replies_comments_ids: [],
    created_at: "2024-03-27T13:55:00",
    edited_at: "",
    deleted_at: "",
    description:
      "I found your post very informative. It helped me understand the topic better.",
    upvotes_count: 9,
    downvotes_count: 1,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "15",
    post_id: "9",
    user_id: "234",
    username: "user234",
    parent_id: "",
    replies_comments_ids: [],
    created_at: "2024-03-26T16:40:00",
    edited_at: "",
    deleted_at: "",
    description:
      "Your post raises some important points. I appreciate the insights.",
    upvotes_count: 7,
    downvotes_count: 2,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "16",
    post_id: "9",
    user_id: "345",
    username: "commenter345",
    parent_id: "",
    replies_comments_ids: [],
    created_at: "2024-03-25T09:10:00",
    edited_at: "",
    deleted_at: "",
    description:
      "I strongly agree with your viewpoint. Your post is well-argued and convincing.",
    upvotes_count: 8,
    downvotes_count: 0,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "17",
    post_id: "10",
    user_id: "567",
    username: "user567",
    parent_id: "",
    replies_comments_ids: [],
    created_at: "2024-03-24T14:20:00",
    edited_at: "",
    deleted_at: "",
    description: "I have a different perspective on this topic. Let's discuss!",
    upvotes_count: 5,
    downvotes_count: 3,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "18",
    post_id: "10",
    user_id: "678",
    username: "commenter678",
    parent_id: "",
    replies_comments_ids: [],
    created_at: "2024-03-23T12:05:00",
    edited_at: "",
    deleted_at: "",
    description:
      "Your post provides a comprehensive overview of the topic. Well done!",
    upvotes_count: 10,
    downvotes_count: 1,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "19",
    post_id: "1",
    user_id: "901",
    username: "user901",
    parent_id: "1",
    replies_comments_ids: [
      {
        id: "21",
        post_id: "1",
        user_id: "902",
        username: "user902",
        parent_id: "19",
        replies_comments_ids: [],
        created_at: "2024-03-22T09:50:00",
        edited_at: "",
        deleted_at: "",
        description: "Replyyyyyy.",
        upvotes_count: 12,
        downvotes_count: 0,
        allowreplies_flag: true,
        spam_flag: false,
        locked_flag: false,
        show_comment_flag: true,
        moderator_details: {
          approved_by: "",
          approved_date: "",
          removed_by: "",
          removed_date: "",
          spammed_by: "",
          spammed_type: "",
        },
      },
    ],
    created_at: "2024-03-22T09:50:00",
    edited_at: "",
    deleted_at: "",
    description:
      "I found your post very insightful. It shed light on a complex issue.",
    upvotes_count: 12,
    downvotes_count: 0,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
  {
    id: "20",
    post_id: "1",
    user_id: "901",
    username: "user901",
    parent_id: "1",
    replies_comments_ids: [
      {
        id: "22",
        post_id: "1",
        user_id: "903",
        username: "user903",
        parent_id: "20",
        replies_comments_ids: [],
        created_at: "2024-03-22T09:50:00",
        edited_at: "",
        deleted_at: "",
        description: "Replyyyyyy from user903.",
        upvotes_count: 12,
        downvotes_count: 0,
        allowreplies_flag: true,
        spam_flag: false,
        locked_flag: false,
        show_comment_flag: true,
        moderator_details: {
          approved_by: "",
          approved_date: "",
          removed_by: "",
          removed_date: "",
          spammed_by: "",
          spammed_type: "",
        },
      },
    ],
    created_at: "2024-03-22T09:50:00",
    edited_at: "",
    deleted_at: "",
    description: "I found your post very insightful. But I have a question.",
    upvotes_count: 12,
    downvotes_count: 0,
    allowreplies_flag: true,
    spam_flag: false,
    locked_flag: false,
    show_comment_flag: true,
    moderator_details: {
      approved_by: "",
      approved_date: "",
      removed_by: "",
      removed_date: "",
      spammed_by: "",
      spammed_type: "",
    },
  },
];

function shuffleList(list) {
  let currentIndex = list.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [list[currentIndex], list[randomIndex]] = [
      list[randomIndex],
      list[currentIndex],
    ];
  }

  return list;
}

// * Listing
app.get("/listings/posts/random", (req, res) => {
  res.status(200).json(postsListings);
});

app.get("/listings/posts/best", (req, res) => {
  res.status(200).json([...postsListings].reverse());
});

app.get("/listings/posts/hot", (req, res) => {
  res.status(200).json(shuffleList(postsListings));
});

app.get("/listings/posts/new", (req, res) => {
  res.status(200).json(shuffleList(postsListings));
});

app.get("/listings/posts/top", (req, res) => {
  res.status(200).json(shuffleList(postsListings));
});

app.post("/posts-or-comments/vote", (req, res) => {
  const { id, is_post, rank } = req.body;
  if (is_post) {
    postsListings = postsListings.map((post) => {
      if (post.id === id) {
        if (rank === 1) {
          post.upvotes_count++;
        } else {
          post.downvotes_count++;
        }
      }
      return post;
    });
  } else {
    comments = comments.map((comment) => {
      if (comment.id === id) {
        if (rank === 1) {
          comment.upvotes_count++;
        } else {
          comment.downvotes_count++;
        }
      }
      return comment;
    });
  }
  res.sendStatus(200);
});

let userAbout = {
  id: "string",
  created_at: "Feb 24, 2024",
  username: "u/Icy-Cry-5376",
  email: "string",
  gmail: "string",
  facebook_email: "string",
  profile_settings: {
    display_name: "Icy-Cry-5376",
    about: "string",
    social_links: [
      { icon: "Instagram", username: "ahmedtoaima_" },
      {
        icon: "Facebook",
        username: "ahmedkhaled",
        displayName: "Ahmed Khaled",
      },
    ],
    profile_picture:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    banner_picture:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    nsfw_flag: true,
    allow_followers: true,
    content_visibility: true,
    active_communities_visibility: true,
  },
  country: "string",
  gender: "Male",
  connected_google: true,
  connected_twitter: true,
  connected_apple: true,
  communities: [
    {
      id: "string",
      name: "string",
      favorite_flag: true,
      disable_updates: true,
    },
  ],
  moderated_communities: [
    {
      id: "string",
      name: "ree's community",
      src: "https://styles.redditmedia.com/t5_2qh1u/styles/communityIcon_21ykcg22rm6c1.png",
      members_number: 1000,
      joined: true,
    },
    {
      id: "string",
      name: "halla's community",
      src: "https://styles.redditmedia.com/t5_2qh1u/styles/communityIcon_21ykcg22rm6c1.png",
      members_number: 500,
      joined: false,
    },
  ],
};
app.get("/users/about/", (req, res) => {
  res.status(200).json(userAbout);
});

app.get("/users/downvoted-posts", (req, res) => {
  res.status(200).json(postsListings);
});
app.get("/users/upvoted-posts", (req, res) => {
  res.status(200).json(postsListings);
});
app.get("/users/hidden-and-reported-posts", (req, res) => {
  res.status(200).json(postsListings);
});
app.get("/users/saved-posts-and-comments", (req, res) => {
  res.status(200).json(postsListings);
});

app.get("/users/posts", (req, res) => {
  res.status(200).json(postsListings);
});

app.get("/users/comments", (req, res) => {
  res.status(200).json(postsListings);
});
app.get("/users/overview", (req, res) => {
  res.status(200).json(postsListings);
});

app.get("/users/about/:username", (req, res) => {
  const { username } = req.params;
  console.log("username", username);
  const user = users.find((user) => user.username === username);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
});

const getAuthUsername = (req) => {
  const token = req.headers?.token;
  console.log("req.headers", req.headers);
  console.log("token", token);

  if (!token) return null;

  const decodedToken = jwt.verify(token, "RedditToken@");
  const username = decodedToken.username;

  return username;
};

app.get("/users/communities", (req, res) => {
  // const username = getAuthUsername(req);
  // if (!username) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  res.status(200).json(communities);
});

// * Post
app.get("/posts/get-post/:id", (req, res) => {
  const { id } = req.params;
  const post = postsListings.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(post);
});

app.get("/posts/get-comments/:id", (req, res) => {
  const { id } = req.params;
  const postComments = comments.filter((comment) => comment.post_id === id);
  if (!postComments) {
    return res.status(404).json({ message: "Comments not found" });
  }
  res.status(200).json(postComments);
});

app.post("/comments/new-comment", (req, res) => {
  const { id, description } = req.body;

  const username = getAuthUsername(req);
  console.log("username", username);
  if (!username) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("username", username);
  const commentId = crypto.randomUUID();

  comments = comments.concat([
    {
      id: commentId,
      post_id: id,
      user_id: "567",
      username: username,
      parent_id: commentId,
      replies_comments_ids: [],
      created_at: new Date(),
      edited_at: "",
      deleted_at: "",
      description: description,
      upvotes_count: 14,
      downvotes_count: 1,
      allowreplies_flag: true,
      spam_flag: false,
      locked_flag: false,
      show_comment_flag: true,
      moderator_details: {
        approved_by: "",
        approved_date: "",
        removed_by: "",
        removed_date: "",
        spammed_by: "",
        spammed_type: "",
      },
    },
  ]);

  console.log(comments);

  res.status(200).json({ message: "Comment added successfully." });
});

let communities = [
  {
    name: "sports",
    title: "Reddit Sports",
    description:
      "Sports News and Highlights from the NFL, NBA, NHL, MLB, MLS, and leagues around the world.",
    membersNumber: 5000,
    onlineMembers: 205,
    rank: 5,
  },
  {
    name: "programming",
    title: "programming",
    description: "Computer Programming",
    membersNumber: 1000,
    onlineMembers: 500,
    rank: 1,
  },
  {
    name: "music",
    title: "Reddit Music",
    description: "The musical community of reddit",
    membersNumber: 7000,
    onlineMembers: 300,
    rank: 3,
  },
];

//Added Request (doesn't exist in the API)
//(return the community details by passing the community name as a prameter in the path)
app.get("/communities/:communityName", (req, res) => {
  const { communityName } = req.params;
  const community = communities.find(
    (community) => community.name === communityName
  );
  if (community) {
    res.status(200).json(community);
  } else {
    res.status(404).json({ error: "Community not found" });
  }
});

let CommunityModerators = [
  {
    community_name: "sports",
    moderators: [
      {
        id: 1,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png",
        username: "u/FirstModerator",
        approved_at: "2024-03-29",
      },
      {
        id: 2,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_2.png",
        username: "u/SecondModerator",
        approved_at: "2024-03-29",
      },
      {
        id: 3,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png",
        username: "u/ThirdModerator",
        approved_at: "2024-03-29",
      },
      {
        id: 4,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png",
        username: "u/FourthModerator",
        approved_at: "2024-03-29",
      },
      {
        id: 5,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png",
        username: "u/FifthModerator",
        approved_at: "2024-03-29",
      },
      {
        id: 6,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png",
        username: "u/SixthModerator",
        approved_at: "2024-03-29",
      },
      {
        id: 7,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png",
        username: "u/SeventhModerator",
        approved_at: "2024-03-29",
      },
    ],
  },
  {
    community_name: "programming",
    moderators: [
      {
        id: 6,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_6.png",
        username: "u/SixthModerator",
        approved_at: "2024-03-29",
      },
      {
        id: 7,
        profile_picture:
          "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_7.png",
        username: "u/SeventhModerator",
        approved_at: "2024-03-29",
      },
    ],
  },
];

app.get("/communities/about/moderators/:communityName", (req, res) => {
  const { communityName } = req.params;
  const community = CommunityModerators.find(
    (community) => community.community_name === communityName
  );
  if (community) {
    res.status(200).json(community.moderators);
  } else {
    res.status(404).json({ error: "Community not found" });
  }
});

const communityRules = [
  {
    community_name: "sports",
    rules: [
      {
        rule_order: 1,
        rule_title: "Civil Behavior",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Keep posts and comments civil at all times. Follow proper reddiquette. Please try to be respectful to everyone. Hateful or otherwise inappropriate behaviour will not be tolerated. No witch-hunting.",
      },
      {
        rule_order: 2,
        rule_title: "Self-Promotion",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Self-promotion/original content is allowed in certain circumstances. Profile sharing is only permitted through setting your user flair to your Letterboxd Username, using our profile sharing mega-thread, or in other mod-approved threads. Original content (LB lists/reviews, third-party OC etc.) is generally only permitted within our weekly threads. If you feel your original content promotes discussion, is of relevance/importance to the sub, or is high-effort/high-quality, exceptions will be made pending mod discretion.",
      },
      {
        rule_order: 3,
        rule_title: "Low-Effort Content",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Low-effort/low-quality posts will be removed. Low-effort questions, low-quality shared content, or any content deemed by mods to lack honest intent, will be removed. Shared content must be relevant to Letterboxd or Film, and must be of an acceptable standard. Content that pushes agendas, has excessive ads, or is otherwise deemed to be a negative contribution, will be removed at mod discretion. Image macros, screen-grabs or commonly used memes/image formats must make an honest attempt at humor.",
      },
      {
        rule_order: 4,
        rule_title: "No Wank/Circlejerking",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "No wank/circlejerking posts allowed. Standalone posts and/or comments that are considered to be bait and/or wank about specific or non-specific users or reviews on Letterboxd will be removed. These types of posts have been deemed to be low-effort and, most importantly, unwelcoming to all individuals who use both the subreddit and Letterboxd.",
      },
      {
        rule_order: 5,
        rule_title: "Duplicate Posts/Reposts",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Duplicate posts/reposts will be removed. Individual posts that belong in an existing masterthread will be removed.",
      },
      {
        rule_order: 6,
        rule_title: "No Vandalism",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "TMDb/Letterboxd vandalism posts are not allowed. Screenshots/links to content vandalism on either TMDb and/or Letterboxd will be removed. These posts fall under low effort and do not encourage adequate discussion on the subreddit.",
      },
      {
        rule_order: 7,
        rule_title: "Suggestions for Letterboxd",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Suggestions for additions to the Letterboxd site will be redirected. Standalone posts offering original and/or common suggestions for Letterboxd will be directed to the official Letterboxd feedback site (letterboxd.nolt.io). Posts discussing new updates to the website and/or app are allowed.",
      },
      {
        rule_order: 8,
        rule_title: "Miscellaneous Content",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Miscellaneous content that is addressed in the FAQ will be removed. Any posts or comments discussing or asking about issues that are addressed in the sub FAQ will be removed. The poster will be directed to the FAQ page.",
      },
      {
        rule_order: 9,
        rule_title: "Spoiler Policy",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Spoiler posts/comments must be marked as such. Absolutely no spoilers, intentional or otherwise, in post titles. This will be considered a serious offense and could result in a permanent ban. All posts with spoilers INSIDE the body of said post must be marked with the spoiler flair. When commenting on a post that is NOT labelled with the spoiler flair, please use proper spoiler formatting. Comments containing spoilers are acceptable within posts marked with the spoiler flair.",
      },
      {
        rule_order: 10,
        rule_title: "Consequences for Violations",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Consequences. Violations of any of the rules above will be met with a removal, a warning, a temporary ban, or a perma ban, at the discretion of the Moderators, in relation to the severity and/or repetitive nature of said violation(s).",
      },
    ],
  },
  {
    community_name: "programming",
    rules: [
      {
        rule_order: 1,
        rule_title: "Civil Behavior",
        applies_to: "posts_and_comments",
        report_reason: "string",
        full_description:
          "Keep posts and comments civil at all times. Follow proper reddiquette. Please try to be respectful to everyone. Hateful or otherwise inappropriate behaviour will not be tolerated. No witch-hunting.",
      },
    ],
  },
];

app.get("/communities/rules/:communityName", (req, res) => {
  const { communityName } = req.params;
  const community = communityRules.find(
    (community) => community.community_name === communityName
  );
  if (community) {
    res.status(200).json(community.rules);
  } else {
    res.status(404).json({ error: "Community not found" });
  }
});
