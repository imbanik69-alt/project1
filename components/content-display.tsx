'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { GenerateMarketingContentOutput } from '@/ai/flows/generate-marketing-content';
import { modifyStory } from '@/ai/flows/modify-story';
import { Brush, Camera, Copy, Hash, Lightbulb, Palette, Smile, Clapperboard, Heart, Sparkles, PenLine, Wand2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { GeneratedContent } from '@/app/create/page';

type ContentDisplayProps = {
  content: GenerateMarketingContentOutput | null;
  setContent: (content: GeneratedContent) => void;
  isLoading: boolean;
};

export default function ContentDisplay({ content, setContent, isLoading }: ContentDisplayProps) {
  const { toast } = useToast();
  const [isModifying, setIsModifying] = useState(false);
  const [isApplyingChanges, setIsApplyingChanges] = useState(false);
  const [modificationInstruction, setModificationInstruction] = useState('');

  const handleCopy = (text: string, subject: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
      description: `${subject} has been copied.`,
    });
  };

  const handleApplyChanges = async () => {
    if (!modificationInstruction || !content) return;

    setIsApplyingChanges(true);
    try {
      const result = await modifyStory({
        originalStory: content.story_text,
        instruction: modificationInstruction,
      });
      
      setContent({
        ...content,
        story_text: result.modifiedStory,
      });

      toast({
        title: 'Story Modified!',
        description: 'Your story has been updated with the changes.',
      });
      setModificationInstruction('');
      setIsModifying(false);
    } catch (error) {
      console.error('Failed to modify story:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem modifying your story. Please try again.',
      });
    } finally {
      setIsApplyingChanges(false);
    }
  };

  if (isLoading) {
    return <ContentDisplaySkeleton />;
  }

  if (!content) {
    return (
      <Card className="flex h-full min-h-[500px] items-center justify-center border-dashed">
        <CardContent className="text-center">
          <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Your Content Will Appear Here</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form to generate your marketing masterpiece.
          </p>
        </CardContent>
      </Card>
    );
  }

  const isStory = content.story_text.split(' ').length > 30;
  const title = isStory ? "Your Story" : "Your Caption";

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className='flex items-center gap-2'>
                <PenLine className="h-5 w-5 text-primary" />
                <span>{title}</span>
              </div>
               <Badge variant="secondary" className="capitalize">{content.tone}</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="font-headline text-3xl font-bold leading-tight">{content.story_title}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{content.story_text}</p>
          </div>
           {isStory && (
            <div className="pt-4">
              <Button variant="outline" onClick={() => setIsModifying(!isModifying)}>
                <Wand2 className="mr-2 h-4 w-4" />
                Modify Story
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isModifying && (
        <Card className="shadow-lg animate-fade-in-up">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <h3 className="font-semibold">What would you like to change?</h3>
                    <Input 
                        placeholder="e.g., Make it more emotional and add a metaphor about the ocean."
                        value={modificationInstruction}
                        onChange={(e) => setModificationInstruction(e.target.value)}
                        disabled={isApplyingChanges}
                    />
                    <Button className="w-full bg-accent-gradient text-white" onClick={handleApplyChanges} disabled={isApplyingChanges}>
                        {isApplyingChanges && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isApplyingChanges ? 'Applying...' : 'Apply Changes'}
                    </Button>
                </div>
            </CardContent>
        </Card>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-primary" />
            <span>Hashtags</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {content.hashtags.map((tag, index) => (
            <Badge variant="secondary" key={index}>{tag}</Badge>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}

function ContentDisplaySkeleton() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/5" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-2/5" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-28" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-2/4" />
          </CardHeader>
          <CardContent className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
