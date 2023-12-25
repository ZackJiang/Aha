export type Profile = {
  id: number;
  avatar: string;
  isFollowing: boolean;
  name: string;
  username: string;
};

export type ProfilesInfo = {
  totalPages: number;
  profiles: Profile[];
};
