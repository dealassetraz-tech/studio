
'use server';

/**
 * @fileOverview A Genkit flow for updating a user's subscription status.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Input Schema
const UpdateUserSubscriptionInputSchema = z.object({
  userId: z.string().describe("The user's unique ID."),
  plan: z.string().describe("The new subscription plan."),
});
export type UpdateUserSubscriptionInput = z.infer<typeof UpdateUserSubscriptionInputSchema>;

// Output Schema
const UpdateUserSubscriptionOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type UpdateUserSubscriptionOutput = z.infer<typeof UpdateUserSubscriptionOutputSchema>;

/**
 * A wrapper function that invokes the subscription update flow.
 * @param input The user ID and new plan.
 * @returns A promise that resolves to a success status.
 */
export async function updateUserSubscription(input: UpdateUserSubscriptionInput): Promise<UpdateUserSubscriptionOutput> {
  return updateUserSubscriptionFlow(input);
}

// Genkit flow to update subscription status
const updateUserSubscriptionFlow = ai.defineFlow(
  {
    name: 'updateUserSubscriptionFlow',
    inputSchema: UpdateUserSubscriptionInputSchema,
    outputSchema: UpdateUserSubscriptionOutputSchema,
  },
  async ({ userId, plan }) => {
    const { firestore } = initializeFirebase();
    const userDocRef = doc(firestore, 'users', userId);

    try {
      const subscriptionExpiry = new Date();
      subscriptionExpiry.setFullYear(subscriptionExpiry.getFullYear() + 1);

      await updateDoc(userDocRef, {
        isSubscribed: true,
        plan: plan,
        subscriptionExpiry: subscriptionExpiry,
      });

      return {
        success: true,
        message: 'Subscription updated successfully.',
      };
    } catch (error) {
        console.error("Failed to update subscription:", error);
        return {
            success: false,
            message: 'Failed to update subscription.',
        };
    }
  }
);
