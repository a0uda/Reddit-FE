// export type PostType = {
//   is_post: boolean;
//   _id: string;
//   username: string;
//   title: string;
//   description: string;
//   created_at: string;
//   deleted: boolean;
//   type: string;
//   link_url: string;
//   images: {
//     path: string;
//     caption: string;
//     link: string;
//     _id: string;
//   }[];
//   videos: {
//     path: string;
//     caption: string;
//     link: string;
//     _id: string;
//   }[];
//   poll: {
//     options: string;
//     votes: number;
//     _id: string;
//   };
//   polls_voting_length: number;
//   polls_voting_is_expired_flag: boolean;
//   post_in_community_flag: boolean;
//   community_name: string;
//   //to be edited when malak does it -ree
//   avatar: string;
//   //communityAvatarSrc: string;
//   // community_id: string;
//   // comments_count: number;
//   // //added
//   // communityCoverSrc: string;
//   // joined: boolean;
//   // communityDescription: string;
//   // communityMembers: number;
//   // communityOnline: number;
//   // //
//   comments_count: number;
//   saved: boolean;
//   hidden: boolean;
//   //
//   views_count: number;
//   shares_count: number;
//   upvotes_count: number;
//   downvotes_count: number;
//   oc_flag: boolean;
//   spoiler_flag: boolean;
//   nsfw_flag: boolean;
//   locked_flag: boolean;
//   allowreplies_flag: boolean;
//   scheduled_flag: boolean;
//   //set_suggested_sort: 'None (Recommended)';
//   moderator_details: {
//     approved_by: string;
//     approved_date: string;
//     removed_by: string;
//     removed_date: string;
//     spammed_by: string;
//     spammed_type: string;
//     removed_flag: boolean;
//     spammed_flag: boolean;
//     approved_flag: boolean;
//   };
//   user_details: {
//     total_views: number;
//     upvote_rate: number;
//     total_shares: number;
//   };
//   is_reposted_flag: boolean;
//   reposted: [];
//   user_id: string;
//   __v: number;
// };

export type PostType = {
  _id: string; // Unique identifier for the post
  avatar: string; //metzweda
  saved: boolean; //metzweda
  user_id: string; // Reference to the User
  username: string; // Username
  title: string; // Title of the post
  description?: string; // Description, optional
  created_at: Date; // When the post was created
  edited_at?: Date; // When the post was edited
  deleted_at?: Date; // When the post was deleted
  deleted: boolean; // Flag indicating if the post is deleted
  type: 'image_and_videos' | 'polls' | 'url' | 'text' | 'hybrid' | 'reposted'; // Type of post
  link_url?: string; // URL link for the post, optional
  images?: {
    path: string;
    caption?: string;
    link?: string;
  }[]; // List of images with optional captions and links
  videos?: {
    path: string;
    caption?: string;
    link?: string;
  }[]; // List of videos with optional captions and links
  polls?: {
    options: string;
    votes: number;
  }[]; // List of poll options with their vote counts
  polls_voting_length: number; // Length of the poll voting period in days
  polls_voting_is_expired_flag: boolean; // If the poll voting has expired
  post_in_community_flag: boolean; // If the post is in a community
  community_id?: string; // Community ID reference
  community_name?: string; // Community name
  comments_count: number; // Number of comments
  comments_ids: [];
  followers_ids: [];
  views_count: number; // Number of views
  shares_count: number; // Number of shares
  upvotes_count: number; // Number of upvotes
  downvotes_count: number; // Number of downvotes
  oc_flag: boolean; // Original Content flag
  spoiler_flag: boolean; // Spoiler flag
  nsfw_flag: boolean; // Not Safe For Work flag
  locked_flag: boolean; // Locked flag
  allowreplies_flag: boolean; // If replies are allowed
  set_suggested_sort?:
    | 'None (Recommended)'
    | 'Best'
    | 'Old'
    | 'Top'
    | 'Q&A'
    | 'Live (Beta)'
    | 'Controversial'
    | 'New'; // Suggested sorting option
  scheduled_flag: boolean; // Scheduled post flag

  moderator_details: {
    approved_flag: boolean;
    approved_by?: string; // Reference to the User who approved
    approved_date?: Date; // Date of approval
    removed_flag: boolean; // Flag if removed
    removed_by?: string; // Reference to the User who removed
    removed_date?: Date; // Date of removal
    removed_removal_reason?: string; // Reason for removal
    spammed_flag: boolean; // Flag if spammed
    spammed_by?: string; // Reference to the User who spammed
    spammed_type?: string; // Type of spam
    spammed_removal_reason?: string; // Reason for spam removal
    reported_flag: boolean; // Flag if reported
    reported_by?: string; // Reference to the User who reported
    reported_type?: string; // Type of reporting
  };

  user_details: {
    total_views: number; // Total views for the user
    upvote_rate: number; // Upvote rate for the user
    total_shares: number; // Total shares by the user
  };

  is_reposted_flag: boolean; // If the post is reposted
  reposted?: { original_post_id: string }; // Reference to the original post
  vote: number;
  poll_vote: number;
};

