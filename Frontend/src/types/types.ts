export type PostType = {
  id: string;
  user_id: string;
  username: string;
  title: string;
  description: string;
  created_at: string;
  edited_at: string;
  deleted_at: string;
  type: 'image_and_videos';
  link_url: string;
  images: {
    path: string;
    caption: string;
    link: string;
  }[];
  videos: {
    path: string;
    caption: string;
    link: string;
  }[];
  poll: {
    options: string[];
    votes: number[];
  };
  community_id: string;
  'community-name': string;
  comments_count: number;
  //added
  communityAvatarSrc: string;
  communityCoverSrc: string;
  joined: boolean;
  communityDescription: string;
  communityMembers: number;
  communityOnline: number;
  //
  views_count: number;
  shares_count: number;
  upvotes_count: number;
  downvotes_count: number;
  oc_flag: boolean;
  spoiler_flag: boolean;
  nsfw_flag: boolean;
  locked_flag: boolean;
  allowreplies_flag: boolean;
  set_suggested_sort: 'None (Recommended)';
  moderator_details: {
    approved_by: string;
    approved_date: string;
    removed_by: string;
    removed_date: string;
    spammed_by: string;
    spammed_type: string;
  };
  user_details: {
    total_views: number;
    upvote_rate: number;
    total_shares: number;
  };
};

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
