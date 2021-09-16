import React, { FC } from 'react'
import styles from './ClientPhotosLayout.module.less'
import { AlbumProps, GalleryView } from '../gallery-view/GalleryView'
import backMassage from '../../assets/images/gallery-album/image1.jpg'
import backPlain from '../../assets/images/gallery-album/image2.jpg'
import sholder from '../../assets/images/gallery-album/image3.png'
import eyeDark from '../../assets/images/gallery-album/image4.png'
import handsMassage from '../../assets/images/gallery-album/image5.jpg'
import necked from '../../assets/images/gallery-album/image6.jpg'
import backMassage2 from '../../assets/images/gallery-album/image8.jpg'
import back from '../../assets/images/gallery-album/image9.jpg'
import face from '../../assets/images/gallery-album/image11.jpg'
import facial from '../../assets/images/gallery-album/image12.jpg'
import backs from '../../assets/images/gallery-album/image10.jpg'

export interface ClientPhotosLayoutProps {
  isEmpty?: boolean
}

export const ClientPhotosLayout: FC<ClientPhotosLayoutProps> = ({
  isEmpty,
}) => {
  const images = [
    backMassage,
    backPlain,
    sholder,
    eyeDark,
    handsMassage,
    // necked,
    // backMassage2,
    // back,
    // backs,
    // face,
    // facial,
  ]

  const albumList = {
    album: [
      {
        id: '1',
        albumTitle: 'Ordinary',
        albumImage: [backPlain, eyeDark, necked, backMassage],
        album: [
          {
            id: '2',
            albumTitle: 'Ordinary1',
            albumImage: [
              backPlain,
              eyeDark,
              necked,
              face,
              facial,
              backs,
              handsMassage,
              face,
            ],
            album: [
              {
                id: '4',
                albumTitle: 'Ordinary12',
                albumImage: [backMassage, backPlain, back, backMassage2, backs],
                album: [],
              },
            ],
          },
          {
            id: '5',
            albumTitle: 'Ordinary2',
            albumImage: [
              sholder,
              handsMassage,
              backMassage2,
              backs,
              backMassage,
              backPlain,
              back,
              eyeDark,
            ],
            album: [
              {
                id: '6',
                albumTitle: 'Ordinary21',
                albumImage: [
                  handsMassage,
                  sholder,
                  backMassage2,
                  backs,
                  backMassage,
                  backPlain,
                  back,
                  eyeDark,
                ],
                album: [],
              },
              {
                id: '7',
                albumTitle: 'Ordinary22',
                albumImage: [
                  backMassage,
                  backPlain,
                  back,
                  eyeDark,
                  handsMassage,
                  sholder,
                  backMassage2,
                  backs,
                ],
                album: [],
              },
            ],
          },
          {
            id: '8',
            albumTitle: 'Ordinary3',
            albumImage: [
              face,
              facial,
              backs,
              eyeDark,
              handsMassage,
              sholder,
              backMassage2,
            ],
            album: [],
          },
          {
            id: '9',
            albumTitle: 'Ordinary4',
            albumImage: [
              handsMassage,
              sholder,
              backMassage2,
              backs,
              backMassage,
              backPlain,
              back,
              eyeDark,
            ],
            album: [
              {
                id: '10',
                albumTitle: 'Ordinary41',
                albumImage: [
                  backMassage,
                  backPlain,
                  handsMassage,
                  backMassage2,
                  eyeDark,
                  back,
                  eyeDark,
                ],
                album: [],
              },
              {
                id: '11',
                albumTitle: 'Ordinary42',
                albumImage: [
                  sholder,
                  backMassage2,
                  backs,
                  backMassage,
                  backPlain,
                  back,
                  eyeDark,
                ],
                album: [],
              },
            ],
          },
        ],
      },
      {
        id: '2',
        albumTitle: 'Two',
        albumImage: [
          sholder,
          handsMassage,
          backMassage2,
          backs,
          backMassage,
          backPlain,
          back,
          eyeDark,
        ],
        album: [],
      },
      {
        id: '3',
        albumTitle: 'Three',
        albumImage: [
          backPlain,
          eyeDark,
          necked,
          face,
          facial,
          backs,
          handsMassage,
        ],
        album: [],
      },
      {
        id: '4',
        albumTitle: 'Four',
        albumImage: [
          face,
          sholder,
          necked,
          backMassage2,
          backPlain,
          eyeDark,
          necked,
          facial,
        ],
        album: [],
      },
      // {
      //   id: '5',
      //   albumTitle: 'Five',
      //   albumImage: [
      //     backs,
      //     face,
      //     facial,
      //     handsMassage,
      //     necked,
      //     backMassage2,
      //     backPlain,
      //     eyeDark,
      //   ],
      //   album: [],
      // },
      // {
      //   id: '6',
      //   albumTitle: 'Six',
      //   albumImage: [
      //     backMassage,
      //     backPlain,
      //     back,
      //     eyeDark,
      //     handsMassage,
      //     sholder,
      //     backMassage2,
      //     backs,
      //   ],
      //   album: [],
      // },
      // {
      //   id: '7',
      //   albumTitle: 'Seven',
      //   albumImage: [
      //     sholder,
      //     handsMassage,
      //     backMassage2,
      //     backs,
      //     backMassage,
      //     backPlain,
      //     back,
      //     eyeDark,
      //   ],
      //   album: [],
      // },
      // {
      //   id: '8',
      //   albumTitle: 'Eight',
      //   albumImage: [
      //     backPlain,
      //     eyeDark,
      //     necked,
      //     face,
      //     facial,
      //     backs,
      //     eyeDark,
      //     handsMassage,
      //   ],
      //   album: [],
      // },
    ],
    id: '1',
    albumTitle: 'Album',
    albumImage: [],
  }

  // const ref = useRef<HTMLDivElement>(null)
  return (
    <div className={styles.clientLayout}>
      <GalleryView albumList={albumList as AlbumProps} images={images} />
    </div>
  )
}

export default ClientPhotosLayout
