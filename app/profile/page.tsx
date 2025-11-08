
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Clapperboard, Loader2 } from "lucide-react";
import Image from "next/image";

const creations = [
  { id: 1, title: "Sci-Fi Movie Poster", type: "Poster", icon: Clapperboard },
  { id: 2, title: "Emotional Charity Ad", type: "Script", icon: Heart },
  { id: 3, title: "Aesthetic Cafe Promo", type: "Caption", icon: Sparkles },
];

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  if (isUserLoading || !user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="shadow-lg">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="mt-2 text-sm">
              Creative soul, coffee lover, and aspiring content creator. Turning ideas into reality with a little help from AI.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>My Creations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {creations.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image
                    src={`https://picsum.photos/seed/${item.id}/400/300`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <Badge variant="secondary" className="mt-2 flex items-center w-fit">
                    <item.icon className="h-3 w-3 mr-1" />
                    {item.type}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
