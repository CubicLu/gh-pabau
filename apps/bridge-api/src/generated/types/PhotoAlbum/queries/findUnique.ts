import { queryField, nonNull } from 'nexus'

export const PhotoAlbumFindUniqueQuery = queryField('findUniquePhotoAlbum', {
  type: 'PhotoAlbum',
  args: {
    where: nonNull('PhotoAlbumWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.photoAlbum.findUnique({
      where,
      ...select,
    })
  },
})
