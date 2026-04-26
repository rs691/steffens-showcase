"use client";

import { ChatWidget } from "@/components/ChatWidget";
import { usePathname } from "next/navigation";

export default function GlobalChatWidget() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <ChatWidget />;
}
