import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Router from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import { createUser, dbRateMovie } from './firebase.db';
import { User } from "./interfaces/user.type";

interface AuthContext {
  user: User;
  loading: boolean;
  signinWithEmail: (email: string, password: string) => Promise<any>;
  signinWithGoogle: (redirect?: string) => Promise<any>;
  signout: () => Promise<any>;
  rateMovie: (id: string, ratings: number) => void;
}

const authContext = createContext<AuthContext>(undefined);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const auth = getAuth();
const db = getFirestore();

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);

      createUser(user.uid, user);
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  const signinWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then((response) => {
      handleUser(response.user);
      Router.push('/sites');
    });
  };

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
      handleUser(response.user);

      if (redirect) {
        Router.push(redirect);
      }
    });
  };

  const signout = () => {
    Router.push('/');

    return signOut(auth).then(() => handleUser(false));
  };

  const rateMovie = (id, rating) => {
    setUser(user => ({ ...user, ratings: { ...user.ratings, [id]: rating } }));
    dbRateMovie(user.uid, id, rating);
  }


  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    rateMovie,
    signinWithEmail,
    signinWithGoogle,
    signout
  };
}

const formatUser = async (user) => {
  const userData = await getDoc(doc(db, 'users', user.uid));

  const formattedUser: User = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    ratings: userData.data().ratings,
  };
  return formattedUser;
};
