import { useEffect, useState, useCallback } from 'react'
import { useMDXComponents, MDXProvider } from '@mdx-js/react'
export type MDXComponents = Parameters<typeof MDXProvider>[0]['components']

import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import type { Components } from 'react-markdown'

import { formatText } from '@/components/Markdown/formatText'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export interface IUseMarkdownCompilerProps {
  content: string
  components?: MDXComponents
}

export const useMarkdownCompiler = ({ content, components = {} }: IUseMarkdownCompilerProps) => {
  const mdxComponents = useMDXComponents()
  const [MarkdownReactNode, setMarkdownReactNode] = useState<JSX.Element | null>(null)
  const [error, setError] = useState<string | null>(null)

  const parseContent = useCallback(async () => {
    const allComponents = { ...mdxComponents, ...components }

    try {
      setMarkdownReactNode(
        <ReactMarkdown
          children={formatText(content)}
          remarkPlugins={[remarkBreaks, remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{ ...(allComponents as Components) }}
        />
      )
    } catch (err) {
      console.error('MarkdownError', err)
      setError('An Error Occurred')
    }
  }, [components, mdxComponents, content])

  useEffect(() => {
    if (!MarkdownReactNode) {
      parseContent()
    }
  }, [MarkdownReactNode, parseContent])

  return { MarkdownReactNode, error }
}
