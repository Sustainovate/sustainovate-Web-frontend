"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Sarah Chen",
      username: "sarahcodes",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "liked your post",
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Alex Johnson",
      username: "alexdev",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "commented on your post",
    time: "15m ago",
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "Maya Patel",
      username: "mayatech",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "started following you",
    time: "1h ago",
    read: true,
  },
  {
    id: 4,
    type: "mention",
    user: {
      name: "James Lee",
      username: "jameslee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "mentioned you in a comment",
    time: "3h ago",
    read: true,
  },
]

export function NotificationDropdown() {
  const [unreadCount, setUnreadCount] = useState(2)
  const [isOpen, setIsOpen] = useState(false)
  const [notificationsList, setNotificationsList] = useState(notifications)

  const markAllAsRead = () => {
    setUnreadCount(0)
    setNotificationsList(
      notificationsList.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A05CF5] text-xs font-bold text-white"
            >
              {unreadCount}
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-[#12121D] text-white">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-[#A05CF5] hover:bg-[#A05CF5]/10"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {notificationsList.length > 0 ? (
            notificationsList.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex items-start gap-2 p-3 focus:bg-[#A05CF5]/10 focus:text-white ${
                  !notification.read ? "bg-[#A05CF5]/5" : ""
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{notification.user.name}</span> {notification.content}
                  </p>
                  <p className="text-xs text-gray-400">{notification.time}</p>
                </div>
                {!notification.read && <div className="h-2 w-2 rounded-full bg-[#A05CF5]"></div>}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">No notifications yet</div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem className="justify-center focus:bg-[#A05CF5]/10 focus:text-white">
          <Link href="/notifications" className="w-full text-center text-[#A05CF5]">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

