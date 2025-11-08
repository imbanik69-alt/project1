'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, User } from "lucide-react";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateMarketingContent } from '@/ai/flows/generate-marketing-content';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AiBadge } from '@/components/ai-badge';
import { useUser } from '@/firebase';

type Message = {
  text: string;
  sender: 'user' | 'ai';
  isTyping?: boolean;
};

const placeholderPrompts = [
  "Describe your idea for a ‘caption’ or a ‘story’…",
  "What creative spark do you want to ignite today?",
  "Tell Vynce your vibe — I’ll make it shine.",
  "Need a caption? A story? Or something in between?",
  "Write your idea and let Vynce transform it.",
];

export default function CreatePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = placeholderPrompts[placeholderIndex];
      if (isDeleting) {
        if (currentPlaceholder.length > 0) {
          setCurrentPlaceholder(fullText.substring(0, currentPlaceholder.length - 1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholderPrompts.length);
          setTypingSpeed(100);
        }
      } else {
        if (currentPlaceholder.length < fullText.length) {
          setCurrentPlaceholder(fullText.substring(0, currentPlaceholder.length + 1));
          setTypingSpeed(100);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [currentPlaceholder, isDeleting, placeholderIndex, typingSpeed]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableView = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollableView) {
        scrollableView.scrollTo({
          top: scrollableView.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    if (!isInteracted) {
      setIsInteracted(true);
    }

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const result = await generateMarketingContent({ description: currentInput });
      const fullResponse = `**${result.story_title}**\n\n${result.story_text}`;
      
      const aiResponse: Message = {
        text: fullResponse,
        sender: 'ai',
      };

      let streamedText = '';
      setMessages(prev => [...prev, { sender: 'ai', text: '', isTyping: true }]);

      const words = fullResponse.split(' ');
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        streamedText += (i > 0 ? ' ' : '') + words[i];
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.sender === 'ai') {
            lastMessage.text = streamedText;
            lastMessage.isTyping = i < words.length - 1;
          }
          return newMessages;
        });
      }

    } catch (error) {
      console.error('Failed to generate content:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again.',
      });
       setMessages(prev => prev.filter(m => !m.isTyping));
      const errorMessage: Message = { text: "I'm sorry, I couldn't generate a response. Please try again.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatMessage = (text: string) => {
    const parts = text.split('\n\n');
    if (parts.length > 1 && parts[0].startsWith('**') && parts[0].endsWith('**')) {
      const title = parts[0].replace(/\*\*/g, '');
      const body = parts.slice(1).join('\n\n');
      return (
        <>
          <strong className="block text-xl mb-3 font-semibold not-italic">{title}</strong>
          <p className="whitespace-pre-wrap">{body}</p>
        </>
      );
    }
    const formattedText = text.split('**').map((part, index) => {
        return index % 2 === 1 ? <strong key={index}>{part}</strong> : part;
    });

    return <p className="whitespace-pre-wrap">{formattedText}</p>;
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1">
      <span className="typing-dot"></span>
      <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
      <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
    </div>
  );

  return (
    <div className="relative flex flex-col h-full w-full items-center justify-between overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-indigo rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob-intro"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-glow-magenta rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob-intro animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-glow-orange rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob-intro animation-delay-4000"></div>
      </div>

      <AnimatePresence>
        {!isInteracted && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            className="absolute top-1/4 flex flex-col items-center justify-center text-center px-4"
          >
            {user ? (
               <h1 className="text-3xl md:text-4xl font-bold italic tracking-tight text-blue-400">
                Hello, {user.displayName?.split(' ')[0]}
              </h1>
            ) : (
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Make Your Next Post Shine</h1>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="w-full flex-grow my-8 px-4 h-full overflow-hidden">
         <AnimatePresence>
           {isInteracted && (
              <ScrollArea className="h-full w-full" ref={scrollAreaRef}>
                 <div className="w-full max-w-[680px] mx-auto">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="space-y-6 pb-24"
                    >
                    {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className={cn('flex items-start gap-4', message.sender === 'user' ? 'justify-end' : 'justify-start')}
                        >
                          {message.sender === 'ai' && (
                              <AiBadge isTyping={!!message.isTyping} />
                          )}
                           <div className={cn(
                              'w-full',
                              message.sender === 'user' 
                                ? 'max-w-[85%] md:max-w-[75%] text-right text-purple-300 text-base italic' 
                                : 'text-sm italic text-gray-300 md:text-base tracking-wide leading-relaxed'
                          )}
                          style={{textShadow: message.sender === 'user' ? '0 0 8px rgba(0, 0, 0, 0.6)' : 'none'}}
                          >
                              {message.isTyping ? <TypingIndicator /> : formatMessage(message.text)}
                          </div>
                          {message.sender === 'user' && (
                              <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback>
                                  <User className="h-5 w-5" />
                              </AvatarFallback>
                              </Avatar>
                          )}
                        </motion.div>
                    ))}
                    </motion.div>
                 </div>
              </ScrollArea>
           )}
         </AnimatePresence>
      </div>

      <motion.div
        className="w-full max-w-[680px] mx-auto sticky bottom-6 px-4"
        animate={isInteracted ? { y: 0 } : { y: '-20vh' }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        onFocus={() => !isInteracted && setIsInteracted(true)}
      >
        <div className="relative group">
          <Textarea
            placeholder={currentPlaceholder}
            className="lovable-input-vynce pr-16"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isLoading}
            rows={1}
          />
          <Button 
            type="button" 
            size="icon"
            className="terminal-send-button" 
            disabled={isLoading || input.trim() === ''}
            onClick={handleSend}
            aria-label="Send message"
            >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-green-400" /> : <span className="terminal-send-symbol">&gt;</span>}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
