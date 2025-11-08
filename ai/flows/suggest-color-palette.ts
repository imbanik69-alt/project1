'use server';

/**
 * @fileOverview Generates a color palette suggestion for marketing content.
 *
 * - suggestColorPalette - A function that generates color palette suggestions.
 * - SuggestColorPaletteInput - The input type for the suggestColorPalette function.
 * - SuggestColorPaletteOutput - The return type for the suggestColorPalette function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestColorPaletteInputSchema = z.object({
  contentDescription: z
    .string()
    .describe('A description of the marketing content for which the color palette is needed.'),
});
export type SuggestColorPaletteInput = z.infer<typeof SuggestColorPaletteInputSchema>;

const SuggestColorPaletteOutputSchema = z.object({
  colorPalette: z
    .array(z.string())
    .describe('An array of hex color codes appropriate for the content.'),
});
export type SuggestColorPaletteOutput = z.infer<typeof SuggestColorPaletteOutputSchema>;

export async function suggestColorPalette(
  input: SuggestColorPaletteInput
): Promise<SuggestColorPaletteOutput> {
  return suggestColorPaletteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestColorPalettePrompt',
  input: {schema: SuggestColorPaletteInputSchema},
  output: {schema: SuggestColorPaletteOutputSchema},
  prompt: `You are a creative marketing assistant. Based on the description of the marketing content provided, suggest a color palette of hex color codes that would be visually appealing and align with the desired style and mood.\
\
Content Description: {{{contentDescription}}}\
\
Provide the color palette as a JSON array of hex color codes.`,
});

const suggestColorPaletteFlow = ai.defineFlow(
  {
    name: 'suggestColorPaletteFlow',
    inputSchema: SuggestColorPaletteInputSchema,
    outputSchema: SuggestColorPaletteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
