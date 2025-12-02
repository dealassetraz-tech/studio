
'use server';

/**
 * @fileOverview A Genkit flow for checking a user's subscription status.
 * This serves as the core business logic for subscription management.
 *
 * - checkSubscriptionStatus - The main function to call for checking subscription status.
 * - CheckSubscriptionStatusInput - The input type for the flow.
 * - CheckSubscriptionStatusOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// Input Schema
const CheckSubscriptionStatusInputSchema = z.object({
  userId: z.string().describe("The user's unique ID."),
});
export type CheckSubscriptionStatusInput = z.infer<typeof CheckSubscriptionStatusInputSchema>;

// Output Schema
const CheckSubscriptionStatusOutputSchema = z.object({
  status: z.enum(['NEW_USER', 'NOT_SUBSCRIBED', 'ACTIVE_SUBSCRIPTION', 'EXPIRED_SUBSCRIPTION']),
  message: z.string(),
});
export type CheckSubscriptionStatusOutput = z.infer<typeof CheckSubscriptionStatusOutputSchema>;

/**
 * A wrapper function that invokes the subscription status flow.
 * @param input The user ID to check.
 * @returns A promise that resolves to the subscription status.
 */
export async function checkSubscriptionStatus(input: CheckSubscriptionStatusInput): Promise<CheckSubscriptionStatusOutput> {
  return checkSubscriptionStatusFlow(input);
}

// Genkit flow to check subscription status
const checkSubscriptionStatusFlow = ai.defineFlow(
  {
    name: 'checkSubscriptionStatusFlow',
    inputSchema: CheckSubscriptionStatusInputSchema,
    outputSchema: CheckSubscriptionStatusOutputSchema,
  },
  async ({ userId }) => {
    const { firestore } = initializeFirebase();
    const userDocRef = doc(firestore, 'users', userId);

    try {
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() || !userDoc.data().hasOwnProperty('isSubscribed')) {
        // NEW_USER
        await setDoc(userDocRef, {
          isSubscribed: false,
          plan: 'none',
          subscriptionExpiry: null,
        }, { merge: true });
        return {
          status: 'NEW_USER',
          message: 'Please choose a subscription plan.',
        };
      }

      const userData = userDoc.data();
      const { isSubscribed, subscriptionExpiry } = userData;

      if (!isSubscribed) {
        // NOT_SUBSCRIBED
        return {
          status: 'NOT_SUBSCRIBED',
          message: 'User does not have a subscription.',
        };
      }

      if (subscriptionExpiry && subscriptionExpiry.toDate() > new Date()) {
        // ACTIVE_SUBSCRIPTION
        return {
          status: 'ACTIVE_SUBSCRIPTION',
          message: 'Subscription is active.',
        };
      } else {
        // EXPIRED_SUBSCRIPTION
        return {
          status: 'EXPIRED_SUBSCRIPTION',
          message: 'Subscription expired. Please renew.',
        };
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
      // Fallback for any errors during Firestore operation
      return {
        status: 'NOT_SUBSCRIBED',
        message: 'Could not determine subscription status.',
      };
    }
  }
);
