import { config } from 'dotenv';
config();

import '@/ai/flows/generate-marketing-content.ts';
import '@/ai/flows/suggest-color-palette.ts';
import '@/ai/flows/suggest-relevant-hashtags.ts';
import '@/ai/flows/generate-image-prompts.ts';
import '@/ai/flows/generate-headline-variants.ts';
import '@/ai/flows/generate-caption-variants.ts';
import '@/ai/flows/modify-story.ts';
