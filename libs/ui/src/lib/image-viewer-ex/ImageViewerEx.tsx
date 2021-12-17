import React, { FC, useState, useEffect } from 'react'
import styles from './ImageViewerEx.module.less'
import cn from 'classnames'
import { Skeleton } from 'antd'
import { toCanvas } from 'html-to-image'
import { GlassMagnifier } from 'react-image-magnifiers'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch'

export interface ImageZoomPanPinchOption {
  positionX: number
  positionY: number
  scale: number
}

export type ImageViewerDatePos = 'left' | 'right' | 'top' | 'bottom' | 'none'

export interface ImageViewerExProps {
  date?: string
  datePos?: ImageViewerDatePos
  dragging?: boolean
  imageViewerExId: string
  width: number
  height: number
  src: string
  viewMagnifier?: boolean
  magnifierZoomInValue?: number
  scale: number
  positionX: number
  positionY: number
  onChangeImageOption: (option: ImageZoomPanPinchOption) => void
}

export const ImageViewerEx: FC<ImageViewerExProps> = ({
  dragging = false,
  imageViewerExId,
  width,
  height,
  src,
  scale,
  positionX,
  positionY,
  viewMagnifier,
  magnifierZoomInValue,
  date = '',
  datePos = 'none',
  onChangeImageOption,
}) => {
  const { t } = useTranslation('common')
  const viewerRef = React.createRef<ReactZoomPanPinchRef>()
  const [imageData, setImageData] = useState('')
  const [screenshot, setScreenshot] = useState('')
  const [largeScreenshot, setLargeScreenshot] = useState('')

  const datePosClasses = {
    left: styles.left,
    right: styles.right,
    bottom: styles.bottom,
    top: styles.top,
  }

  useEffect(() => {
    if (src !== '') {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.addEventListener('load', () => {
        const { width: imgWidth, height: imgHeight } = img
        if (imgWidth < width) {
          const scale = width / imgWidth
          if (viewerRef?.current)
            viewerRef.current.instance.setTransformState(
              scale,
              viewerRef?.current?.state?.positionX,
              viewerRef?.current?.state?.positionY
            )
        } else {
          if (viewerRef?.current)
            viewerRef.current.instance.setTransformState(
              1,
              viewerRef?.current?.state?.positionX,
              viewerRef?.current?.state?.positionY
            )
        }

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = imgWidth
        canvas.height = imgHeight
        ctx?.drawImage(
          img,
          0,
          0,
          imgWidth,
          imgHeight,
          0,
          0,
          imgWidth > width ? width : imgWidth,
          imgHeight > height ? (width * imgHeight) / imgWidth : imgHeight
        )
        setImageData(canvas.toDataURL())
      })
      img.addEventListener('error', () => {
        setImageData('')
      })
      img.src = src
    } else if (src === '') {
      setImageData('')
    }
  }, [src, imageData, width, height, viewerRef])

  useEffect(() => {
    if (viewMagnifier && magnifierZoomInValue) {
      if (document?.querySelector(`#image-viewer-ex-${imageViewerExId}`)) {
        toCanvas(
          document?.querySelector(
            `#image-viewer-ex-${imageViewerExId}`
          ) as HTMLElement
        ).then((_) => {
          toCanvas(
            document?.querySelector(
              `#image-viewer-ex-${imageViewerExId}`
            ) as HTMLElement
          ).then((canvas) => {
            const screenshotData = canvas.toDataURL()
            setScreenshot(screenshotData)
            // load large screenshot
            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.addEventListener('load', () => {
              const { width, height } = img
              const canvasLg = document.createElement('canvas')
              const ctxLg = canvasLg.getContext('2d')
              canvasLg.width = width * magnifierZoomInValue
              canvasLg.height = height * magnifierZoomInValue
              ctxLg?.drawImage(
                img,
                0,
                0,
                width * magnifierZoomInValue,
                height * magnifierZoomInValue
              )
              setLargeScreenshot(canvasLg.toDataURL())
            })
            img.addEventListener('error', () => {
              setLargeScreenshot('')
            })
            img.src = screenshotData
          })
        })
      }
    } else {
      setScreenshot('')
      setLargeScreenshot('')
    }
  }, [viewMagnifier, imageViewerExId, magnifierZoomInValue])

  const handleZoom = (ref, e) => {
    e.preventDefault()
    const { scale, positionX, positionY } = ref.state
    onChangeImageOption({
      scale,
      positionX: scale <= 1 ? 0 : positionX,
      positionY: scale <= 1 ? 0 : positionY,
    })
    if (scale === 1) {
      ref.instance.setTransformState(1, 0, 0)
    }
  }

  const handlePanning = (ref: ReactZoomPanPinchRef, e) => {
    e.preventDefault()
    const { scale, positionX, positionY } = ref.state
    onChangeImageOption({
      scale,
      positionX: scale <= 1 ? 0 : positionX,
      positionY: scale <= 1 ? 0 : positionY,
    })
    if (scale === 1) {
      ref.instance.setTransformState(1, 0, 0)
    }
  }

  return (
    <div
      className={styles.imageViewerExContainer}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {src && imageData && (!screenshot || !largeScreenshot) && (
        <div
          id={`image-viewer-ex-${imageViewerExId}`}
          className={styles.imageViewerEx}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <TransformWrapper
            ref={viewerRef}
            minScale={1}
            initialScale={scale}
            initialPositionX={positionX}
            initialPositionY={positionY}
            limitToBounds={false}
            panning={{ velocityDisabled: true }}
            onZoom={handleZoom}
            onPanning={handlePanning}
            disabled={viewMagnifier}
          >
            <TransformComponent
              wrapperStyle={{
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <img src={imageData} alt="single" />
            </TransformComponent>
          </TransformWrapper>
        </div>
      )}
      {src && screenshot && largeScreenshot && (
        <div
          className={styles.imageViewerEx}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <GlassMagnifier
            imageSrc={screenshot}
            largeImageSrc={largeScreenshot}
            magnifierSize={'200px'}
            square={true}
          />
        </div>
      )}
      {src && !imageData && (
        <div className={styles.loadingImage}>
          <Skeleton.Image />
        </div>
      )}
      {src && viewMagnifier && (!screenshot || !largeScreenshot) && (
        <div className={styles.preparingMagnifier} />
      )}
      {dragging && (
        <div
          className={styles.dragging}
          style={{
            backgroundColor: 'rgba(14, 9, 23, 0.6)',
          }}
        >
          <p
            style={{
              color: '#fafafa',
            }}
          >
            {t('ui.imageviewer.drophere')}
          </p>
          <p
            style={{
              color: '#fafafa',
            }}
          >
            {t('ui.imageviewer.draganddrop')}
          </p>
        </div>
      )}
      {!src && !dragging && !imageData && (
        <div className={styles.empty}>
          <p>{t('ui.imageviewer.empty')}</p>
          <p>{t('ui.imageviewer.draganddrop')}</p>
        </div>
      )}
      {src && imageData && date && datePos !== 'none' && (
        <div className={cn(styles.date, datePosClasses[datePos])}>
          <p>{moment(date).format('DD MMM')}</p>
          <p>{moment(date).format('DD/MM/YYYY')}</p>
        </div>
      )}
    </div>
  )
}

export default ImageViewerEx
