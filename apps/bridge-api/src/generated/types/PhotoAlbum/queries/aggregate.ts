import { queryField, list } from 'nexus'

export const PhotoAlbumAggregateQuery = queryField('aggregatePhotoAlbum', {
  type: 'AggregatePhotoAlbum',
  args: {
    where: 'PhotoAlbumWhereInput',
    orderBy: list('PhotoAlbumOrderByWithRelationInput'),
    cursor: 'PhotoAlbumWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.photoAlbum.aggregate({ ...args, ...select }) as any
  },
})
