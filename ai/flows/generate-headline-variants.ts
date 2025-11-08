'use server';

/**
 * @fileOverview A flow for generating alternative headlines with different tones.
 *
 * - generateHeadlineVariants - A function that generates alternative headlines.
 * - GenerateHeadlineVariantsInput - The input type for the generateHeadlineVariants function.
 * - GenerateHeadlineVariantsOutput - The return type for the generateHeadlineVariants function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeadlineVariantsInputSchema = z.object({
  contentDescription: z
    .string()
    .describe('A brief description of the marketing content.'),
});
export type GenerateHeadlineVariantsInput = z.infer<
  typeof GenerateHeadlineVariantsInputSchema
>;

const GenerateHeadlineVariantsOutputSchema = z.array(z.object({
  tone: z.string().describe('The tone of the headline variant.'),
  catchy_line: z.string().describe('The alternative headline.'),
}));
export type GenerateHeadlineVariantsOutput = z.infer<
  typeof GenerateHeadlineVariantsOutputSchema
>;

export async function generateHeadlineVariants(
  input: GenerateHeadlineVariantsInput
): Promise<GenerateHeadlineVariantsOutput> {
  return generateHeadlineVariantsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeadlineVariantsPrompt',
  input: {schema: GenerateHeadlineVariantsInputSchema},
  output: {schema: GenerateHeadlineVariantsOutputSchema},
  prompt: `You are a marketing expert. Generate alternative headlines with different tones (funny, emotional, aesthetic) for the following content description:

Content Description: {{{contentDescription}}}

Return an array of headlines, each with a distinct tone.

Example output:
[
  {
    "tone": "funny",
    "catchy_line": "Headline with humorous twist"
  },
  {
    "tone": "emotional",
    "catchy_line": "Headline with emotional appeal"
  },
  {
    "tone": "aesthetic",
    "catchy_line": "Headline with artistic/visual focus"
  }
]
`,
});

const generateHeadlineVariantsFlow = ai.defineFlow(
  {
    name: 'generateHeadlineVariantsFlow',
    inputSchema: GenerateHeadlineVariantsInputSchema,
    outputSchema: GenerateHeadlineVariantsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
