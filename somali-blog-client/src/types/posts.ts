export interface iArticleResponse {
  isSuccess: boolean;
  message: string;
  newArticle: NewArticle;
}

export interface NewArticle {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}

export interface iCreatedArticlePayload {
  title: string;
  isPublished: boolean;
  content: string;
}

// GET ALL POSTS TYPES

export interface iGetArticlesResponse {
  isSuccess: boolean;
  articles: Article[];
}

export interface Article {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user: User;
}

export interface User {
  id: number;
  fullname: string;
  email: string;
  profilePhoto: string;
}

export interface iArticleDetailResponse {
  isSuccess: boolean;
  message: string;
  article: {
    id: number;
    title: string;
    content: string;
    is_published: boolean;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    user: {
      id: number;
      fullname: string;
      email: string;
      profilePhoto: string;
    };
  };
}

export interface iMyArticlesResponse {
  isSuccess: boolean;
  articles: Article[];
}

export interface Article {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  user: {
    id: number;
    fullname: string;
    email: string;
    profilePhoto: string;
  };
}
