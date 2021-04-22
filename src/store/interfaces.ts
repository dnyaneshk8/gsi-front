export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface GlobalState {
  loggedIn: boolean;
  loggedInUser: User | null;
}

export interface IResponse {
  error: Boolean;
  message: string;
  data?: any;
}

export interface ILog {
  log: string;
  game: string;
  user: string;
}

export interface IGame {
  player: string;
  logs: ILog[];
  playerHealth: number;
  dragonHealth: number;
  status: boolean;
  wonBy: "Dragon" | "Player";
}
