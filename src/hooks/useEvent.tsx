"use client";

import { useState } from "react";

type UseEventProps = {
  id: string;
  registrationUsers: string[];
  currentUserId: string;
};

export function useEvent({ id, registrationUsers, currentUserId }: UseEventProps) {
  const [users, setUsers] = useState<string[]>(registrationUsers);

  const isJoined = users.includes(currentUserId);
  const count = users.length;

  const toggleJoin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}/register`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) throw new Error("Failed to register/unregister");

      const data = await res.json();

      // Update local state from server response
      setUsers(data.data.registrationUsers || []);
    } catch (err) {
      console.error(err);
    }
  };

  return { isJoined, toggleJoin, count };
}
