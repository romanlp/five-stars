export interface User {
  uid: string;
  name: string;
  email: string;
  ratings: { [id: number]: number };
  watchlist: string[];
  photoUrl: string;
  provider: string;
}
