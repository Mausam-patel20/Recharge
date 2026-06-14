"use client"

import React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl bg-card border border-border p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)

Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
)

CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = "", children, ...props }, ref) => (
    <h3 ref={ref} className={`text-lg font-semibold text-foreground ${className}`} {...props}>
      {children}
    </h3>
  )
)

CardTitle.displayName = "CardTitle"

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </div>
  )
)

CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`${className}`} {...props}>
      {children}
    </div>
  )
)

CardContent.displayName = "CardContent"

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`mt-4 pt-4 border-t border-border ${className}`} {...props}>
      {children}
    </div>
  )
)

CardFooter.displayName = "CardFooter"
