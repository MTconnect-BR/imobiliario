import * as React from "react"
import { cn } from "@/lib/utils"

function h1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "font-medium tracking-[-0.06em] leading-[0.95]",
        "text-[clamp(2.25rem,1.5rem+3.75vw,4rem)]",
        className
      )}
      {...props}
    />
  )
}

function h2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "font-medium tracking-[-0.06em] leading-[1.15]",
        "text-[clamp(1.875rem,1.25rem+3.125vw,3.25rem)]",
        className
      )}
      {...props}
    />
  )
}

function h3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-medium tracking-[-0.06em] leading-[0.95]",
        "text-[clamp(1.5rem,1.125rem+1.875vw,2.5rem)]",
        className
      )}
      {...props}
    />
  )
}

function h4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        "font-medium tracking-[-0.06em] leading-[0.95]",
        "text-[clamp(1.25rem,1rem+1.25vw,2rem)]",
        className
      )}
      {...props}
    />
  )
}

function h5({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        "font-medium tracking-[-0.06em] leading-[1.2]",
        "text-[clamp(1.125rem,0.9375rem+0.9375vw,1.625rem)]",
        className
      )}
      {...props}
    />
  )
}

function h6({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      className={cn(
        "font-medium tracking-[-0.06em] leading-[1.2]",
        "text-[clamp(1rem,0.875rem+0.625vw,1.375rem)]",
        className
      )}
      {...props}
    />
  )
}

function p({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-medium tracking-[-0.04em] leading-[1.25]",
        "text-[clamp(1rem,0.9783rem+0.1087vw,1.0625rem)]",
        "[&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  )
}

function lead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-medium tracking-[-0.04em] leading-[1.25]",
        "text-[clamp(1.1563rem,1.1454rem+0.0543vw,1.1875rem)]",
        "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function large({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "font-medium tracking-[-0.04em] leading-[1.25]",
        "text-[clamp(1.1563rem,1.1454rem+0.0543vw,1.1875rem)]",
        className
      )}
      {...props}
    />
  )
}

function small({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "font-medium tracking-[-0.04em] leading-[1.25]",
        "text-[clamp(0.75rem,0.7065rem+0.2174vw,0.875rem)]",
        className
      )}
      {...props}
    />
  )
}

function muted({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "font-medium tracking-[-0.04em] leading-[1.25]",
        "text-[clamp(0.75rem,0.7065rem+0.2174vw,0.875rem)]",
        "text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function blockquote({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic",
        "font-medium tracking-[-0.04em] leading-[1.25]",
        "text-[clamp(1.1563rem,1.1454rem+0.0543vw,1.1875rem)]",
        className
      )}
      {...props}
    />
  )
}

function inlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "relative rounded-[10px] bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
}

function list({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "my-6 ml-6 list-disc [&>li]:mt-2",
        "font-medium tracking-[-0.04em] leading-[1.25]",
        "text-[clamp(1rem,0.9783rem+0.1087vw,1.0625rem)]",
        className
      )}
      {...props}
    />
  )
}

function table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn(
          "w-full caption-bottom text-sm [&_tr]:border-b",
          className
        )}
        {...props}
      />
    </div>
  )
}

function tableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function tableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
}

function tableFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function tableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function tableHead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function tableCell({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function tableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function hr({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn("my-8 border-t", className)}
      {...props}
    />
  )
}

export const Typography = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  lead,
  large,
  small,
  muted,
  blockquote,
  inlineCode,
  list,
  table,
  tableHeader,
  tableBody,
  tableFooter,
  tableRow,
  tableHead,
  tableCell,
  tableCaption,
  hr,
}
