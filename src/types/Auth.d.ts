import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ILogin {
  nik: string;
  password: string;
}

export interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

export interface JWTExtended extends JWT {
  user?: UserExtended;
}

export interface SessionExtended extends Session {
  accessToken?: string;
}
