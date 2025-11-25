'use server';

/**
 * @fileOverview Generates an initial React codebase based on a high-level text prompt.
 *
 * - generateInitialCodebase - A function that generates the initial codebase.
 * - GenerateInitialCodebaseInput - The input type for the generateInitialCodebase function.
 * - GenerateInitialCodebaseOutput - The return type for the generateInitialCodebase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialCodebaseInputSchema = z.object({
  prompt: z
    .string()
    .describe(
      'A high-level text prompt describing the desired website functionality and design.'
    ),
});
export type GenerateInitialCodebaseInput = z.infer<
  typeof GenerateInitialCodebaseInputSchema
>;

const GenerateInitialCodebaseOutputSchema = z.object({
  codebase: z
    .string()
    .describe(
      'The generated React codebase as a string, including file structure and component code.'
    ),
});
export type GenerateInitialCodebaseOutput = z.infer<
  typeof GenerateInitialCodebaseOutputSchema
>;

export async function generateInitialCodebase(
  input: GenerateInitialCodebaseInput
): Promise<GenerateInitialCodebaseOutput> {
  return generateInitialCodebaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialCodebasePrompt',
  input: {schema: GenerateInitialCodebaseInputSchema},
  output: {schema: GenerateInitialCodebaseOutputSchema},
  prompt: `You are an expert full-stack developer specializing in React and Tailwind CSS.

You will generate a complete, scalable, production-ready React codebase based on the user's prompt. Ensure the website is fully responsive and works on all OS and screen sizes (mobile/tablet/desktop). Provide a modular and scalable folder structure, reusable components, and clean code.

Prompt: {{{prompt}}}

Return the complete codebase as a string. Enclose each file in a markdown code block, specifying the relative path to the file at the top, e.g.:

\`\`\`tsx
// src/components/MyComponent.tsx
// ... component code here
\`\`\`

Make sure that the all the necessary tailwind imports are present in the files that use tailwind classes. Do not include any comments outside of the files.
`,
});

const generateInitialCodebaseFlow = ai.defineFlow(
  {
    name: 'generateInitialCodebaseFlow',
    inputSchema: GenerateInitialCodebaseInputSchema,
    outputSchema: GenerateInitialCodebaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
