import { Sparkle } from "lucide-react";

import { cn } from "@/lib/utils";

export const AIIcon = ({ className }: { className: string }) => (
  <Sparkle
    className={cn(
      className,
      "rotate-[45deg] transform fill-black transition-all duration-300"
    )}
  />
);
