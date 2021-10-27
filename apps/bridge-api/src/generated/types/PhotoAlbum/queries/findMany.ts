import { queryField, nonNull, list } from 'nexus'

export const PhotoAlbumFindManyQuery = queryField('findManyPhotoAlbum', {
  type: nonNull(list(nonNull('PhotoAlbum'))),
  args: {
    where: 'PhotoAlbumWhereInput',
    orderBy: list('PhotoAlbumOrderByWithRelationInput'),
    cursor: 'PhotoAlbumWhereUniqueInput',
    distinct: 'PhotoAlbumScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.photoAlbum.findMany({
      ...args,
      ...select,
    })
  },
})
