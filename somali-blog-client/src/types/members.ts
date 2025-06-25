export interface iUser {
  id: number;
  email: string;
  fullname: string;
  phone_number: string;
  profilePhoto: string;
  coverPhoto: string;
  created_at: Date;
  updated_at: Date;
}

export interface iListedMembersInterface {
  isSuccess: boolean;
  message: string;
  user: iUser[]; // ✅ It's an array now!
}

// get one member

export interface iFetchedOneMember {
  isSuccess: boolean;
  articles: Article[];
  user: User;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user: ArticleUser;
}

export interface ArticleUser {
  id: number;
  fullname: string;
  email: string;
  profilePhoto: string;
  coverPhoto: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  fullname: string;
  phone_number: string;
  profilePhoto: string;
  coverPhoto: string;
  created_at: Date;
  updated_at: Date;
  last_login: null;
}

// export interface User
