import { FC } from 'react'

import { Modal } from '@cloudscape-design/components'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import useWindowHeight from '../../common/hooks/useWindowHeight'

import { DisplayPDF, IDisplayPDFProps } from './DisplayPDF'

export interface IPDFModalProps extends IDisplayPDFProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const PDFModal: FC<IPDFModalProps> = ({ visible, setVisible, ...pDFModalProps }) => {
  const windowHeight = useWindowHeight()

  return (
    <Modal onDismiss={() => setVisible(false)} visible={visible} header={`Document`} size={'max'}>
      <div
        style={{
          height: `${windowHeight - 150}px`,
          overflow: 'hidden',
        }}
      >
        <DisplayPDF {...pDFModalProps} showZoomButtons={false} />
      </div>
    </Modal>
  )
}
