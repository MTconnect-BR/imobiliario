import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] text-sm font-medium whitespace-nowrap transition-all duration-[0.4s] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.05]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 hover:scale-[1.05]",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 hover:scale-[1.05]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-[1.05]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        green:
          "bg-[#8ed462] text-[#2c2e2a] hover:bg-[#368d32] hover:text-white hover:scale-[1.05]",
        yellow:
          "bg-[#f5e211] text-[#2c2e2a] hover:bg-[#f9d314] hover:scale-[1.05]",
        red:
          "bg-[#ff705d] text-white hover:bg-[#ff5c46] hover:scale-[1.05]",
        blue:
          "bg-[#2ba0ff] text-white hover:bg-[#2093ff] hover:scale-[1.05]",
        pink:
          "bg-[#ebc1ff] text-[#2c2e2a] hover:bg-[#f4acff] hover:scale-[1.05]",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-[10px] px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-[10px] px-6 has-[>svg]:px-4 text-base",
        xl: "h-[60px] rounded-[10px] px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
        "icon-xs": "size-6 rounded-[10px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
