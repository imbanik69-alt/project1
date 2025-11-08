'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating detailed image prompts.
 *
 * The flow takes a content description as input and returns a detailed image prompt 
 * along with other creative content elements like catchy lines, creative descriptions,
 * tone variants, hashtags, and a color palette.
 *
 * - generateImagePrompts - The main function that triggers the image prompt generation flow.
 * - GenerateImagePromptsInput - The input type for the generateImagePrompts function.
 * - GenerateImagePromptsOutput - The output type for the generateImagePrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImagePromptsInputSchema = z.object({
  contentDescription: z
    .string()
    .describe('A brief description of the content for which marketing materials are needed.'),
});
export type GenerateImagePromptsInput = z.infer<typeof GenerateImagePromptsInputSchema>;

const GenerateImagePromptsOutputSchema = z.object({
  catchy_line: z.string().describe('One punchy headline or caption (under 15 words)'),
  image_prompt: z
    .string()
    .describe(
      'Detailed image generation prompt with style, lighting, composition, colors, mood, and camera angle (50-100 words). Include specific visual details suitable for DALL-E or Stable Diffusion.'
    ),
  creative_description: z
    .string()
    .describe('2-3 sentence explanation of the concept, layout suggestions, and why it works'),
  variants: z
    .array(
      z.object({
        tone: z.string().describe('The tone of the alternative headline'),
        catchy_line: z.string().describe('Alternative headline with a specific tone'),
      })
    )
    .describe('Alternative headlines with humorous, emotional, and aesthetic tones'),
  hashtags: z.array(z.string()).describe('Relevant hashtags for the content'),
  color_palette: z.array(z.string()).describe('A color palette for the content'),
});
export type GenerateImagePromptsOutput = z.infer<typeof GenerateImagePromptsOutputSchema>;

export async function generateImagePrompts(
  input: GenerateImagePromptsInput
): Promise<GenerateImagePromptsOutput> {
  return generateImagePromptsFlow(input);
}

const generateImagePromptsPrompt = ai.definePrompt({
  name: 'generateImagePromptsPrompt',
  input: {schema: GenerateImagePromptsInputSchema},
  output: {schema: GenerateImagePromptsOutputSchema},
  prompt: `You are CreativeAI, a creative assistant that helps generate marketing content for students and creators.

  When the user provides a brief description of what they need (poster, caption, or video script idea), respond with this exact JSON structure:

  {
    "catchy_line": "One punchy headline or caption (under 15 words)",
    "image_prompt": "Detailed image generation prompt with style, lighting, composition, colors, mood, and camera angle (50-100 words). Include specific visual details suitable for DALL-E or Stable Diffusion.",
    "creative_description": "2-3 sentence explanation of the concept, layout suggestions, and why it works",
    "variants": [
      {
        "tone": "funny",
        "catchy_line": "Alternative headline with humorous twist"
      },
      {
        "tone": "emotional",
        "catchy_line": "Alternative headline with emotional appeal"
      },
      {
        "tone": "aesthetic",
        "catchy_line": "Alternative headline with artistic/visual focus"
      }
    ],
    "hashtags": ["#relevant", "#hashtags"],
    "color_palette": ["#hexcolor1", "#hexcolor2", "#hexcolor3"]
  }

  Rules:
  - Always output valid JSON only
  - Make image prompts extremely detailed with art style, lighting, angle, and mood
  - Keep catchy lines under 15 words
  - Variants must feel distinctly different in tone
  - Use appropriate language for the target audience
  - Avoid harmful, misleading, or inappropriate content

  User request: {{{contentDescription}}}
  `,
});

const generateImagePromptsFlow = ai.defineFlow(
  {
    name: 'generateImagePromptsFlow',
    inputSchema: GenerateImagePromptsInputSchema,
    outputSchema: GenerateImagePromptsOutputSchema,
  },
  async input => {
    const {output} = await generateImagePromptsPrompt(input);
    return output!;
  }
);
