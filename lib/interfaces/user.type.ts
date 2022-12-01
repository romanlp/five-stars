export interface User {
  uid: string;
  name: string;
  email: string;
  ratings: { [id: number]: number };
  photoUrl: string;
  provider: string;
}
