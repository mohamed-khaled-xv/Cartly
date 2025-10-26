# 🔥 Complete Firebase Authentication Workflow Guide - Cartly App

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Core Firebase Methods](#core-firebase-methods)
4. [Complete User Flows](#complete-user-flows)
5. [Code Deep Dive](#code-deep-dive)
6. [Security & Persistence](#security--persistence)
7. [Error Handling](#error-handling)
8. [Testing Guide](#testing-guide)

---

## Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CARTLY APP LAYERS                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  UI LAYER (React Native Screens)                     │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  - Signup.tsx (Form inputs for user registration)    │  │
│  │  - Login.tsx (Email/password authentication)         │  │
│  │  - Profile.tsx (Display user, logout button)         │  │
│  └────────────────────────┬─────────────────────────────┘  │
│                           │                                 │
│  ┌────────────────────────▼─────────────────────────────┐  │
│  │  ROUTING LAYER (Navigation)                          │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  - RootNavigator.tsx (Auth state → routing logic)    │  │
│  │  - AuthStack (Login, Signup, ForgotPassword screens) │  │
│  │  - MainTabs (Home, Cart, Profile screens)            │  │
│  └────────────────────────┬─────────────────────────────┘  │
│                           │                                 │
│  ┌────────────────────────▼─────────────────────────────┐  │
│  │  SERVICE LAYER (Firebase Business Logic)             │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  - auth.ts (signUp, signIn, logout, subscribe)       │  │
│  │  - firebase.ts (Firebase initialization)             │  │
│  └────────────────────────┬─────────────────────────────┘  │
│                           │                                 │
│  ┌────────────────────────▼─────────────────────────────┐  │
│  │  FIREBASE LAYER (@react-native-firebase)             │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  - auth.createUserWithEmailAndPassword()             │  │
│  │  - auth.signInWithEmailAndPassword()                 │  │
│  │  - auth.signOut()                                    │  │
│  │  - auth.onAuthStateChanged() (listener)              │  │
│  └────────────────────────┬─────────────────────────────┘  │
│                           │                                 │
│  ┌────────────────────────▼─────────────────────────────┐  │
│  │  STORAGE LAYER (Persistence)                         │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  Local:  AsyncStorage (device storage)               │  │
│  │  Remote: Firebase Cloud (session management)          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
📁 src/
├── 📁 services/
│   └── 📁 firebase/
│       ├── 📄 firebase.ts          ← Firebase initialization
│       └── 📄 auth.ts              ← Authentication methods
│
├── 📁 screens/
│   ├── 📁 Signup/
│   │   └── 📄 Signup.tsx           ← User registration UI
│   ├── 📁 Login/
│   │   └── 📄 Login.tsx            ← User login UI
│   └── 📁 Profile/
│       └── 📄 Profile.tsx          ← User profile & logout
│
├── 📁 navigation/
│   ├── 📄 RootNavigator.tsx        ← Auth-based routing
│   ├── 📄 AuthStack.tsx            ← Auth screens
│   └── 📄 MainTabs.tsx             ← App screens
│
└── 📄 App.tsx                       ← Main app entry point
```

---

## Core Firebase Methods

### 1. **firebase.ts** - Initialization

```typescript
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

// Purpose: Initialize Firebase with app credentials
// Firebase reads google-services.json automatically
// No manual config needed!

const auth = firebase.auth();
// ↑ Gets the auth instance from Firebase app

export default app;
```

**What Happens:**

- Firebase SDK initializes on app startup
- Reads `google-services.json` (Android configuration)
- Sets up Firebase services
- Prepares auth module
- AsyncStorage persistence automatically enabled

---

### 2. **auth.ts** - Authentication Functions

#### **A. Sign Up Method**

```typescript
export const signUp = async (
  email: string,
  password: string,
  displayName: string,
) => {
  try {
    // Step 1: Create user account with email & password
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );
    // Returns: UserCredential object with user info

    // Step 2: Update user profile with display name
    await userCredential.user.updateProfile({
      displayName: displayName,
    });
    // Firebase stores: displayName in user profile

    // Step 3: Return user object
    return userCredential.user;
    // Used by: Signup screen to confirm success
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
    // Caught by: Signup.tsx try/catch block
  }
};
```

**Process Flow:**

```
User inputs (email, password, name)
    ↓
Call: signUp(email, password, displayName)
    ↓
Firebase: Create user account
    - Generate unique UID
    - Hash password securely
    - Store in Firebase database
    ↓
Firebase: Update profile
    - Add displayName to user object
    ↓
Firebase: Automatic persistence
    - Token saved to AsyncStorage
    - Session created on cloud
    ↓
Return: User object
    - uid, email, displayName
    ↓
Success: Navigate to MainTabs (home)
```

**Error Handling:**

```typescript
// Possible errors:
- 'auth/email-already-in-use'     → Email registered
- 'auth/weak-password'             → Password < 6 chars
- 'auth/invalid-email'             → Invalid format
- 'auth/operation-not-allowed'     → Firebase disabled
```

---

#### **B. Sign In Method**

```typescript
export const signIn = async (email: string, password: string) => {
  try {
    // Step 1: Authenticate user with email & password
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password,
    );
    // Firebase verifies credentials against stored account

    // Step 2: Return user object
    return userCredential.user;
    // Contains: uid, email, displayName, etc.
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};
```

**Process Flow:**

```
User inputs (email, password)
    ↓
Call: signIn(email, password)
    ↓
Firebase: Verify credentials
    - Look up email in database
    - Compare password hash
    - Match? → Continue : Throw error
    ↓
Firebase: Create session
    - Generate auth token
    - Set refresh token
    ↓
Firebase: Automatic persistence
    - Token saved to AsyncStorage
    - Session created on cloud
    ↓
Return: User object
    ↓
Success: Navigate to MainTabs (home)
```

**Error Handling:**

```typescript
// Possible errors:
- 'auth/user-not-found'    → No account with email
- 'auth/wrong-password'    → Incorrect password
- 'auth/invalid-email'     → Invalid email format
- 'auth/user-disabled'     → Account disabled
```

---

#### **C. Logout Method**

```typescript
export const logout = async () => {
  try {
    // Step 1: Sign out user from Firebase
    await auth.signOut();
    // Firebase simultaneously:
    // 1. Invalidates session on cloud
    // 2. Revokes auth token
    // 3. Clears AsyncStorage
    // 4. Triggers onAuthStateChanged listeners
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};
```

**Process Flow:**

```
User clicks logout button
    ↓
Call: logout()
    ↓
Firebase: Invalidate session
    - Mark token as invalid
    - Revoke refresh token
    - Remove session from cloud
    ↓
Firebase: Clear local storage
    - Delete token from AsyncStorage
    - Clear auth cache
    ↓
Firebase: Update auth state
    - Set currentUser = null
    - Trigger onAuthStateChanged()
    ↓
Subscribe listeners notified
    ↓
RootNavigator detects user = null
    ↓
App shows AuthStack (login screen)
```

---

#### **D. Subscribe to Auth Changes**

```typescript
export const subscribeToAuthStateChanges = (
  callback: (user: AuthUser | null) => void,
) => {
  // Purpose: Listen to Firebase auth state changes
  // Called when: user logs in, logs out, or app restarts

  return auth.onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
    // This callback fires whenever auth state changes

    if (user) {
      // User is logged in
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      // Converted to AuthUser interface
    } else {
      // User is logged out
      callback(null);
    }
  });
  // Returns unsubscribe function to cleanup listener
};
```

**When This Gets Called:**

```
1. App startup
   - Checks AsyncStorage for saved token
   - If valid → callback(user)
   - If invalid → callback(null)

2. After signup
   - User created
   - callback(user) with new user data

3. After login
   - User authenticated
   - callback(user) with user data

4. After logout
   - Session cleared
   - callback(null)

5. If token expires
   - Session invalid
   - callback(null)
```

---

## Complete User Flows

### **Flow 1: New User Signup**

```
┌─────────────────────────────────────────────────────────────┐
│  NEW USER SIGNUP FLOW                                       │
├─────────────────────────────────────────────────────────────┤

STEP 1: User Opens App
├─ App.tsx loads
├─ RootNavigator initializes
├─ subscribeToAuthStateChanges() activated
├─ Firebase checks AsyncStorage (empty for new user)
├─ callback(null) triggered
└─ AuthStack shown (Welcome, Login, Signup screens)

STEP 2: User Navigates to Signup
├─ Taps "Create Account" button
├─ Signup.tsx component loads
├─ Shows form: Full Name, Email, Password, Confirm Password
└─ User fills form and submits

STEP 3: Form Validation (Client-side)
├─ Name: Min 2 characters ✓
├─ Email: Valid format (regex check) ✓
├─ Password: Min 6 characters ✓
├─ Confirm: Matches password field ✓
├─ All valid → Proceed
└─ Invalid → Show Alert, retry

STEP 4: Firebase Signup
├─ Call: signUp(email, password, displayName)
├─ Firebase Backend:
│  ├─ Check if email already exists (Firebase DB lookup)
│  ├─ Email doesn't exist → Generate new UID
│  ├─ Hash password securely
│  ├─ Store user record: {uid, email, hashed_password}
│  ├─ Create user profile: {displayName}
│  ├─ Generate auth token (JWT)
│  ├─ Save token to AsyncStorage (device)
│  ├─ Create session in Firebase cloud
│  └─ Trigger onAuthStateChanged()
├─ Return: UserCredential with user object
└─ Success: Alert shown to user

STEP 5: Navigation After Signup
├─ Signup.tsx receives user object
├─ Alert: "Account created successfully!"
├─ User taps OK
├─ RootNavigator subscription receives user data
├─ Detects: isAuthenticated = true
├─ Switches from AuthStack → MainTabs
└─ User sees Home screen

STEP 6: Session Persistence Enabled
├─ Token stored in AsyncStorage (device)
├─ Session active in Firebase (cloud)
├─ User can make authenticated API calls
├─ Cart data can be saved
├─ User info can be fetched
└─ Session valid until logout or expiry

└─────────────────────────────────────────────────────────────┘
```

**Code Execution:**

```typescript
// Signup.tsx - User action
const submitForm = async () => {
  setLoading(true);
  try {
    // ↓ Calls auth.ts
    await signUp(email.trim(), password, name.trim());
    // ↓ Firebase completes signup
    // ↓ onAuthStateChanged triggered
    // ↓ RootNavigator sees user logged in
    // ↓ Navigation to MainTabs happens
    Alert.alert('Success', 'Account created!');
  } catch (error: any) {
    // Handle Firebase errors
    Alert.alert('Error', error.message);
  } finally {
    setLoading(false);
  }
};
```

---

### **Flow 2: Existing User Login**

```
┌─────────────────────────────────────────────────────────────┐
│  EXISTING USER LOGIN FLOW                                   │
├─────────────────────────────────────────────────────────────┤

STEP 1: User Opens App (Already Has Account)
├─ App.tsx loads
├─ RootNavigator initializes
├─ subscribeToAuthStateChanges() activated
├─ Firebase checks AsyncStorage (previous session maybe?)
├─ If valid token exists → callback(user) - auto login ✓
├─ If no token or expired → callback(null)
└─ AuthStack shown (if not already logged in)

STEP 2: User on Login Screen
├─ Taps "Login" button in AuthStack
├─ Login.tsx component loads
├─ Shows form: Email, Password
└─ User fills form and submits

STEP 3: Form Validation (Client-side)
├─ Email: Valid format ✓
├─ Password: Not empty ✓
├─ Valid → Proceed
└─ Invalid → Show Alert

STEP 4: Firebase Login
├─ Call: signIn(email, password)
├─ Firebase Backend:
│  ├─ Look up user by email in database
│  ├─ Email found → Continue
│  ├─ Email not found → Throw error
│  ├─ Compare provided password hash with stored hash
│  ├─ Password matches → Continue
│  ├─ Password incorrect → Throw error
│  ├─ Generate new auth token (JWT)
│  ├─ Save token to AsyncStorage (device)
│  ├─ Create session in Firebase cloud
│  └─ Trigger onAuthStateChanged()
├─ Return: UserCredential with user object
└─ Success: User authenticated

STEP 5: Navigation After Login
├─ Login.tsx receives user object
├─ RootNavigator subscription receives user data
├─ Detects: isAuthenticated = true
├─ Switches from AuthStack → MainTabs
└─ User sees Home screen

STEP 6: Session Active
├─ Token valid on device
├─ Session valid in Firebase
├─ User can access all features
└─ Session persists across app restarts (until logout)

└─────────────────────────────────────────────────────────────┘
```

**Code Execution:**

```typescript
// Login.tsx - User action
const handleLogin = async () => {
  setLoading(true);
  try {
    // ↓ Calls auth.ts
    await signIn(email.trim(), password);
    // ↓ Firebase completes login
    // ↓ onAuthStateChanged triggered
    // ↓ RootNavigator sees user logged in
    // ↓ Navigation to MainTabs happens
  } catch (error: any) {
    Alert.alert('Login Error', error.message);
  } finally {
    setLoading(false);
  }
};
```

---

### **Flow 3: User Logout**

```
┌─────────────────────────────────────────────────────────────┐
│  LOGOUT FLOW                                                │
├─────────────────────────────────────────────────────────────┤

STEP 1: User on Profile Screen
├─ User taps "Log Out" button
├─ Alert shown: "Are you sure?"
└─ User confirms logout

STEP 2: Firebase Logout
├─ Call: logout()
├─ Firebase Backend:
│  ├─ Invalidate auth token
│  ├─ Revoke refresh token
│  ├─ Remove session from cloud
│  ├─ Clear AsyncStorage on device
│  ├─ Set currentUser = null
│  └─ Trigger onAuthStateChanged()
├─ Return: Success
└─ All Firebase listeners receive callback(null)

STEP 3: Navigation After Logout
├─ RootNavigator subscription triggered
├─ Detects: isAuthenticated = false
├─ Switches from MainTabs → AuthStack
├─ User sees Login screen
└─ Profile component unmounts

STEP 4: Session Cleared
├─ Token deleted from device storage
├─ Session deleted from Firebase cloud
├─ User cannot use old token
├─ Must login again to access app
└─ All user data on device cleared (secure)

└─────────────────────────────────────────────────────────────┘
```

**Code Execution:**

```typescript
// Profile.tsx - User action
const handleLogout = async () => {
  Alert.alert('Logout', 'Are you sure?', [
    {text: 'Cancel'},
    {
      text: 'Logout',
      onPress: async () => {
        setLoading(true);
        try {
          // ↓ Calls auth.ts
          await logout();
          // ↓ Firebase clears session and token
          // ↓ onAuthStateChanged triggered
          // ↓ RootNavigator sees user = null
          // ↓ Navigation to AuthStack happens
        } catch (error) {
          Alert.alert('Error', 'Logout failed');
        } finally {
          setLoading(false);
        }
      },
    },
  ]);
};
```

---

### **Flow 4: App Restart (Session Persistence)**

```
┌─────────────────────────────────────────────────────────────┐
│  APP RESTART WITH EXISTING SESSION                          │
├─────────────────────────────────────────────────────────────┤

SCENARIO A: User Logged In, Closes App, Reopens

STEP 1: App Closes
├─ User force-closes app
├─ AsyncStorage still has token (persistent storage)
├─ Firebase cloud session still active
└─ No data lost

STEP 2: App Restarts
├─ App.tsx loads
├─ RootNavigator initializes
├─ Firebase SDK initializes
├─ subscribeToAuthStateChanges() activated
├─ Firebase checks AsyncStorage
│  └─ Token found! ✓
├─ Firebase validates token with cloud servers
│  └─ Token valid! ✓
├─ Callback receives user object
└─ User data populated: {uid, email, displayName}

STEP 3: Navigation
├─ RootNavigator detects: isAuthenticated = true
├─ Switches from AuthStack → MainTabs
├─ User sees Home screen
├─ No login required! ✓
└─ Session automatically restored

RESULT: User stays logged in after app restart ✓

───────────────────────────────────────────────────────────────

SCENARIO B: User Logged Out, Closes App, Reopens

STEP 1: App Closes (After Logout)
├─ AsyncStorage is empty (cleared during logout)
├─ Firebase cloud session deleted (cleared during logout)
└─ No session data remains

STEP 2: App Restarts
├─ App.tsx loads
├─ RootNavigator initializes
├─ Firebase SDK initializes
├─ subscribeToAuthStateChanges() activated
├─ Firebase checks AsyncStorage
│  └─ Token not found
├─ Callback receives: null
└─ No user object

STEP 3: Navigation
├─ RootNavigator detects: isAuthenticated = false
├─ Switches to AuthStack
├─ User sees Login screen
├─ Must enter credentials again
└─ Session not restored (expected behavior)

RESULT: User must login again after logout ✓

└─────────────────────────────────────────────────────────────┘
```

---

## Code Deep Dive

### **RootNavigator.tsx - Auth-Based Routing**

```typescript
import {useEffect, useState} from 'react';
import {subscribeToAuthStateChanges, AuthUser} from '../services/firebase/auth';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

const RootNavigator = () => {
  // State Management
  const [user, setUser] = useState<AuthUser | null>(null);
  // Purpose: Store current logged-in user
  // Updated when: Auth state changes

  const [loading, setLoading] = useState(true);
  // Purpose: Show loading spinner while checking auth
  // Updated when: Firebase finishes checking AsyncStorage

  useEffect(() => {
    // Purpose: Subscribe to auth state changes on component mount
    // Called once when app starts

    const unsubscribe = subscribeToAuthStateChanges(authUser => {
      // Callback fired when:
      // 1. App starts (checks AsyncStorage)
      // 2. User signs up
      // 3. User logs in
      // 4. User logs out
      // 5. Token expires

      setUser(authUser);
      // Update state with user data or null

      setLoading(false);
      // Hide loading spinner
    });

    // Cleanup function
    return () => unsubscribe();
    // Unsubscribe from auth listener when component unmounts
    // Prevents memory leaks
  }, []);
  // Empty dependency array = run only once on mount

  // Loading State
  if (loading) {
    return <ActivityIndicator />;
    // Show spinner while checking if user is logged in
  }

  // Auth Check
  const isAuthenticated = !!user;
  // Convert user object to boolean
  // user = {uid, email, ...} → true
  // user = null → false

  // Routing Decision
  if (isAuthenticated) {
    return (
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    );
    // Logged in: Show home, cart, profile screens
  } else {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
    // Not logged in: Show login, signup screens
  }
};

export default RootNavigator;
```

**Step-by-Step Execution:**

```
1. App starts
   └─ RootNavigator mounts
      └─ useEffect runs

2. useEffect runs subscribeToAuthStateChanges()
   └─ Firebase checks AsyncStorage for token

3a. Token found and valid:
    └─ callback(user) called
       ├─ setUser(user) → user = {uid, email, ...}
       ├─ setLoading(false) → loading = false
       └─ RootNavigator re-renders

3b. Token not found or invalid:
    └─ callback(null) called
       ├─ setUser(null) → user = null
       ├─ setLoading(false) → loading = false
       └─ RootNavigator re-renders

4. Re-render with new state
   ├─ loading = false → Skip spinner
   ├─ isAuthenticated = !!user → true/false
   ├─ If true → Render MainTabs ✓
   └─ If false → Render AuthStack ✓

5. User now sees correct screen
   ├─ Logged in users → Home screen
   └─ Logged out users → Login screen
```

---

### **Signup.tsx - Registration Flow**

```typescript
import {signUp} from '../../services/firebase/auth';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Validate Form
  const validateForm = (): boolean => {
    // Check name
    if (!name.trim() || name.length < 2) {
      Alert.alert('Error', 'Name must be 2+ characters');
      return false;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email format');
      return false;
    }

    // Check password length
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be 6+ characters');
      return false;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true; // All valid
  };

  // Step 2: Submit Form
  const submitForm = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setLoading(true);
    try {
      // Call Firebase signup
      const result = await signUp(email.trim(), password, name.trim());

      // Firebase handles:
      // - User creation
      // - Password hashing
      // - Profile update
      // - Token generation
      // - AsyncStorage persistence
      // - onAuthStateChanged trigger

      Alert.alert('Success', 'Account created!');
      // User will see home screen automatically
      // because RootNavigator subscription fires
    } catch (error: any) {
      // Handle Firebase errors
      let message = 'Signup failed';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already registered';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password too weak';
      }

      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        editable={!loading}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        editable={!loading}
      />
      <TouchableOpacity onPress={submitForm} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text>Create Account</Text>}
      </TouchableOpacity>
    </View>
  );
};
```

---

### **Profile.tsx - User Display & Logout**

```typescript
import {useEffect, useState} from 'react';
import {
  subscribeToAuthStateChanges,
  logout,
  AuthUser,
} from '../../services/firebase/auth';

const Profile = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  // Subscribe to user changes
  useEffect(() => {
    // Get current user on component mount
    const unsubscribe = subscribeToAuthStateChanges(authUser => {
      setUser(authUser);
      // Updates when: user logs in, logs out, profile changes
    });

    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            await logout();
            // Firebase:
            // - Invalidates session
            // - Clears token from AsyncStorage
            // - Triggers onAuthStateChanged(null)
            // - RootNavigator sees user = null
            // - Navigation to AuthStack happens
          } catch (error) {
            Alert.alert('Error', 'Logout failed');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View>
      <Text>👤 {user?.displayName || 'User'}</Text>
      <Text>{user?.email}</Text>
      <TouchableOpacity onPress={handleLogout} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text>Log Out</Text>}
      </TouchableOpacity>
    </View>
  );
};
```

---

## Security & Persistence

### **How Persistence Works**

```
Persistence Flow:
├─ User logs in
├─ Firebase creates auth token (JWT)
├─ React Native Firebase catches token
├─ Saves to AsyncStorage (device local storage)
├─ Session created on Firebase cloud
├─ App close/restart
├─ Firebase checks AsyncStorage on init
├─ Token found and validated
├─ User automatically logged in
└─ No manual code needed!