// export type PostType = {
//   is_post: boolean;
//   id: string;
//   user_id: string;
//   username: string;
//   title: string;
//   description: string;
//   created_at: string;
//   edited_at: string;
//   deleted_at: string;
//   type: 'image_and_videos';
//   link_url: string;
//   images: {
//     path: string;
//     caption: string;
//     link: string;
//   }[];
//   videos: {
//     path: string;
//     caption: string;
//     link: string;
//   }[];
//   poll: {
//     options: string[];
//     votes: number[];
//   };
//   community_id: string;
//   community_name: string;
//   comments_count: number;
//   //added
//   communityAvatarSrc: string;
//   communityCoverSrc: string;
//   joined: boolean;
//   communityDescription: string;
//   communityMembers: number;
//   communityOnline: number;
//   //
//   views_count: number;
//   shares_count: number;
//   upvotes_count: number;
//   downvotes_count: number;
//   oc_flag: boolean;
//   spoiler_flag: boolean;
//   nsfw_flag: boolean;
//   locked_flag: boolean;
//   allowreplies_flag: boolean;
//   set_suggested_sort: 'None (Recommended)';
//   moderator_details: {
//     approved_by: string;
//     approved_date: string;
//     removed_by: string;
//     removed_date: string;
//     spammed_by: string;
//     spammed_type: string;
//   };
//   user_details: {
//     total_views: number;
//     upvote_rate: number;
//     total_shares: number;
//   };
// };

export type UserType = {
  id: string;
  created_at: string;
  username: string;
  email: string;
  verified_email_flag: string;
  gmail: string;
  facebook_email: string;
  display_name: string;
  about: string;
  social_links: {
    _id: string;
    username: string;
    display_text: string;
    type: string;
    custom_url: string;
  }[];
  profile_picture: string;
  banner_picture: string;
  country: string;
  gender: string;
  connected_google: boolean;
};
export type CommentType = {
  moderator_details: {
    approved_flag: boolean;
    approved_by: string;
    approved_date: string;
    removed_flag: boolean;
    removed_by: string;
    removed_date: string;
    removed_removal_reason: string;
    spammed_flag: boolean;
    spammed_by: string;
    spammed_type: string;
    spammed_removal_reason: string;
    reported_flag: boolean;
    reported_by: string;
    reported_type: string;
  };
  is_post: boolean;
  saved: boolean;
  is_reply: boolean;
  parent_username: string;
  _id: string;
  post_id: string;
  user_id: string;
  username: string;
  parent_id: string;
  replies_comments_ids: CommentType[];
  created_at: string;
  edited_at: string;
  deleted_at: string;
  deleted: boolean;
  description: string;
  comment_in_community_flag: boolean;
  community_id: string;
  community_name: string;
  upvotes_count: number;
  downvotes_count: number;
  spam_flag: boolean;
  locked_flag: boolean;
  spoiler_flag: boolean;
  show_comment_flag: boolean;
  __v: number;
};

// export type CommentType = {
//   moderator_details: {
//     approved_by: string;
//     approved_date: string;
//     removed_by: string;
//     removed_date: string;
//     spammed_by: string;
//     spammed_type: string;
//     removed_flag: false;
//     spammed_flag: false;
//   };
//   is_post: boolean;
//   votes_count: 0;
//   _id: string;
//   post_id: string;
//   user_id: string;
//   username: string;
//   parent_id: string;
//   replies_comments_ids: CommentType[];
//   created_at: string;
//   edited_at: string;
//   deleted_at: string;
//   approved: false;
//   deleted: false;
//   description: string;
//   upvotes_count: number;
//   //
//   saved: boolean;
//   hidden: boolean;
//   //
//   downvotes_count: number;
//   allowreplies_flag: boolean;
//   spam_flag: boolean;
//   locked_flag: boolean;
//   show_comment_flag: boolean;
//   __v: 0;
// };

export type AboutType = {
  _id: string;
  username: string;
  created_at: string;
  email: string;
  verified_email_flag: boolean;
  connected_google: boolean;
  display_name: string;
  about: string;
  social_links: {
    icon: string;
    username: string;
    displayName?: string;
  }[];
  profile_picture: string;
  banner_picture: string;
  gender: string;
};

export type SocialLink = {
  icon: string;
  username: string;
  displayName?: string; // Optional property
};

export type ModeratedCommunity = {
  id: string;
  name: string;
  profile_picture: string;
  favorite_flag: boolean;
  members_count: number;
  joined: boolean;
};

// export type CommentType = {
//   id: string;
//   post_id: string;
//   user_id: string;
//   username: string;
//   parent_id: string;
//   replies_comments_ids: CommentType[];
//   created_at: string;
//   edited_at: string;
//   deleted_at: string;
//   description: string;
//   upvotes_count: number;
//   //
//   saved: boolean;
//   hidden: boolean;
//   //
//   downvotes_count: number;
//   allowreplies_flag: boolean;
//   spam_flag: boolean;
//   locked_flag: boolean;
//   show_comment_flag: boolean;
//   moderator_details: {
//     approved_by: string;
//     approved_date: string;
//     removed_by: string;
//     removed_date: string;
//     spammed_by: string;
//     spammed_type: string;
//   };
// };

export type CommunityType = {
  description: string;
  welcome_message: string;
  type: string;
  nsfw_flag: boolean;
  members_count: number;
  profile_picture: string;
  banner_picture: string;
  created_at: string;
  joined_flag: boolean;
  title: string;
};
