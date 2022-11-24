import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

import firebaseApp from "./firebase";
import { Movie } from "./interfaces/movie.type";
import { User } from "./interfaces/user.type";

const db = getFirestore(firebaseApp);

export const createUser = (uid: string, data: User) => {
  return setDoc(doc(db, 'users', uid), { uid, ...data }, { merge: true });
};

export const getUser = (uid: string) => {
  return getDoc(doc(db, 'users', uid));
};


export const dbRateMovie = async (userId: string, id: string, rating: number) => {
  await setDoc(doc(db, 'users', userId), {
    ratings: {
      [id]: rating
    }
  }, { merge: true });
};

export const createMovie = async (id: string, movie: Movie) => {
  return await setDoc(doc(db, 'movies', id), movie);
}

export const getMovie = async (id: string) => {
  return await getDoc(doc(db, 'movies', id));
}
