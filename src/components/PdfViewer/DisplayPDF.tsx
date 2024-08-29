import { FC, useEffect, useRef, useState } from 'react'

import { Pagination, PaginationProps } from '@cloudscape-design/components'

import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import SpaceBetween from '@cloudscape-design/components/space-between'
import StatusIndicator from '@cloudscape-design/components/status-indicator'

import { ZoomIn, ZoomOut } from 'lucide-react'
import { cn, getSignedUrl } from '@/common/utils'
import Status from '@/components/StatusIndicator'

export interface IDisplayPDFProps {
  fileUrl: string
  displayAllPages: boolean
  showZoomButtons: boolean
  onLoadSuccess?: () => void
  currentPage?: number
  className?: string
}

export const DisplayPDF: FC<IDisplayPDFProps> = ({
  fileUrl,
  displayAllPages = false,
  showZoomButtons = false,
  currentPage = 1,
  onLoadSuccess,
  className,
}) => {
  const [pdfLoaded, setPdfLoaded] = useState(false)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(currentPage)
  const [signedFileUrl, setSignedFileUrl] = useState('')
  const [scale, setScale] = useState(5)
  const maxScale = 12
  const minScale = 0.5
  const growScaleBy = 0.3

  const scrollToPage = (page: number) => {
    setPageNumber(page)
    document.getElementById(`page_${page}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    if (pdfLoaded && currentPage) {
      setTimeout(() => scrollToPage(currentPage), 100)
    }
  }, [pdfLoaded, currentPage])

  const paginationProps: PaginationProps = {
    currentPageIndex: pageNumber,
    onChange: event => scrollToPage(event.detail?.currentPageIndex),
    pagesCount: numPages,
  }

  const handleScaleChange = (newScale: number) => {
    setScale(Math.min(Math.max(newScale, minScale), maxScale))
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
    setPdfLoaded(true)
    onLoadSuccess && onLoadSuccess()
  }

  const onItemClick = ({ pageNumber: itemPageNumber }: { pageNumber: number }) => {
    setPageNumber(itemPageNumber)
  }

  const documentContainerRef = useRef<HTMLDivElement | null>(null)
  const [observer, setObserver] = useState<IntersectionObserver | null>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNumber(parseInt(entries[0].target.id.split('_')[1]))
      }
    }, options)
    setObserver(observer)
  }, [])

  useEffect(() => {
    if (observer && pdfLoaded) {
      const targets = Array.from(document.getElementsByClassName('.item-to-observe'))
      targets.forEach(target => observer!.observe(target as Element))

      return () => {
        targets.forEach(target => observer!.unobserve(target as Element))
      }
    }
  }, [observer, pdfLoaded])

  useEffect(() => {
    const getFileUrl = async () => {
      setSignedFileUrl(await getSignedUrl(fileUrl))
    }
    getFileUrl()
  }, [fileUrl])

  return (
    <div className="flex flex-col h-full w-full">
      {(showZoomButtons || displayAllPages) && (
        <div className="display-flex pb-2">
          {showZoomButtons && (
            <div className="flex">
              <button
                disabled={scale === maxScale}
                onClick={() => {
                  handleScaleChange(scale + growScaleBy)
                }}
                className="enabled:text-[#0972D3] disabled:text-gray-400 p-0.5 rounded-lg transition-colors"
              >
                <ZoomIn />
              </button>
              <button
                disabled={scale === minScale}
                onClick={() => {
                  handleScaleChange(scale - growScaleBy)
                }}
                className="enabled:text-[#0972D3] disabled:text-gray-400 p-0.5 rounded-lg transition-colors"
              >
                <ZoomOut />
              </button>
            </div>
          )}
          {displayAllPages && <Pagination {...paginationProps} />}
        </div>
      )}
      <div className="flex-1 overflow-auto w-full .document_container">
        {signedFileUrl ? (
          <Document
            className={cn('overflow-hidden rounded-br-[15px] rounded-bl-[15px] w-full', className)}
            file={signedFileUrl}
            onItemClick={onItemClick}
            loading={
              <SpaceBetween size="m" alignItems="center">
                <div className="pb-4">
                  <StatusIndicator type="loading">Loading</StatusIndicator>
                </div>
              </SpaceBetween>
            }
            noData={
              <SpaceBetween size="m" alignItems="center">
                <StatusIndicator type="loading">
                  <div className="pb-4">No PDF file specified.</div>
                </StatusIndicator>
              </SpaceBetween>
            }
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <div ref={documentContainerRef}>
              {displayAllPages ? (
                Array.from(new Array(numPages), (_el, index) => {
                  const pageIndex = index + 1
                  return (
                    <div
                      key={`page_wrapper${pageIndex}`}
                      id={`page_${pageIndex}`}
                      data-page-index={pageIndex}
                      className=".item-to-observe"
                    >
                      <Page
                        key={`page_${pageIndex}`}
                        scale={scale}
                        className="mb-4 mt-2 w-full bg-white border"
                        pageNumber={pageIndex}
                      />
                    </div>
                  )
                })
              ) : (
                <Page key={`page_${pageNumber}`} pageNumber={pageNumber} className="w-full" scale={scale} />
              )}
            </div>
          </Document>
        ) : (
          <div className="block text-center mt-[70px]">
            <Status status="Loading" />
          </div>
        )}
      </div>
    </div>
  )
}
