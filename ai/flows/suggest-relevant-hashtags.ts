// This is a server-side file.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting relevant hashtags for marketing content.
 *
 * The flow takes a content description as input and returns a list of relevant hashtags.
 *
 * @interface SuggestRelevantHashtagsInput - The input type for the suggestRelevantHashtags function.
 * @interface SuggestRelevantHashtagsOutput - The output type for the suggestRelevantHashtags function.
 * @function suggestRelevantHashtags - A function that takes content description and returns a list of relevant hashtags.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantHashtagsInputSchema = z.object({
  contentDescription: z.string().describe('A description of the marketing content.'),
});
export type SuggestRelevantHashtagsInput = z.infer<typeof SuggestRelevantHashtagsInputSchema>;

const SuggestRelevantHashtagsOutputSchema = z.object({
  hashtags: z.array(z.string()).describe('A list of relevant hashtags.'),
});
export type SuggestRelevantHashtagsOutput = z.infer<typeof SuggestRelevantHashtagsOutputSchema>;

export async function suggestRelevantHashtags(input: SuggestRelevantHashtagsInput): Promise<SuggestRelevantHashtagsOutput> {
  return suggestRelevantHashtagsFlow(input);
}

const suggestRelevantHashtagsPrompt = ai.definePrompt({
  name: 'suggestRelevantHashtagsPrompt',
  input: {schema: SuggestRelevantHashtagsInputSchema},
  output: {schema: SuggestRelevantHashtagsOutputSchema},
  prompt: `You are a social media expert. Given the following content description, suggest a list of relevant hashtags to increase visibility and engagement.  Return ONLY an array of strings.

Content Description: {{{contentDescription}}}

Hashtags:`,
});

const suggestRelevantHashtagsFlow = ai.defineFlow(
  {
    name: 'suggestRelevantHashtagsFlow',
    inputSchema: SuggestRelevantHashtagsInputSchema,
    outputSchema: SuggestRelevantHashtagsOutputSchema,
  },
  async input => {
    const {output} = await suggestRelevantHashtagsPrompt(input);
    return output!;
  }
);
