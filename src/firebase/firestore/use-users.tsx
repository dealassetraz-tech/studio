
'use client';

import { useMemo } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useCollection, WithId } from './use-collection';
import { useFirestore, useMemoFirebase } from '../provider';

// Basic user structure, extend as needed
interface UserProfile {
  fullName: string;
  email: string;
  role: string;
  photoURL?: string;
}

/**
 * React hook to fetch multiple user documents from a list of user IDs.
 * It handles empty or null ID lists gracefully.
 *
 * @param {string[]} userIds - An array of user IDs to fetch.
 * @returns {UseCollectionResult<UserProfile>} Object with data, isLoading, error.
 */
export function useUsers(userIds: string[] | null | undefined) {
  const firestore = useFirestore();

  const usersQuery = useMemoFirebase(() => {
    // If no userIds are provided or the array is empty, return null to prevent a query.
    // Firestore's 'in' query requires a non-empty array.
    if (!firestore || !userIds || userIds.length === 0) {
      return null;
    }

    // Create a query to fetch documents from the 'users' collection
    // where the document ID is in the provided userIds array.
    return query(collection(firestore, 'users'), where('__name__', 'in', userIds));
  }, [firestore, userIds]);

  // Use the existing useCollection hook to fetch the data.
  const result = useCollection<UserProfile>(usersQuery);

  // If there are no user IDs, the query is null, and useCollection will return
  // `data: null`. To provide a more consistent return value, we'll return an empty array.
  return useMemo(() => {
    if (!userIds || userIds.length === 0) {
        return { data: [], isLoading: false, error: null };
    }
    return result;
  }, [userIds, result]);
}
