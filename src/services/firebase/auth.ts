import {getApp} from '@react-native-firebase/app';
import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@react-native-firebase/auth';

// Initialize Firebase (getApp will use the default initialized instance)
let auth: FirebaseAuthTypes.Module;

try {
  auth = getAuth(getApp());
} catch (error) {
  // Firebase will be initialized by React Native Firebase automatically
  // This is a fallback for edge cases
}

// Types
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Get auth instance safely
const getAuthInstance = () => {
  try {
    return getAuth(getApp());
  } catch (error) {
    console.error('Error getting auth instance:', error);
    throw error;
  }
};

// Sign up with email and password
export const signUp = async (
  email: string,
  password: string,
  displayName: string,
) => {
  try {
    const authInstance = getAuthInstance();
    const userCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      password,
    );

    // Update profile with display name
    await updateProfile(userCredential.user, {
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
    const authInstance = getAuthInstance();
    const userCredential = await signInWithEmailAndPassword(
      authInstance,
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
    const authInstance = getAuthInstance();
    await signOut(authInstance);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Subscribe to auth state changes
export const subscribeToAuthStateChanges = (
  callback: (user: AuthUser | null) => void,
) => {
  const authInstance = getAuthInstance();
  return onAuthStateChanged(
    authInstance,
    (user: FirebaseAuthTypes.User | null) => {
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
    },
  );
};
