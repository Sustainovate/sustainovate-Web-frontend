"use client"
import Link from "next/link"
import { Bookmark, Code, Heart, Home, MessageCircle, PlusCircle, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PostCard } from "@/components/post-card"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data
const posts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      username: "sarahcodes",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just launched my new portfolio website built with Next.js and Tailwind CSS! Check it out and let me know what you think. #webdev #nextjs #portfolio",
    image: "/placeholder.svg?height=600&width=600",
    likes: 42,
    comments: 12,
    timeAgo: "2h",
  },
  {
    id: 2,
    user: {
      name: "Alex Johnson",
      username: "alexdev",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I've been working on a new open-source library for React animations. It's still in beta, but I'd love some early feedback from the community!",
    image: "/placeholder.svg?height=600&width=600",
    likes: 89,
    comments: 24,
    timeAgo: "5h",
  },
  {
    id: 3,
    user: {
      name: "Maya Patel",
      username: "mayatech",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "TIL: You can use the :has() selector in CSS to style a parent element based on its children. Game changer for responsive designs! #css #webdev #frontend",
    image: "/placeholder.svg?height=600&width=600",
    likes: 56,
    comments: 8,
    timeAgo: "8h",
  },
]

const stories = [
  { username: "johndoe", avatar: "/placeholder.svg?height=60&width=60", hasUnread: true },
  { username: "sarahcodes", avatar: "/placeholder.svg?height=60&width=60", hasUnread: true },
  { username: "alexdev", avatar: "/placeholder.svg?height=60&width=60", hasUnread: true },
  { username: "mayatech", avatar: "/placeholder.svg?height=60&width=60", hasUnread: false },
  { username: "emmadev", avatar: "/placeholder.svg?height=60&width=60", hasUnread: false },
  { username: "jameslee", avatar: "/placeholder.svg?height=60&width=60", hasUnread: false },
  { username: "sophiatech", avatar: "/placeholder.svg?height=60&width=60", hasUnread: false },
  { username: "williamcoder", avatar: "/placeholder.svg?height=60&width=60", hasUnread: false },
]

const suggestedUsers = [
  { name: "Emma Wilson", username: "emmadev", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "James Lee", username: "jameslee", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Sophia Garcia", username: "sophiatech", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "William Taylor", username: "williamcoder", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Olivia Brown", username: "oliviadev", avatar: "/placeholder.svg?height=40&width=40" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0A0A12] text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-[#0A0A12]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-[#A05CF5]" />
            <span className="text-xl font-bold">DevConnect</span>
          </Link>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search"
              className="w-64 border-gray-700 bg-[#12121D] pl-10 text-white focus:border-[#A05CF5]"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <PlusCircle className="h-6 w-6" />
            </Button>
            <NotificationDropdown />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#12121D] text-white">
                <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Saved</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="focus:bg-[#A05CF5]/10 focus:text-white">
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-screen-xl gap-8 px-4 py-6">
        {/* Main Content */}
        <main className="flex-1">
          {/* Stories */}
          <div className="mb-6 overflow-hidden rounded-xl bg-[#12121D] p-4">
            <ScrollArea className="whitespace-nowrap pb-2">
              <div className="flex gap-4">
                {/* Add Story */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-1 h-16 w-16">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#0A0A12]">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src="/placeholder.svg?height=56&width=56" alt="Your Story" />
                        <AvatarFallback>YS</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute bottom-0 right-0 rounded-full bg-[#A05CF5] p-1">
                      <PlusCircle className="h-4 w-4" />
                    </div>
                  </div>
                  <span className="text-xs">Your story</span>
                </div>

                {/* User Stories */}
                {stories.map((story) => (
                  <div key={story.username} className="flex flex-col items-center">
                    <div className="relative mb-1 h-16 w-16">
                      <div
                        className={`absolute inset-0 rounded-full ${story.hasUnread ? "bg-gradient-to-tr from-[#A05CF5] to-[#7B42F6] p-[2px]" : "bg-gray-700 p-[2px]"}`}
                      >
                        <div className="h-full w-full rounded-full bg-[#0A0A12] p-[2px]">
                          <Avatar className="h-full w-full">
                            <AvatarImage src={story.avatar} alt={story.username} />
                            <AvatarFallback>{story.username.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs">{story.username}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="sticky top-24 hidden h-fit w-80 flex-shrink-0 rounded-xl bg-[#12121D] p-4 lg:block">
          {/* User Profile */}
          <div className="mb-6 flex items-center gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src="/placeholder.svg?height=56&width=56" alt="Your Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">johndoe</p>
              <p className="text-sm text-gray-400">John Doe</p>
            </div>
            <Button variant="link" size="sm" className="ml-auto text-[#A05CF5]">
              Switch
            </Button>
          </div>

          {/* Suggestions */}
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-400">Suggestions For You</h3>
            <Button variant="link" size="sm" className="text-xs font-semibold text-white">
              See All
            </Button>
          </div>

          {/* Suggested Users */}
          <div className="space-y-3">
            {suggestedUsers.map((user) => (
              <div key={user.username} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-400">Suggested for you</p>
                  </div>
                </div>
                <Button variant="link" size="sm" className="text-xs font-semibold text-[#A05CF5]">
                  Follow
                </Button>
              </div>
            ))}
          </div>

          {/* Footer Links */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500">
              <Link href="#" className="hover:underline">
                About
              </Link>
              <span>•</span>
              <Link href="#" className="hover:underline">
                Help
              </Link>
              <span>•</span>
              <Link href="#" className="hover:underline">
                API
              </Link>
              <span>•</span>
              <Link href="#" className="hover:underline">
                Jobs
              </Link>
              <span>•</span>
              <Link href="#" className="hover:underline">
                Privacy
              </Link>
              <span>•</span>
              <Link href="#" className="hover:underline">
                Terms
              </Link>
            </div>
            <p className="text-xs text-gray-500">© 2023 DevConnect from Acme Inc.</p>
          </div>
        </aside>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around border-t border-gray-800 bg-[#0A0A12] md:hidden">
        <Button variant="ghost" size="icon">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Heart className="h-6 w-6" />
        </Button>
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-7 w-7">
              <AvatarImage src="/placeholder.svg?height=28&width=28" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </Link>
      </div>
    </div>
  )
}