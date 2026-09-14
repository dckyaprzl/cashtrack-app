import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile,
} from 'firebase/auth';

import { auth } from './firebase';

export async function registerUser(email: string, password: string, username: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
    displayName: username,
  });
    return userCredential.user;
}

export async function loginUser(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

export async function signOut() {
    await firebaseSignOut(auth);
}