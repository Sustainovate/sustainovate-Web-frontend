"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

interface Post {
  id: number
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  timeAgo: string
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="overflow-hidden rounded-xl bg-[#12121D]">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <Link href={`/profile/${post.user.username}`} className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{post.user.username}</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-gray-400 hover:bg-transparent hover:text-white"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#12121D] text-white">
            <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">Follow</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">Add to favorites</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">Go to post</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">Share to...</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">Copy link</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative aspect-square w-full">
          <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full p-0 hover:bg-transparent"
              onClick={handleLike}
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                animate={liked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`h-7 w-7 ${liked ? "fill-[#A05CF5] text-[#A05CF5]" : ""}`} />
              </motion.div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full p-0 hover:bg-transparent"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-7 w-7" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full p-0 hover:bg-transparent">
              <Share2 className="h-7 w-7" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full p-0 hover:bg-transparent"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark className={`h-7 w-7 ${bookmarked ? "fill-[#A05CF5] text-[#A05CF5]" : ""}`} />
          </Button>
        </div>

        {/* Likes count */}
        <div className="mt-2 font-semibold">{likesCount} likes</div>

        {/* Caption */}
        <div className="mt-1">
          <span className="font-semibold">{post.user.username}</span> <span>{post.content}</span>
        </div>

        {/* View comments button */}
        <button className="mt-1 text-sm text-gray-400" onClick={() => setShowComments(!showComments)}>
          View all {post.comments} comments
        </button>

        {/* Timestamp */}
        <div className="mt-1 text-xs uppercase text-gray-400">{post.timeAgo}</div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-800 p-3">
          <div className="mb-4 space-y-3">
            <div className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Commenter" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p>
                  <span className="font-semibold">user123</span> <span>Great work! I love the design.</span>
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                  <span>1h</span>
                  <button className="font-semibold">Reply</button>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
                <Heart className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Commenter" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p>
                  <span className="font-semibold">devfan</span> <span>Would love to see the code for this!</span>
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                  <span>30m</span>
                  <button className="font-semibold">Reply</button>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
                <Heart className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-gray-800 pt-3">
            <Input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-0 bg-transparent p-0 text-sm focus:ring-0"
            />
            <Button variant="ghost" size="sm" className="text-[#A05CF5]">
              Post
            </Button>
          </div>
        </div>
      )}

      {/* Add comment */}
      {!showComments && (
        <div className="border-t border-gray-800 p-3">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-0 bg-transparent p-0 text-sm focus:ring-0"
            />
            <Button variant="ghost" size="sm" className="text-[#A05CF5]">
              Post
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return <input className={`focus:outline-none ${className}`} {...props} />
}

