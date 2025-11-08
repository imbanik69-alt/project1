import Link from 'next/link';
import { Button } from './ui/button';
import { Github, MoveUp, Mail, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={cn(
        "w-full z-10",
        isHomepage ? "bg-transparent text-white" : "border-t bg-background"
      )}>
       <div className="container mx-auto py-8 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">Vynce</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Vynce — Where Vibe Meets Influence.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
               <h4 className="font-semibold">Contact Us</h4>
               <div className="space-y-2 text-sm text-muted-foreground">
                <a href="mailto:rahit125pal@gmail.com" className="flex items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4" />
                  <span>rahit125pal@gmail.com</span>
                </a>
                 <a href="mailto:imbanik69@gmail.com" className="flex items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4" />
                  <span>imbanik69@gmail.com</span>
                </a>
                <a href="tel:+919163999798" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="h-4 w-4" />
                    <span>+91 91639 99798</span>
                </a>
                <a href="tel:+918240918256" className="flex items-center gap-2 hover:text-primary">
                    <Phone className="h-4 w-4" />
                    <span>+91 82409 18256</span>
                </a>
               </div>
            </div>
          </div>
        </div>
        <div className={cn("mt-8 flex flex-col md:flex-row items-center justify-between pt-6", isHomepage ? "border-t border-white/20" : "border-t")}>
          <p className="text-sm text-muted-foreground">
            © 2025 Team Clutch Commit — Powered by Gemini and Firebase.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
             <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
            </Button>
             <Button variant="outline" size="icon" onClick={scrollToTop}>
                <MoveUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
