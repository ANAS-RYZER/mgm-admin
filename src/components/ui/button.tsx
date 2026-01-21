import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#4B122C] via-[#310A1C] to-[#1E0711] text-primary-foreground shadow-[0_18px_40px_-20px_rgba(26,7,17,0.65)] hover:from-[#5A1638] hover:via-[#3A0D24] hover:to-[#230813]",
        primary:
          "bg-gradient-to-r from-[#4B122C] via-[#310A1C] to-[#1E0711] text-primary-foreground shadow-[0_18px_40px_-20px_rgba(26,7,17,0.65)] hover:from-[#5A1638] hover:via-[#3A0D24] hover:to-[#230813]",
        gold:
          "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-primary shadow-gold hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background/80 backdrop-blur-md text-foreground hover:bg-background",
        ghost: "hover:bg-muted hover:text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, size, asChild = false, ...rest } = props;
  const Comp = asChild ? Slot : "button";

  return (
    <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...rest} />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
