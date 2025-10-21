import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

// Get auth instance
const auth = firebase.auth();

// Types
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Sign up with email and password
export const signUp = async (
  email: string,
  password: string,
  displayName: string,
) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );

    // Update profile with display name
    await userCredential.user.updateProfile({
      displayName: displayName,
    });

    return userCredential.user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

// Sign out
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Subscribe to auth state changes
export const subscribeToAuthStateChanges = (
  callback: (user: AuthUser | null) => void,
) => {
  return auth.onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } else {
      callback(null);
    }
  });
};
