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
    <motion.div 
      className="overflow-hidden rounded-2xl glass border border-purple-500/20 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <Link href={`/profile/${post.user.username}`} className="flex items-center gap-3 hover:underline group">
          <Avatar className="h-10 w-10 ring-2 ring-purple-500/30 group-hover:ring-purple-400/50 transition-all">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-green-500 text-white font-semibold">{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-white">{post.user.username}</span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-gray-400 hover:bg-purple-500/20 hover:text-white transition-all"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass border border-purple-500/30 text-white">
            <DropdownMenuItem className="focus:bg-purple-500/20 focus:text-white">Follow</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-purple-500/20 focus:text-white">Add to favorites</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-purple-500/20 focus:text-white">Go to post</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-purple-500/20 focus:text-white">Share to...</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-purple-500/20 focus:text-white">Copy link</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-purple-500/30" />
            <DropdownMenuItem className="focus:bg-purple-500/20 focus:text-white">Report</DropdownMenuItem>
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
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-5">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full p-0 hover:bg-purple-500/20 transition-all duration-300"
              onClick={handleLike}
            >
              <motion.div
                whileTap={{ scale: 0.8 }}
                animate={liked ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`h-7 w-7 ${liked ? "fill-purple-500 text-purple-500" : "text-gray-400"}`} />
              </motion.div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full p-0 hover:bg-purple-500/20 transition-all duration-300"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-7 w-7 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full p-0 hover:bg-purple-500/20 transition-all duration-300">
              <Share2 className="h-7 w-7 text-gray-400" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full p-0 hover:bg-purple-500/20 transition-all duration-300"
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark className={`h-7 w-7 ${bookmarked ? "fill-purple-500 text-purple-500" : "text-gray-400"}`} />
          </Button>
        </div>

        {/* Likes count */}
        <div className="mt-2 font-semibold text-white">{likesCount} likes</div>

        {/* Caption */}
        <div className="mt-1 text-gray-200">
          <span className="font-semibold text-white">{post.user.username}</span> <span>{post.content}</span>
        </div>

        {/* View comments button */}
        <button className="mt-1 text-sm text-purple-400 hover:underline transition-colors" onClick={() => setShowComments(!showComments)}>
          View all {post.comments} comments
        </button>

        {/* Timestamp */}
        <div className="mt-1 text-xs uppercase text-gray-500 tracking-wide">{post.timeAgo}</div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-purple-500/30 p-4 glass">
          <div className="mb-4 space-y-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-purple-500/20">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Commenter" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-green-500 text-white">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-gray-200">
                  <span className="font-semibold text-white">user123</span> <span>Great work! I love the design.</span>
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                  <span>1h</span>
                  <button className="font-semibold hover:text-purple-400 transition-colors">Reply</button>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0 hover:bg-purple-500/20">
                <Heart className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-purple-500/20">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Commenter" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-green-500 text-white">D</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-gray-200">
                  <span className="font-semibold text-white">devfan</span> <span>Would love to see the code for this!</span>
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                  <span>30m</span>
                  <button className="font-semibold hover:text-purple-400 transition-colors">Reply</button>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0 hover:bg-purple-500/20">
                <Heart className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3 border-t border-purple-500/30 pt-3">
            <Input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-0 bg-transparent p-0 text-sm focus:ring-0 text-white placeholder:text-gray-500"
            />
            <Button variant="ghost" size="sm" className="text-purple-400 font-semibold">
              Post
            </Button>
          </div>
        </div>
      )}

      {/* Add comment */}
      {!showComments && (
        <div className="border-t border-purple-500/30 p-4 glass">
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-0 bg-transparent p-0 text-sm focus:ring-0 text-white placeholder:text-gray-500"
            />
            <Button variant="ghost" size="sm" className="text-purple-400 font-semibold">
              Post
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return <input className={`focus:outline-none ${className}`} {...props} />
}

