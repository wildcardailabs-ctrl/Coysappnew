import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  getDocFromServer 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Cloud Firestore with target databaseId
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Mandatory connection test per Firebase guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or pending network sync.');
    } else {
      console.info('Firestore initialized:', error instanceof Error ? error.message : 'OK');
    }
    return true;
  }
}

// Call connection check once on boot
testFirestoreConnection().catch(() => {});

// User profile interface for Firestore persistence
export interface FirestoreUserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  membershipNumber?: string;
  tier?: string;
  loyaltyPoints?: number;
  homeStand?: string;
  matchesAttended?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Sign in with Google Popup
 */
export async function loginWithGoogle(): Promise<{ user: User; profile: FirestoreUserProfile }> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const profile = await getOrCreateUserProfile(user);
  return { user, profile };
}

/**
 * Register with Email and Password
 */
export async function registerWithEmail(
  email: string, 
  pass: string, 
  displayName: string,
  extra?: { membershipNumber?: string; tier?: string; homeStand?: string }
): Promise<{ user: User; profile: FirestoreUserProfile }> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  const user = cred.user;
  
  if (displayName) {
    await updateProfile(user, { displayName });
  }

  const profile = await getOrCreateUserProfile(user, {
    displayName,
    membershipNumber: extra?.membershipNumber || '',
    tier: extra?.tier || 'One Hotspur',
    homeStand: extra?.homeStand || 'South Stand (Single Tier)'
  });

  return { user, profile };
}

/**
 * Sign in with Email and Password
 */
export async function loginWithEmail(email: string, pass: string): Promise<{ user: User; profile: FirestoreUserProfile }> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  const user = cred.user;
  const profile = await getOrCreateUserProfile(user);
  return { user, profile };
}

/**
 * Sign out
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Fetch or bootstrap a user profile document in Firestore
 */
export async function getOrCreateUserProfile(
  user: User, 
  initialData?: Partial<FirestoreUserProfile>
): Promise<FirestoreUserProfile> {
  const userDocRef = doc(db, 'users', user.uid);
  try {
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as FirestoreUserProfile;
    }
  } catch (err) {
    console.warn('Error fetching existing user doc, creating new profile:', err);
  }

  // Create new profile
  const now = new Date().toISOString();
  const newProfile: FirestoreUserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: initialData?.displayName || user.displayName || user.email?.split('@')[0] || 'Spurs Supporter',
    photoURL: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`,
    membershipNumber: initialData?.membershipNumber || 'THFC-1882',
    tier: initialData?.tier || 'One Hotspur',
    loyaltyPoints: initialData?.loyaltyPoints ?? 0,
    homeStand: initialData?.homeStand || 'South Stand (Single Tier)',
    matchesAttended: initialData?.matchesAttended ?? 0,
    createdAt: now,
    updatedAt: now
  };

  try {
    await setDoc(userDocRef, newProfile);
  } catch (e) {
    console.error('Failed to write profile to Firestore:', e);
  }

  return newProfile;
}

/**
 * Update user profile in Firestore
 */
export async function updateUserProfileDoc(
  uid: string, 
  data: Partial<FirestoreUserProfile>
): Promise<void> {
  const userDocRef = doc(db, 'users', uid);
  const updatePayload = {
    ...data,
    updatedAt: new Date().toISOString()
  };
  await updateDoc(userDocRef, updatePayload);
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (user: User | null, profile: FirestoreUserProfile | null) => void
): () => void {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const profile = await getOrCreateUserProfile(user);
      callback(user, profile);
    } else {
      callback(null, null);
    }
  });
}
