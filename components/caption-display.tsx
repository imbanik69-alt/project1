'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, Copy } from 'lucide-react';
import { GenerateCaptionVariantsOutput } from '@/ai/flows/generate-caption-variants';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './ui/badge';

type CaptionDisplayProps = {
  content: GenerateCaptionVariantsOutput | null;
  isLoading: boolean;
};

export default function CaptionDisplay({ content, isLoading }: CaptionDisplayProps) {
    const { toast } = useToast();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
        title: 'Copied to clipboard!',
        description: 'Caption has been copied.',
        });
    };

  if (isLoading) {
    return <CaptionDisplaySkeleton />;
  }

  if (!content) {
    return (
      <Card className="flex h-full min-h-[500px] items-center justify-center border-dashed">
        <CardContent className="text-center">
          <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Your Captions Will Appear Here</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form to generate a variety of captions.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>Generated Captions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {content.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/50 space-y-2">
                    <div className='flex justify-between items-center'>
                        <Badge variant="secondary" className="capitalize">{item.length}</Badge>
                        <button onClick={() => handleCopy(item.caption)} className="p-1.5 rounded-md hover:bg-muted-foreground/20">
                            <Copy className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </div>
                    <p className="text-muted-foreground">{item.caption}</p>
                </div>
            ))}
            </CardContent>
        </Card>
    </div>
  );
}

function CaptionDisplaySkeleton() {
  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-2/5" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-full" />
                </div>
                 <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
                 <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/5" />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
