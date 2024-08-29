import { FC } from 'react'

import { Modal } from '@cloudscape-design/components'

import useWindowHeight from '../../common/hooks/useWindowHeight'

import { HTMLViewer, IHTMLViewerProps } from './HTMLViewer'

export interface IHTMLModalProps extends IHTMLViewerProps {
  title: string
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const HTMLModal: FC<IHTMLModalProps> = ({ visible, setVisible, title, ...HTMLModalProps }) => {
  const windowHeight = useWindowHeight()

  return (
    <Modal
      onDismiss={() => {
        setVisible(false)
      }}
      visible={visible}
      header={`${title ?? ''}`}
      size={'max'}
    >
      <div
        style={{
          height: `${windowHeight - 150}px`,
          overflow: 'hidden',
        }}
      >
        <HTMLViewer {...HTMLModalProps} />
      </div>
    </Modal>
  )
}
