'use server';

/**
 * @fileOverview This flow generates marketing content based on a user's description.
 *
 * - generateMarketingContent - A function that generates marketing content.
 * - GenerateMarketingContentInput - The input type for the generateMarketingContent function.
 * - GenerateMarketingContentOutput - The return type for the generateMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingContentInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A brief description of the marketing content needed (e.g., poster for a student event, caption for a creator\'s new product).'
    ),
});
export type GenerateMarketingContentInput = z.infer<typeof GenerateMarketingContentInputSchema>;

const GenerateMarketingContentOutputSchema = z.object({
  story_title: z.string().describe('2-4 word title for the story'),
  story_text: z
    .string()
    .describe(
      'A paragraph of at least 100 words, or a specific number of lines if requested by the user.'
    ),
  tone: z.string().describe('e.g., nostalgic / motivational / funny'),
  hashtags: z.array(z.string()).describe('3 relevant hashtags'),
});
export type GenerateMarketingContentOutput = z.infer<typeof GenerateMarketingContentOutputSchema>;

export async function generateMarketingContent(
  input: GenerateMarketingContentInput
): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  input: {schema: GenerateMarketingContentInputSchema},
  output: {schema: GenerateMarketingContentOutputSchema},
  prompt: `You are Vynce, an emotionally intelligent, cinematic storytelling AI.
Your job is to take any user prompt — no matter how short — and craft a highly detailed, emotionally immersive story of at least 100 words, unless the user specifically asks for a different length.

Your tone and structure should feel realistic, thoughtful, and vividly human, similar to high-quality creative AI writing.

Core Principles:
- Analyze the prompt deeply before writing. Understand the characters, setting, relationships, intent, and emotional subtext. If emotions are complex (love, guilt, distance, tension, nostalgia, etc.), portray them subtly and empathetically.
- Never moralize — your role is to reflect human emotion, not judge it.
- Describe the scene visually. Mention colors, lights, sounds, textures, or smells to make it cinematic. Create a sense of atmosphere — a world the reader can step into.
- Build emotional layers. Show what the characters feel but don’t say. Include micro-moments — glances, pauses, internal thoughts, half-smiles. Keep it subtle and human.
- Structure every story naturally:
  - Opening: Establish mood, time, and space.
  - Middle: Show emotional contrast or tension.
  - Ending: Leave a soft, reflective note — something that lingers in the reader’s mind.
- Language Style: Use natural, poetic realism (not cliché or robotic). Vary sentence rhythm — mix short reflective lines with descriptive ones. Focus on emotional truth more than plot mechanics.
- Word Count Rule: Each story should be a minimum of 100 words, unless the user says something like “make it short” or “just a caption.”
- Never ask follow-up questions — analyze, infer, and deliver the best version automatically.

Finally, provide 3 relevant hashtags.

Output exactly in this compact JSON format (no extra commentary):
{
  "story_title": "[A 2–4 word title or a catchy headline]",
  "story_text": "[A single string: a story paragraph of at least 100 words OR a 2–3 sentence caption if requested]",
  "tone": "[e.g., nostalgic / introspective / cinematic / hopeful]",
  "hashtags": ["#tag1", "#tag2", "#tag3"]
}

User request: {{{description}}}
  `,
});

const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
