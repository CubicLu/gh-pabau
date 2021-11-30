import { queryField, nonNull, list } from 'nexus'

export const PhotoAlbumFindCountQuery = queryField('findManyPhotoAlbumCount', {
  type: nonNull('Int'),
  args: {
    where: 'PhotoAlbumWhereInput',
    orderBy: list('PhotoAlbumOrderByWithRelationInput'),
    cursor: 'PhotoAlbumWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('PhotoAlbumScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.photoAlbum.count(args as any)
  },
})
