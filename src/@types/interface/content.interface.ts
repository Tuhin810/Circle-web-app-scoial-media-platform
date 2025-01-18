import { IUser } from "./user.interface";

export interface IContent {
  user_name: string;
  profile_image: string;
  _id: string;
  user_id: string;
  title: string | null;
  description: string;
  category: string | null;
  media_post?: string;
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  user: IUser;
  latestContent: {
    media_post: string;
    description: string;
    _id: string;
    likes: [];
  };
}
