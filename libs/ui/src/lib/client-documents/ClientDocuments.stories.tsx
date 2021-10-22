import React, { FC } from 'react'
import ClientDocuments, { ClientDocumentsProps } from './ClientDocuments'
import img1 from '../../assets/images/selection/botox/image_1.jpg'
import img3 from '../../assets/images/selection/botox/image_1.jpg'
import img4 from '../../assets/images/selection/botox/image_1.jpg'
import img5 from '../../assets/images/selection/botox/image_1.jpg'

export default {
  component: ClientDocuments,
  title: 'ClientDocuments',
  args: {
    folderList: {
      folder: [
        {
          id: '1',
          folderTitle: 'Ordinary',
          folderContent: [
            {
              id: '19',
              folderData: img4,
              sharedWith: [
                { firstName: 'Alexis', lastName: 'Moor' },
                { firstName: 'William', lastName: 'Brandham' },
              ],
              dateTime: '10-04-2021',
            },
            {
              id: '20',
              folderData: img1,
              dateTime: '10-04-2021',
            },
            {
              id: '21',
              folderData: img3,
              dateTime: '10-04-2021',
            },
            {
              id: '22',
              folderData: img5,
              dateTime: '10-04-2021',
            },
          ],
          folder: [
            {
              id: '2',
              folderTitle: 'Ordinary1',
              folderContent: [
                {
                  id: '19',
                  folderData: img4,
                  sharedWith: [
                    { firstName: 'Alexis', lastName: 'Moor' },
                    { firstName: 'William', lastName: 'Brandham' },
                  ],
                  dateTime: '10-04-2021',
                },
                {
                  id: '20',
                  folderData: img1,
                  dateTime: '10-04-2021',
                },
                {
                  id: '21',
                  folderData: img3,
                  dateTime: '10-04-2021',
                },
                {
                  id: '22',
                  folderData: img5,
                  dateTime: '10-04-2021',
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
              folderData: img4,
              sharedWith: [
                { firstName: 'Alexis', lastName: 'Moor' },
                { firstName: 'William', lastName: 'Brandham' },
              ],
              dateTime: '10-04-2021',
            },
            {
              id: '20',
              folderData: img1,
              dateTime: '10-04-2021',
            },
            {
              id: '21',
              folderData: img3,
              dateTime: '10-04-2021',
            },
            {
              id: '22',
              folderData: img5,
              dateTime: '10-04-2021',
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
              folderData: img4,
              sharedWith: [
                { firstName: 'Alexis', lastName: 'Moor' },
                { firstName: 'William', lastName: 'Brandham' },
              ],
              dateTime: '10-04-2021',
            },
            {
              id: '20',
              folderData: img1,
              dateTime: '10-04-2021',
            },
            {
              id: '21',
              folderData: img3,
              dateTime: '10-04-2021',
            },
            {
              id: '22',
              folderData: img5,
              dateTime: '10-04-2021',
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
              folderData: img4,
              sharedWith: [
                { firstName: 'Alexis', lastName: 'Moor' },
                { firstName: 'William', lastName: 'Brandham' },
              ],
              dateTime: '10-04-2021',
            },
            {
              id: '20',
              folderData: img1,
              dateTime: '10-04-2021',
            },
            {
              id: '21',
              folderData: img3,
              dateTime: '10-04-2021',
            },
            {
              id: '22',
              folderData: img5,
              dateTime: '10-04-2021',
            },
          ],
          folder: [],
        },
      ],
    },
  },
}

export const ClientDocumentStory: FC<ClientDocumentsProps> = ({
  folderList,
}) => {
  return <ClientDocuments folderList={folderList} />
}
