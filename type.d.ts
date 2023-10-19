type AuthorType = {
  name: string;
  email: string;
  nation: string;
  quote: string;
};

type BookType = {
  title: string;
  genre: string;
  published_date: Date;
  author_id: number;
  description: string;
  quantity_available: number;
};

type RoleType = {
  role_name: string;
};

type SessionType = {
  session_token: string;
  user_id: number;
};

type UserType = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role_id?: number;
  suspended?: number;
  created_at?: Date;
  updated_at?: Date;
  salt?: string;
};
