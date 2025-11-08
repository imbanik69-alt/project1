
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Footer } from '@/components/footer';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUser, useAuth } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/create', label: 'Create' },
  { href: '/about', label: 'About' },
  { href: '/profile', label: 'Profile' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHomepage = pathname === '/';
  const isCreatePage = pathname === '/create';
  const isLoginPage = pathname === '/login';

  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/');
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/profile');
    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Error during Google sign-in:', error);
      }
    }
  };

  const AuthButton = () => {
    if (isUserLoading) {
      return <Button variant="ghost" disabled>Loading...</Button>;
    }
  
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  
    return (
       <Button onClick={handleGoogleSignIn} variant="ghost">
          <FcGoogle className="mr-2 h-4 w-4" />
          Login
        </Button>
    );
  };

  const headerContent = (
    <>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
        <Logo className={cn("h-8 w-8", isHomepage ? "animate-header-logo-fly-in text-white" : "text-primary")} />
        <span className={cn(isHomepage ? 'animate-header-logo-fly-in' : '')}>Vynce</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {navItems.map((item) => {
          if (item.href === '/profile' && !user) return null;
          return (
            <Link
            key={item.label}
            href={item.href}
            className={cn(
                'transition-colors',
                'text-gray-300 hover:text-white',
                pathname === item.href && 'text-white font-semibold'
            )}
            >
            {item.label}
            </Link>
          )
        })}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <AuthButton />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-black text-white">
                <div className="flex flex-col gap-6 p-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setOpen(false)}>
                        <Logo className="h-8 w-8 text-primary" />
                        <span>Vynce</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => {
                          if (item.href === '/profile' && !user) return null;
                          return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                'text-lg text-gray-300 hover:text-white transition-colors',
                                pathname === item.href && 'text-primary font-semibold'
                                )}
                            >
                                {item.label}
                            </Link>
                          )
                        })}
                    </nav>
                    <div className="flex flex-col gap-2 pt-4 border-t border-white/20">
                        <AuthButton />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </>
  );

  if (isLoginPage) {
    return <main>{children}</main>
  }

  return (
    <div className={cn("flex flex-col min-h-screen", isCreatePage && "h-screen")}>
       <header
          className={cn(
            'sticky top-0 z-50 w-full transition-all duration-300',
            (isScrolled || !isHomepage) ? 'border-b border-white/10 bg-black/20 backdrop-blur-sm text-white' : 'bg-transparent',
            isCreatePage && 'bg-transparent border-b-0'
          )}
        >
          <div className={cn("container mx-auto flex items-center justify-between px-4", isCreatePage ? 'h-12' : 'h-16')}>
            {headerContent}
          </div>
        </header>
      <main className={cn("flex-1 flex justify-center", !isHomepage && !isCreatePage && "py-8 px-4", isCreatePage && "h-[calc(100vh-3rem)]")}>
          <div className="w-full">
            {children}
          </div>
      </main>
      {!isCreatePage && <Footer />}
    </div>
  );
}
