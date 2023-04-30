export type user = {
  email: string;
  name: string;
  password: string;
  secret: string;
  user: string;
  class?: number;
  section?: string;
  teacher?: object;
  avatar: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MONGO_URI: string;
      JWT_SECRET: string;
      JWT_EXPIRATION: number;
    }
  }
  namespace Express {
    export interface Request {
      user: any;
    }
  }
}

export {};
