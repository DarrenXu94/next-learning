export interface Profile {
  profileUsername: string;
  profileAvatar: string;
  isFollowing: boolean;
  counts: Counts;
}

export interface Counts {
  postCount: number;
  followerCount: number;
  followingCount: number;
}