Logout Clears Everything:
├─ logout() called
├─ Firebase.signOut()
├─ Session invalidated on cloud
├─ AsyncStorage cleared
├─ Token deleted from device
├─ Next app start: No token found
├─ User sees login screen
└─ Complete cleanup ✓
```

### **Security Measures**

```
Password Security:
├─ Never sent in plain text
├─ Hashed on Firebase servers
├─ Never stored locally
└─ Only token stored on device ✓

Token Security:
├─ JWT (JSON Web Token)
├─ Cryptographically signed
├─ Expires after inactivity
├─ Can be revoked
└─ Only sent over HTTPS ✓

Local Storage Security:
├─ AsyncStorage on Android/iOS
├─ Encrypted by default
├─ Device-specific
├─ Cleared on logout
└─ Not accessible to other apps ✓

Cloud Session Security:
├─ Server-side validation
├─ Token revocation on logout
├─ Automatic expiration
├─ No offline access
└─ Prevents token reuse ✓
```

---

## Error Handling

### **Firebase Error Codes**

```typescript
// Signup Errors
'auth/email-already-in-use'      → Email registered
'auth/weak-password'             → Password < 6 chars
'auth/invalid-email'             → Email format invalid
'auth/operation-not-allowed'     → Auth disabled

// Login Errors
'auth/user-not-found'            → No account
'auth/wrong-password'            → Password incorrect
'auth/invalid-email'             → Email invalid
'auth/user-disabled'             → Account disabled

