import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import firebaseApp from './firebase-config';

const auth = getAuth(firebaseApp);

// Funcție pentru creare cont
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Eroare la crearea contului:', error.message);
    throw error;
  }
};

// Funcție pentru login
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Eroare la autentificare:', error.message);
    throw error;
  }
};

// Funcție pentru logout
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('Deconectare reușită');
  } catch (error) {
    console.error('Eroare la deconectare:', error.message);
    throw error;
  }
};

// Ascultă schimbările stării de autentificare
export const onAuthChange = callback => {
  onAuthStateChanged(auth, callback);
};
