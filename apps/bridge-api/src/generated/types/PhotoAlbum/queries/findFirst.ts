import { queryField, list } from 'nexus'

export const PhotoAlbumFindFirstQuery = queryField('findFirstPhotoAlbum', {
  type: 'PhotoAlbum',
  args: {
    where: 'PhotoAlbumWhereInput',
    orderBy: list('PhotoAlbumOrderByInput'),
    cursor: 'PhotoAlbumWhereUniqueInput',
    distinct: 'PhotoAlbumScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.photoAlbum.findFirst({
      ...args,
      ...select,
    })
  },
})
