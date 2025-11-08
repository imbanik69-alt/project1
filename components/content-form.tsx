'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateMarketingContent, type GenerateMarketingContentOutput } from '@/ai/flows/generate-marketing-content';
import { generateCaptionVariants, GenerateCaptionVariantsOutput } from '@/ai/flows/generate-caption-variants';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }).max(500, {
    message: 'Description must not be longer than 500 characters.'
  }),
  mode: z.enum(['Caption', 'Storywriter']),
});

type ContentFormProps = {
  setIsLoading: (isLoading: boolean) => void;
  setGeneratedContent: (content: GenerateMarketingContentOutput | GenerateCaptionVariantsOutput | null) => void;
  isLoading: boolean;
  mode: 'Caption' | 'Storywriter';
  setMode: (mode: 'Caption' | 'Storywriter') => void;
};

export default function ContentForm({ setIsLoading, setGeneratedContent, isLoading, mode, setMode }: ContentFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      mode: 'Caption',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedContent(null);
    try {
      if (values.mode === 'Storywriter') {
        const result = await generateMarketingContent({ description: values.description });
        setGeneratedContent(result);
      } else {
        const result = await generateCaptionVariants({ contentDescription: values.description });
        setGeneratedContent(result);
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleModeChange = (newMode: string) => {
    if (newMode === 'Caption' || newMode === 'Storywriter') {
      setMode(newMode);
      form.setValue('mode', newMode);
      setGeneratedContent(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
       <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Make Your Next Post Shine ✨</h1>
            <p className="mt-2 text-muted-foreground">Select a mode, describe your idea, and let AI spark your creativity.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="flex justify-center">
                  <FormControl>
                    <Tabs defaultValue={field.value} onValueChange={handleModeChange} className="w-auto">
                      <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1.5">
                        <TabsTrigger value="Caption" className="data-[state=active]:bg-background">Caption</TabsTrigger>
                        <TabsTrigger value="Storywriter" className="data-[state=active]:bg-background">Storywriter</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative group">
                       <Textarea
                        placeholder="e.g., A bake sale for the local animal shelter."
                        className="chat-style-input pr-16"
                        {...field}
                      />
                       <Button 
                        type="submit" 
                        size="icon"
                        className="absolute right-4 bottom-4 h-10 w-10 rounded-full bg-accent-gradient text-white shadow-lg group-hover:scale-105 transition-transform" 
                        disabled={isLoading}>
                         {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                       </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
    </div>
  );
}
