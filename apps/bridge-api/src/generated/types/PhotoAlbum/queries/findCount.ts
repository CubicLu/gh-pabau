import { queryField, nonNull, list } from 'nexus'

export const PhotoAlbumFindCountQuery = queryField('findManyPhotoAlbumCount', {
  type: nonNull('Int'),
  args: {
    where: 'PhotoAlbumWhereInput',
    orderBy: list('PhotoAlbumOrderByInput'),
    cursor: 'PhotoAlbumWhereUniqueInput',
    distinct: 'PhotoAlbumScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.photoAlbum.count(args as any)
  },
})