// General Errors
'auth/network-request-failed'    → No internet
'auth/too-many-requests'         → Rate limited
'auth/internal-error'            → Firebase error
```

### **Error Handling Example**

```typescript
try {
  await signUp(email, password, displayName);
} catch (error: any) {
  let userMessage = 'Signup failed';

  // Map Firebase codes to user-friendly messages
  if (error.code === 'auth/email-already-in-use') {
    userMessage = 'This email is already registered';
  } else if (error.code === 'auth/weak-password') {
    userMessage = 'Password must be at least 6 characters';
  } else if (error.code === 'auth/invalid-email') {
    userMessage = 'Please enter a valid email';
  } else if (error.code === 'auth/network-request-failed') {
    userMessage = 'No internet connection';
  }

  Alert.alert('Error', userMessage);
  console.error('Firebase error:', error);
}
```

---

## Testing Guide

### **Test Case 1: New User Signup**

```
Steps:
1. Open app → See login screen ✓
2. Tap "Create Account"
3. Fill form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "Password123"
   - Confirm: "Password123"
4. Tap "Create Account"

Expected Results:
- No errors → Success alert
- Alert closes → Home screen appears
- asyncstorage has token
- Firebase has session
- Can access features

Verify Persistence:
- Force close app
- Reopen app
- Should see home screen (not login)
- Still logged in ✓
```

### **Test Case 2: Existing User Login**

```
Steps:
1. Close app completely (after logout)
2. Reopen app → See login screen
3. Enter previously created account:
   - Email: "john@example.com"
   - Password: "Password123"
