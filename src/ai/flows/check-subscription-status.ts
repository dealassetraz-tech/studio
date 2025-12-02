
'use server';

/**
 * @fileOverview A Genkit flow for checking a user's subscription status.
 *
 * - checkSubscriptionStatus - The main function to call for the check.
 * - CheckSubscriptionStatusInput - The input type for the flow.
 * - CheckSubscriptionStatusOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import {initializeApp, getApps, cert} from 'firebase-admin/app';

// Input Schema
const CheckSubscriptionStatusInputSchema = z.object({
  userId: z.string().describe("The user's unique ID."),
});
export type CheckSubscriptionStatusInput = z.infer<typeof CheckSubscriptionStatusInputSchema>;

// Output Schema
const CheckSubscriptionStatusOutputSchema = z.object({
  status: z.enum([
    'NEW_USER',
    'NOT_SUBSCRIBED',
    'ACTIVE_SUBSCRIPTION',
    'EXPIRED_SUBSCRIPTION',
  ]),
  message: z.string(),
});
export type CheckSubscriptionStatusOutput = z.infer<typeof CheckSubscriptionStatusOutputSchema>;


// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
    initializeApp({
        credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG!))
    });
}
const db = getFirestore();


/**
 * A wrapper function that invokes the subscription status check flow.
 * @param input The user ID to check.
 * @returns A promise that resolves to the subscription status.
 */
export async function checkSubscriptionStatus(input: CheckSubscriptionStatusInput): Promise<CheckSubscriptionStatusOutput> {
  return checkSubscriptionStatusFlow(input);
}


// The Genkit flow that defines the subscription logic.
const checkSubscriptionStatusFlow = ai.defineFlow(
  {
    name: 'checkSubscriptionStatusFlow',
    inputSchema: CheckSubscriptionStatusInputSchema,
    outputSchema: CheckSubscriptionStatusOutputSchema,
  },
  async ({ userId }) => {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // This case should ideally not be hit if the user is authenticated,
      // but is included for robustness.
      throw new Error("User document not found.");
    }
    
    const userData = userDoc.data();

    // State 1: NEW_USER
    if (userData?.isSubscribed === undefined) {
      await userRef.set({
        isSubscribed: false,
        plan: 'none',
        subscriptionExpiry: null,
      }, { merge: true });

      return {
        status: 'NEW_USER',
        message: 'Please choose a subscription plan.',
      };
    }

    // State 2: NOT_SUBSCRIBED
    if (userData.isSubscribed === false) {
      return {
        status: 'NOT_SUBSCRIBED',
        message: 'User does not have a subscription.',
      };
    }
    
    // States 3 & 4: ACTIVE or EXPIRED
    if (userData.isSubscribed === true) {
        const now = new Date();
        const expiryDate = userData.subscriptionExpiry?.toDate(); // Firestore Timestamps need to be converted

        if (expiryDate && expiryDate > now) {
            // State 3: ACTIVE_SUBSCRIPTION
            return {
                status: 'ACTIVE_SUBSCRIPTION',
                message: 'Subscription is active.',
            };
        } else {
            // State 4: EXPIRED_SUBSCRIPTION
            return {
                status: 'EXPIRED_SUBSCRIPTION',
                message: 'Subscription expired. Please renew.',
            };
        }
    }

    // Fallback in case of unexpected data
    throw new Error('Could not determine subscription status.');
  }
);
