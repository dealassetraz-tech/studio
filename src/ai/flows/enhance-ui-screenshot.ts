'use server';

/**
 * @fileOverview This file defines a Genkit flow to enhance UI screenshots based on modern design standards and LLM reasoning.
 *
 * - enhanceUIScreenshot - A function that accepts a UI screenshot as a data URI and returns enhanced UI/UX code.
 * - EnhanceUIScreenshotInput - The input type for the enhanceUIScreenshot function.
 * - EnhanceUIScreenshotOutput - The return type for the enhanceUIScreenshot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceUIScreenshotInputSchema = z.object({
  screenshotDataUri: z
    .string()
    .describe(
      "A UI screenshot, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhanceUIScreenshotInput = z.infer<typeof EnhanceUIScreenshotInputSchema>;

const EnhanceUIScreenshotOutputSchema = z.object({
  enhancedCode: z
    .string()
    .describe('The enhanced UI/UX code based on the screenshot.'),
});
export type EnhanceUIScreenshotOutput = z.infer<typeof EnhanceUIScreenshotOutputSchema>;

export async function enhanceUIScreenshot(
  input: EnhanceUIScreenshotInput
): Promise<EnhanceUIScreenshotOutput> {
  return enhanceUIScreenshotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceUIScreenshotPrompt',
  input: {schema: EnhanceUIScreenshotInputSchema},
  output: {schema: EnhanceUIScreenshotOutputSchema},
  prompt: `You are an expert UI/UX designer. You will analyze the provided UI screenshot and enhance the UI/UX based on modern design standards. Consider the layout, components, color theme, and structure. Generate complete, scalable, production-ready code (React + Tailwind CSS). Ensure the website is fully responsive and works on all OS and screen sizes. Provide modular and scalable folder structure, reusable components, and clean code. Integrate dynamic functionalities as needed (forms, API calls, animations, backend integrations, etc.).

Here is the UI screenshot: {{media url=screenshotDataUri}}

Return the enhanced code. Adhere to the following style:
- Primary color: Deep Blue (#1E3A8A) for a professional and modern feel.
- Background color: Light gray (#F9FAFB) for a clean and unobtrusive backdrop.
- Accent color: Teal (#2DD4BF) for highlighting interactive elements and key information.
- Body font: 'Inter', sans-serif, for clean readability and modern aesthetic.
- Headline font: 'Space Grotesk', sans-serif, for bold, attention-grabbing headlines.
- Employ a grid-based layout for consistent spacing and alignment.
- Use a set of modern, minimalist icons to enhance user experience.
- Incorporate subtle transitions and animations to provide visual feedback and enhance interactivity.`,
});

const enhanceUIScreenshotFlow = ai.defineFlow(
  {
    name: 'enhanceUIScreenshotFlow',
    inputSchema: EnhanceUIScreenshotInputSchema,
    outputSchema: EnhanceUIScreenshotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