4. Tap "Login"

Expected Results:
- No errors → Home screen appears
- AsyncStorage updated with token
- Firebase session created
- Can access features

Verify Persistence:
- Force close app
- Reopen app
- Should see home screen (not login)
- Still logged in ✓
```

### **Test Case 3: Logout**

```
Steps:
1. Ensure logged in
2. Go to Profile screen
3. Tap "Log Out"
4. Confirm logout

Expected Results:
- Logout completes
- Returned to login screen
- AsyncStorage cleared
- Firebase session deleted

Verify Logout:
- Force close app
- Reopen app
- Should see login screen (not home)
- Must login again ✓
```

### **Test Case 4: Invalid Credentials**

```
Steps:
1. On login screen
2. Enter:
   - Email: "nonexistent@example.com"
   - Password: "anything"
3. Tap "Login"

Expected Results:
- Error message: "No account with this email"
- Remain on login screen
- Can retry ✓

Repeat with:
- Correct email, wrong password
- Expected: "Incorrect password"
- Invalid email format
- Expected: "Invalid email"
```

### **Test Case 5: Weak Password**

```
Steps:
1. On signup screen
2. Fill form with:
   - Password: "1234" (only 4 chars)
3. Tap "Create Account"

Expected Results:
- Validation error: "Password must be 6+ characters"
- Cannot proceed
- User corrects and retries ✓
```

---

## Summary Table

| Component             | Purpose             | Methods Used                      | When Called                  |
| --------------------- | ------------------- | --------------------------------- | ---------------------------- |
| **firebase.ts**       | Initialize Firebase | -                                 | App startup                  |
| **auth.ts**           | Auth operations     | signUp, signIn, logout, subscribe | User actions                 |
| **RootNavigator.tsx** | Route based on auth | subscribe                         | App startup + auth changes   |
| **Signup.tsx**        | User registration   | signUp                            | User clicks "Create Account" |
| **Login.tsx**         | User authentication | signIn                            | User clicks "Login"          |
| **Profile.tsx**       | Show user, logout   | logout, subscribe                 | User views profile           |

---

## Architecture Flow Chart

```
USER ACTIONS:
├─ Open App
│  └─ RootNavigator.subscribe()
│     ├─ Check AsyncStorage
│     ├─ If token valid → Show MainTabs
│     └─ If no token → Show AuthStack
│
├─ Sign Up
│  └─ Signup.tsx → signUp()
│     ├─ Create account
│     ├─ Save token
│     └─ Navigate to MainTabs
│
├─ Login
│  └─ Login.tsx → signIn()
│     ├─ Authenticate
│     ├─ Save token
│     └─ Navigate to MainTabs
│
├─ Use App
│  └─ Authenticated requests
│     └─ Token auto-included
│
└─ Logout
   └─ Profile.tsx → logout()
      ├─ Clear token
      ├─ Clear session
      └─ Navigate to AuthStack
```

---

## Key Takeaways

✅ **Automatic Persistence** - Firebase + AsyncStorage handle session storage
✅ **Simple Implementation** - Only 4 methods needed (signup, signin, logout, subscribe)
✅ **Secure** - Passwords never stored locally, only tokens
✅ **Scalable** - Can add Firestore for user profiles/data later
✅ **Error Handling** - Firebase codes mapped to user-friendly messages
✅ **Clean Architecture** - Service layer separates Firebase from UI
✅ **Navigation Integration** - RootNavigator automatically switches based on auth state

Your Firebase authentication is production-ready! 🚀
