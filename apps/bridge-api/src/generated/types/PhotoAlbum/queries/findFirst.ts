import { queryField, list } from 'nexus'

export const PhotoAlbumFindFirstQuery = queryField('findFirstPhotoAlbum', {
  type: 'PhotoAlbum',
  args: {
    where: 'PhotoAlbumWhereInput',
    orderBy: list('PhotoAlbumOrderByWithRelationInput'),
    cursor: 'PhotoAlbumWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PhotoAlbumScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.photoAlbum.findFirst({
      ...args,
      ...select,
    })
  },
})
