export interface Session {
  username: string;
  avatar: string;
  token: string;
  followers: Follower[];
  following: Follower[];
}

export interface Follower {
  username: string;
  avatar?: string;
}
