'use server';

/**
 * @fileOverview A flow for modifying an existing story based on user instructions.
 *
 * - modifyStory - A function that refines a story with given instructions.
 * - ModifyStoryInput - The input type for the modifyStory function.
 * - ModifyStoryOutput - The return type for the modifyStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModifyStoryInputSchema = z.object({
  originalStory: z.string().describe('The original story text to be modified.'),
  instruction: z.string().describe('The instruction describing the desired changes.'),
});
export type ModifyStoryInput = z.infer<typeof ModifyStoryInputSchema>;

const ModifyStoryOutputSchema = z.object({
    modifiedStory: z.string().describe('The modified story text.')
});
export type ModifyStoryOutput = z.infer<typeof ModifyStoryOutputSchema>;


export async function modifyStory(input: ModifyStoryInput): Promise<ModifyStoryOutput> {
  return modifyStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'modifyStoryPrompt',
  input: {schema: ModifyStoryInputSchema},
  output: {schema: ModifyStoryOutputSchema},
  prompt: `You are an AI story editor and rewriter for social media creators.

The user will give you an original story and an instruction describing what they want to modify or improve. Your task is to refine the story based on that instruction — not to rewrite it completely.

Keep the main tone, structure, and emotion intact.

Follow these rules:
- Edit the story naturally, like a human content editor.
- Do not start over; make smart improvements.
- If user asks to change tone or add emotion, rewrite only as much as needed.
- Keep it concise, smooth, and authentic.
- Return only the modified story in the "modifiedStory" field.

Original Story:
{{{originalStory}}}

Instruction:
{{{instruction}}}
`,
});

const modifyStoryFlow = ai.defineFlow(
  {
    name: 'modifyStoryFlow',
    inputSchema: ModifyStoryInputSchema,
    outputSchema: ModifyStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
