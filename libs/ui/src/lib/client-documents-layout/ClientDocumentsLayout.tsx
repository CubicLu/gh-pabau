import React, { FC, useRef } from 'react'
import { ClientDocuments, ClientDocumentsProps } from '@pabau/ui'
import styles from './ClientDocumentsLayout.module.less'
// import img1 from '../../assets/images/selection/botox/image_2.jpg'

export const ClientDocumentsLayout: FC<ClientDocumentsProps> = ({
  folderList = {
    folder: [],
    folderTitle: 'Folders',
    folderContent: [],
    id: 0,
  },
  folderDocuments = [],
  ...props
}) => {
  // const covid =
  //   'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf'
  // const html = 'https://crypto.stanford.edu/cs142/lectures/url.html'
  // const demopdf =
  //   'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/axf-document-info-1.pdf'
  // const report =
  //   'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/axf-document-info-1.pdf'

  // const folderList = {
  //   folder: [
  //     {
  //       id: '1',
  //       folderTitle: 'Ordinary',
  //       folderContent: [
  //         {
  //           id: '19',
  //           folderData: report,
  //           sharedWith: [
  //             { firstName: 'Alexis', lastName: 'Moor' },
  //             { firstName: 'William', lastName: 'Brandham' },
  //           ],
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '20',
  //           folderData: html,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '21',
  //           folderData: img1,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '22',
  //           folderData: covid,
  //           dateTime: '10.04.2021',
  //         },
  //       ],
  //       folder: [],
  //     },
  //     {
  //       id: '3',
  //       folderTitle: 'Two',
  //       folderContent: [
  //         {
  //           id: '19',
  //           folderData: covid,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '20',
  //           folderData: img1,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '21',
  //           folderData: html,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '22',
  //           folderData: report,
  //           sharedWith: [
  //             { firstName: 'Alexis', lastName: 'Moor' },
  //             { firstName: 'William', lastName: 'Brandham' },
  //           ],
  //           dateTime: '10.04.2021',
  //         },
  //       ],
  //       folder: [],
  //     },
  //     {
  //       id: '4',
  //       folderTitle: 'Three',
  //       folderContent: [
  //         {
  //           id: '19',
  //           folderData: demopdf,
  //           sharedWith: [
  //             { firstName: 'Alexis', lastName: 'Moor' },
  //             { firstName: 'William', lastName: 'Brandham' },
  //           ],
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '20',
  //           folderData: img1,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '21',
  //           folderData: report,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '22',
  //           folderData: html,
  //           dateTime: '10.04.2021',
  //         },
  //       ],
  //       folder: [],
  //     },
  //     {
  //       id: '5',
  //       folderTitle: 'Five',
  //       folderContent: [
  //         {
  //           id: '19',
  //           folderData: covid,
  //           sharedWith: [
  //             { firstName: 'Alexis', lastName: 'Moor' },
  //             { firstName: 'William', lastName: 'Brandham' },
  //           ],
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '20',
  //           folderData: html,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '21',
  //           folderData: report,
  //           dateTime: '10.04.2021',
  //         },
  //         {
  //           id: '22',
  //           folderData: img1,
  //           dateTime: '10.04.2021',
  //         },
  //       ],
  //       folder: [],
  //     },
  //   ],
  //   id: '10',
  //   folderContent: [
  //     {
  //       id: '91',
  //       folderData: report,
  //       dateTime: '10.04.2021',
  //     },
  //     {
  //       id: '90',
  //       folderData: html,
  //       dateTime: '10.04.2021',
  //     },
  //     {
  //       id: '93',
  //       folderData: img1,
  //       dateTime: '10.04.2021',
  //     },
  //     {
  //       id: '92',
  //       folderData: covid,
  //       dateTime: '10.04.2021',
  //     },
  //   ],
  //   folderTitle: 'Folders',
  // }

  return (
    <div className={styles.clientLayout}>
      <ClientDocuments
        folderList={folderList}
        folderDocuments={folderDocuments}
        {...props}
      />
    </div>
  )
}

export default ClientDocumentsLayout
