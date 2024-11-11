"use client";

import { useState } from "react";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, MessageCircle, Share2, ThumbsUp } from "lucide-react";

import { PostDialog } from "./dialog-post";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

export default function Post() {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <PostDialog open={isPostOpen} setOpen={setIsPostOpen}>
      <Card className="md:w-[580px] bg-background">
        <CardHeader className="flex flex-row items-center space-x-4 p-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <AvatarFallback>RR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">Reel Rundown</div>
            <div className="text-sm text-muted-foreground">2h</div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </Button>
        </CardHeader>
        <div className="px-4 pb-2">
          <p>Beautiful View Of Autumn 🔥🔥🔥</p>
        </div>
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Autumn landscape with a pink cherry blossom tree reflected in a lake"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col p-0">
          <div className="w-full flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm text-muted-foreground">501</span>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>6 comments</span>
              <span>26 shares</span>
            </div>
          </div>
          <div className="w-full flex items-center justify-between p-2">
            <Button variant="ghost" className="flex-1 gap-2">
              <ThumbsUp className="w-5 h-5" />
              Like
            </Button>
            <Button
              variant="ghost"
              className="flex-1 gap-2"
              onClick={() => {
                if (isMobile) router.push("/post/123");
                else setIsPostOpen(true);
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Comment
            </Button>
            <Button variant="ghost" className="flex-1 gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </Button>
          </div>
          <div className="w-full flex items-center gap-2 p-4 pt-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>DH</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                className="w-full px-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* {isOpen && <Comment/>} */}
        </CardFooter>
      </Card>
    </PostDialog>
  );
}
