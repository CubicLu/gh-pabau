import React, { FC, useRef } from 'react'
import styles from './ClientDocumentsLayout.module.less'
import ClientDocuments from '../client-documents/ClientDocuments'
import img1 from '../../assets/images/selection/botox/image_2.jpg'

export interface ClientDocumentsLayoutProps {
  isEmpty?: boolean
}

export const ClientDocumentsLayout: FC<ClientDocumentsLayoutProps> = ({
  isEmpty,
}) => {
  const covid =
    'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf'
  const html = 'https://crypto.stanford.edu/cs142/lectures/url.html'
  const demopdf =
    'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/axf-document-info-1.pdf'
  const report =
    'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/axf-document-info-1.pdf'
  const ref = useRef<HTMLDivElement>(null)

  const folderList = {
    folder: [
      {
        id: '1',
        folderTitle: 'Ordinary',
        folderContent: [
          {
            id: '19',
            folderData: report,
            sharedWith: [
              { firstName: 'Alexis', lastName: 'Moor' },
              { firstName: 'William', lastName: 'Brandham' },
            ],
            dateTime: '10.04.2021',
          },
          {
            id: '20',
            folderData: html,
            dateTime: '10.04.2021',
          },
          {
            id: '21',
            folderData: img1,
            dateTime: '10.04.2021',
          },
          {
            id: '22',
            folderData: covid,
            dateTime: '10.04.2021',
          },
        ],
        folder: [
          {
            id: '2',
            folderTitle: 'Ordinary1',
            folderContent: [
              {
                id: '19',
                folderData: report,
                sharedWith: [
                  { firstName: 'Alexis', lastName: 'Moor' },
                  { firstName: 'William', lastName: 'Brandham' },
                ],
                dateTime: '10.04.2021',
              },
              {
                id: '20',
                folderData: img1,
                dateTime: '10.04.2021',
              },
              {
                id: '21',
                folderData: html,
                dateTime: '10.04.2021',
              },
              {
                id: '22',
                folderData: covid,
                dateTime: '10.04.2021',
              },
            ],
            folder: [],
          },
        ],
      },
      {
        id: '3',
        folderTitle: 'Two',
        folderContent: [
          {
            id: '19',
            folderData: covid,
            dateTime: '10.04.2021',
          },
          {
            id: '20',
            folderData: img1,
            dateTime: '10.04.2021',
          },
          {
            id: '21',
            folderData: html,
            dateTime: '10.04.2021',
          },
          {
            id: '22',
            folderData: report,
            sharedWith: [
              { firstName: 'Alexis', lastName: 'Moor' },
              { firstName: 'William', lastName: 'Brandham' },
            ],
            dateTime: '10.04.2021',
          },
        ],
        folder: [],
      },
      {
        id: '4',
        folderTitle: 'Three',
        folderContent: [
          {
            id: '19',
            folderData: demopdf,
            sharedWith: [
              { firstName: 'Alexis', lastName: 'Moor' },
              { firstName: 'William', lastName: 'Brandham' },
            ],
            dateTime: '10.04.2021',
          },
          {
            id: '20',
            folderData: img1,
            dateTime: '10.04.2021',
          },
          {
            id: '21',
            folderData: report,
            dateTime: '10.04.2021',
          },
          {
            id: '22',
            folderData: html,
            dateTime: '10.04.2021',
          },
        ],
        folder: [],
      },
      {
        id: '5',
        folderTitle: 'Five',
        folderContent: [
          {
            id: '19',
            folderData: covid,
            sharedWith: [
              { firstName: 'Alexis', lastName: 'Moor' },
              { firstName: 'William', lastName: 'Brandham' },
            ],
            dateTime: '10.04.2021',
          },
          {
            id: '20',
            folderData: html,
            dateTime: '10.04.2021',
          },
          {
            id: '21',
            folderData: report,
            dateTime: '10.04.2021',
          },
          {
            id: '22',
            folderData: img1,
            dateTime: '10.04.2021',
          },
        ],
        folder: [],
      },
    ],
    id: '10',
    folderContent: [
      {
        id: '91',
        folderData: report,
        dateTime: '10.04.2021',
      },
      {
        id: '90',
        folderData: html,
        dateTime: '10.04.2021',
      },
      {
        id: '93',
        folderData: img1,
        dateTime: '10.04.2021',
      },
      {
        id: '92',
        folderData: covid,
        dateTime: '10.04.2021',
      },
    ],
    folderTitle: 'Folders',
  }

  return (
    <div className={styles.clientLayout} ref={ref}>
      <ClientDocuments folderList={folderList} />
    </div>
  )
}

export default ClientDocumentsLayout
