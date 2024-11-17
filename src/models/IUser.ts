export interface IUser {
  user_id?: number;
  tg_id: number;
  score: number;
  referrer_id?: number;
  energy: number;
  isSub: boolean;
  referrallArray: number[];
  created_at: string
}
