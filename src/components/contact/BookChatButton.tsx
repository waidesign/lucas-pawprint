"use client";

import { Calendar } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { emitLoaffyEvent } from "@/components/mascot/LoaffyBus";
import { Button } from "@/components/ui/Button";

export interface BookChatButtonProps {
  href: string;
}

export function BookChatButton({ href }: BookChatButtonProps) {
  return (
    <Button
      variant="secondary"
      tone="mint"
      size="md"
      href={href}
      external
      iconStart={<Calendar className="h-5 w-5" />}
      onClick={() => {
        trackEvent("book_chat_click", { location: "contact_page" });
        emitLoaffyEvent("book-chat-click");
      }}
    >
      Book a 30-min chat
    </Button>
  );
}
