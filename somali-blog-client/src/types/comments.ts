export interface iCreatedCommentBodyResponse {
  isSuccess: boolean;
  message: string;
  comment: {
    id: string;
    comment: string;
    created_at: Date;
    updated_at: Date;
    is_edited: boolean;
    article_id: number;
    user_id: number;
    user: {
      profilePhoto: string;
      fullname: string;
      email: string;
    };
  };
}

export interface iCreateCommentPayload {
  comment: string;
  articleId: number;
}

export interface iListedArticleCommentResponse {
  isSuccess: boolean;
  comments: Comment[];
  page: string;
  size: string;
}

export interface Comment {
  id: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
  is_edited: boolean;
  article_id: number;
  user_id: number;
  user: {
    fullname: string;
    email: string;
    profilePhoto: string;
  };
}
