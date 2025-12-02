
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
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Input Schema
const CheckSubscriptionStatusInputSchema = z.object({
  userId: z.string().describe("The user's unique ID."),
});
export type CheckSubscriptionStatusInput = z.infer<typeof CheckSubscriptionStatusInputSchema>;

// Output Schema
const CheckSubscriptionStatusOutputSchema = z.object({
  status: z.enum(['NEW_USER_NO_SUBSCRIPTION', 'NO_SUBSCRIPTION', 'ACTIVE_SUBSCRIPTION', 'SUBSCRIPTION_EXPIRED']),
  action: z.enum(['REDIRECT_TO_PRICING', 'ALLOW_PDF_DOWNLOAD']),
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

    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists() || !userDoc.data().hasOwnProperty('isSubscribed')) {
      // NEW_USER
      await setDoc(userDocRef, {
        isSubscribed: false,
        plan: 'none',
        subscriptionExpiry: null,
      }, { merge: true });
      return {
        status: 'NEW_USER_NO_SUBSCRIPTION',
        action: 'REDIRECT_TO_PRICING',
      };
    }

    const userData = userDoc.data();
    const { isSubscribed, subscriptionExpiry } = userData;

    if (!isSubscribed) {
      // NOT_SUBSCRIBED
      return {
        status: 'NO_SUBSCRIPTION',
        action: 'REDIRECT_TO_PRICING',
      };
    }

    // subscriptionExpiry is a Firestore Timestamp, so we need to convert it to a Date
    if (subscriptionExpiry && subscriptionExpiry.toDate() > new Date()) {
      // ACTIVE_SUBSCRIPTION
      return {
        status: 'ACTIVE_SUBSCRIPTION',
        action: 'ALLOW_PDF_DOWNLOAD',
      };
    } else {
      // EXPIRED_SUBSCRIPTION
      return {
        status: 'SUBSCRIPTION_EXPIRED',
        action: 'REDIRECT_TO_PRICING',
      };
    }
  }
);
