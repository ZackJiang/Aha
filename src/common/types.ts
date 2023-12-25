export type Profile = {
  id: string;
  avatar: string;
  isFollowing: boolean;
  name: string;
  username: string;
};

export type ProfilesInfo = {
  totalPages: number;
  profiles: Profile[];
};

export type Tag = {
  id: string;
  name: string;
  count: number;
};
