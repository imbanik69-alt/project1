'use server';

/**
 * @fileOverview A flow for generating caption variants of different lengths.
 *
 * - generateCaptionVariants - A function that generates alternative captions.
 * - GenerateCaptionVariantsInput - The input type for the generateCaptionVariants function.
 * - GenerateCaptionVariantsOutput - The return type for the generateCaptionVariants function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCaptionVariantsInputSchema = z.object({
  contentDescription: z
    .string()
    .describe('A brief description of the content for which captions are needed.'),
});
export type GenerateCaptionVariantsInput = z.infer<
  typeof GenerateCaptionVariantsInputSchema
>;

const GenerateCaptionVariantsOutputSchema = z.array(z.object({
  length: z.string().describe("The length of the caption (e.g., 'short', 'medium', 'long')."),
  caption: z.string().describe('The generated caption.'),
}));
export type GenerateCaptionVariantsOutput = z.infer<
  typeof GenerateCaptionVariantsOutputSchema
>;

export async function generateCaptionVariants(
  input: GenerateCaptionVariantsInput
): Promise<GenerateCaptionVariantsOutput> {
  return generateCaptionVariantsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCaptionVariantsPrompt',
  input: {schema: GenerateCaptionVariantsInputSchema},
  output: {schema: GenerateCaptionVariantsOutputSchema},
  prompt: `You are a social media expert. For the following content description, generate a bunch of captions: a few short, a few medium, and a few long ones.

Content Description: {{{contentDescription}}}

Return an array of captions, each with a length property.

Example output:
[
  {
    "length": "short",
    "caption": "A very short and punchy caption."
  },
  {
    "length": "medium",
    "caption": "A medium-length caption that provides a bit more detail and context."
  },
  {
    "length": "long",
    "caption": "A long, descriptive caption that tells a story or provides a lot of information, suitable for a more engaged audience."
  }
]
`,
});

const generateCaptionVariantsFlow = ai.defineFlow(
  {
    name: 'generateCaptionVariantsFlow',
    inputSchema: GenerateCaptionVariantsInputSchema,
    outputSchema: GenerateCaptionVariantsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
