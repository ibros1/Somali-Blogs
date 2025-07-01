export interface iLoginResponse {
  isSuccess: boolean;
  user: User;
  token: string;
}

export interface User {
  id: number;
  email: string;
  fullname: string;
  phone_number: string;
  role: string;

  profilePhoto: string;
  coverPhoto: string;
  created_at: Date;
  updated_at: Date;
}

export interface iLoginBody {
  email: string;
  password: string;
}

// register

export interface iRegisterResponse {
  isSuccess: boolean;
  message: string;
  newUser: NewUser;
}

export interface NewUser {
  id: number;
  email: string;
  password: string;
  fullname: string;
  role: string;
  phone_number: string;
  profilePhoto: string;
  coverPhoto: string;
  created_at: Date;
  updated_at: Date;
  last_login: null;
}

export interface iRegisterBody {
  email: string;
  fullname: string;
  phone_number: string;
  profilePhoto: string;
  coverPhoto: string;
  password: string;
  confirmPassword: string;
}

// update user

export interface iUpdatedUserResponse {
  isSuccess: boolean;
  message: string;
  updatedUser: UpdatedUser;
}

export interface UpdatedUser {
  id: number;
  email: string;
  password: string;
  fullname: string;
  phone_number: string;
  created_at: Date;
  updated_at: Date;
  last_login: null;
  profilePhoto: string;
  coverPhoto: string;
}
export interface iUpdatedUserBody {
  id: number;
  email: string;
  fullname: string;
  phone_number: string;
  profilePhoto?: string;
  coverPhoto?: string;
  password: string;
}
