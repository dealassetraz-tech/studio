'use client';

import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase/config';
import type { User } from 'firebase/auth';

const db = getFirestore(app);

export async function createUserProfile(user: User) {
  if (!user) return;
  const userRef = doc(db, 'users', user.uid);
  return setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    createdAt: serverTimestamp(),
  }, { merge: true });
}
