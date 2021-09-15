import React, { FC, useState, useEffect } from 'react'
import cn from 'classnames'
import { GlassMagnifier } from 'react-image-magnifiers'
import moment from 'moment'
import { ZoomInMode } from '@pabau/ui'
import { useTranslation } from 'react-i18next'
import styles from './ImageViewer.module.less'

export interface SideBySideImageViewerProps {
  imageSrc: string
  zoomInMode: ZoomInMode
  date?: string
  datePos: 'left' | 'right' | 'top' | 'bottom' | 'none' | string
  dragging?: boolean
  width: number
  height: number
  drawStartPos: {
    x: number
    y: number
  }
  rate: {
    x: number
    y: number
  }
}

export const SideBySideImageViewer: FC<SideBySideImageViewerProps> = ({
  imageSrc = '',
  dragging,
  date = '',
  datePos = 'none',
  zoomInMode,
  width,
  height,
  drawStartPos,
  rate,
}) => {
  const { t } = useTranslation('common')
  const [imgUrl, setImgUrl] = useState('')
  const [originImage, setOriginImage] = useState('')
  const [lgImage, setLgImage] = useState('')
  const datePosClasses = {
    left: styles.left,
    right: styles.right,
    bottom: styles.bottom,
    top: styles.top,
  }

  useEffect(() => {
    if (imageSrc !== '' && width > 0 && height > 0) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.addEventListener('load', () => {
        const { width: sWidth, height: sHeight } = img
        const canvasLg = document.createElement('canvas')
        const ctxLg = canvasLg.getContext('2d')
        canvasLg.width = width * zoomInMode
        canvasLg.height = height * zoomInMode
        ctxLg?.drawImage(
          img,
          sWidth * drawStartPos.x,
          sHeight * drawStartPos.y,
          sWidth * rate.x,
          sHeight * rate.y,
          0,
          0,
          width * zoomInMode,
          width * ((sHeight * rate.y) / (sWidth * rate.x)) * zoomInMode
        )
        setLgImage(canvasLg.toDataURL())
      })
      img.addEventListener('error', () => {
        setLgImage('')
      })
      img.src = imageSrc
    } else {
      setLgImage('')
    }
  }, [zoomInMode, imageSrc, width, height, rate, drawStartPos])

  useEffect(() => {
    if (imageSrc === '') {
      setOriginImage('')
    } else if (
      imageSrc !== '' &&
      imgUrl !== imageSrc &&
      width > 0 &&
      height > 0
    ) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.addEventListener('load', () => {
        //draw origin image
        const { width: sWidth, height: sHeight } = img
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = width
        canvas.height = height
        ctx?.drawImage(
          img,
          sWidth * drawStartPos.x,
          sHeight * drawStartPos.y,
          sWidth * rate.x,
          sHeight * rate.y,
          0,
          0,
          width,
          width * ((sHeight * rate.y) / (sWidth * rate.x))
        )
        setOriginImage(canvas.toDataURL())
      })
      img.addEventListener('error', () => {
        setOriginImage('')
      })
      img.src = imageSrc
      setImgUrl(imageSrc)
    }
  }, [imageSrc, width, height, drawStartPos, rate, imgUrl])

  return (
    <div
      className={styles.imageViewerItemContainer}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {dragging && (
        <div
          className={styles.dragging}
          style={{
            backgroundColor: imageSrc
              ? 'rgba(14, 9, 23, 0.6)'
              : 'rgba(#EEF7FB, 0.6)',
          }}
        >
          <p
            style={{
              color: imageSrc ? '#fff' : 'var(--grey-text-color)',
            }}
          >
            {t('ui.imageviewer.drophere')}
          </p>
          <p
            style={{
              color: imageSrc ? '#fff' : 'var(--light-grey-color)',
            }}
          >
            {t('ui.imageviewer.draganddrop')}
          </p>
        </div>
      )}
      {originImage && lgImage && (
        <div className={styles.glassMagnifierContainer}>
          <GlassMagnifier
            imageSrc={originImage}
            largeImageSrc={lgImage}
            magnifierSize={zoomInMode !== ZoomInMode.zoomInNone ? '200px' : '0'}
            square={true}
          />
        </div>
      )}
      {!dragging && !imageSrc && (
        <div className={styles.empty}>
          <p>{t('ui.imageviewer.empty')}</p>
          <p>{t('ui.imageviewer.draganddrop')}</p>
        </div>
      )}
      {imageSrc && date && datePos !== 'none' && (
        <div className={cn(styles.date, datePosClasses[datePos])}>
          <p>{moment(date).format('DD MMM')}</p>
          <p>{moment(date).format('DD/MM/YYYY')}</p>
        </div>
      )}
    </div>
  )
}
