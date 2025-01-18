export interface IUser {
  _id: string;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  is_adult: boolean;
  user_name: string;
  age_certificate_url: string;
  signature_url: string;
  bio: string;
  category_of_interest: string;
  role: string;
  profile_image: string;
  cover_image: string;
  isFollowing: boolean;
  followers?: string[] | undefined;
  following?: string[] | undefined;
}
