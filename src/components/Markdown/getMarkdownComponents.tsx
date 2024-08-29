/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/common/utils'
import React from 'react'

interface BasicProps {
  children: JSX.Element | JSX.Element[]
}

type MakeHeadingProps = {
  tag: string
  children: React.ReactNode
}

export const MakeHeading: React.FC<MakeHeadingProps> = ({ tag, children }) => {
  const HeadingComponent: React.FC<{ children: React.ReactNode }> = props =>
    React.createElement(tag, { className: 'text-xl font-bold' }, props.children)
  return <HeadingComponent>{children}</HeadingComponent>
}

type ListComponentProps = {
  children: React.ReactNode
  type: 'ordered' | 'unordered'
}

export const ListComponent: React.FC<ListComponentProps> = ({ children, type }) => (
  <ul className={type === 'ordered' ? 'list-decimal' : 'list-disc'}>{children}</ul>
)

type ListItemComponentProps = {
  children: React.ReactNode
}

export const ListItemComponent: React.FC<ListItemComponentProps> = ({ children }) => (
  <li className="list-inside">{children}</li>
)

type LinkComponentProps = {
  href: string
  children: React.ReactNode
}

export const LinkComponent: React.FC<LinkComponentProps> = ({ href, children }) => (
  <a href={href} className="text-blue-500 hover:underline">
    {children}
  </a>
)

export const TextComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="paragraph mb-4">{children}</p>
)

export const DelComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="line-through">{children}</span>
)

export const EmComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <em className="italic">{children}</em>
)

export const StrongComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong className="font-bold">{children}</strong>
)
export const BlockquoteComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <blockquote className="text-xl">
    <svg
      className="w-8 h-8 text-muted mb-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 14"
    >
      <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
    </svg>
    <p className=" border-l-4 border-muted bg-muted/[0.24] mb-1 pl-3 ">{children}</p>
  </blockquote>
)

export const TableComponent: React.ElementType = (data: BasicProps) => (
  <div className="w-full overflow-auto">
    <table>{data.children}</table>
  </div>
)

export const ParagraphComponent: React.ElementType = (data: BasicProps) => {
  const isOneChild = data.children && Array.isArray(data.children) && data.children.length === 1
  if (!data.children) return null
  return <p className={cn({ 'min-h-6': isOneChild }, 'first:mt-0 last:mb-0 mb-4')}>{data.children}</p>
}

export const getMarkdownComponents = () => {
  return {
    a: LinkComponent,
    p: ParagraphComponent, //TextComponent,
    del: DelComponent,
    em: EmComponent,
    strong: StrongComponent,
    b: StrongComponent,
    h1: (props: { children: React.ReactNode }) => <MakeHeading tag="h1" {...props} />,
    h2: (props: { children: React.ReactNode }) => <MakeHeading tag="h2" {...props} />,
    h3: (props: { children: React.ReactNode }) => <MakeHeading tag="h3" {...props} />,
    h4: (props: { children: React.ReactNode }) => <MakeHeading tag="h4" {...props} />,
    h5: (props: { children: React.ReactNode }) => <MakeHeading tag="h5" {...props} />,
    h6: (props: { children: React.ReactNode }) => <MakeHeading tag="h6" {...props} />,
    ol: (props: { children: React.ReactNode }) => <ListComponent type="ordered" {...props} />,
    ul: (props: { children: React.ReactNode }) => <ListComponent type="unordered" {...props} />,
    li: ListItemComponent,
    blockquote: BlockquoteComponent,
    table: TableComponent,
  }
}
