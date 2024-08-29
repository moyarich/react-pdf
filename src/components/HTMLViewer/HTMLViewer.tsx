import { StatusIndicator } from '@cloudscape-design/components'

import { MDXComponents, useMarkdownCompiler } from '../Markdown/useMarkdownCompiler'
import { getMarkdownComponents } from '../Markdown/getMarkdownComponents'

const customComponents = {
  ...getMarkdownComponents(),
}
export interface IHTMLViewerProps {
  htmlData: string | null
}

export function HTMLViewer({ htmlData }: IHTMLViewerProps) {
  const { MarkdownReactNode } = useMarkdownCompiler({
    content: htmlData as string,
    components: customComponents as MDXComponents,
  })

  return (
    <div className="overflow-auto h-full w-full">
      {htmlData ? (
        <div>{MarkdownReactNode ? MarkdownReactNode : null}</div> || 'Loading...'
      ) : (
        <div className="flex justify-center align-center min-h-[200px]">
          <div className="h-11 m-auto">
            <StatusIndicator type="loading"> Loading </StatusIndicator>
          </div>
        </div>
      )}
    </div>
  )
}
