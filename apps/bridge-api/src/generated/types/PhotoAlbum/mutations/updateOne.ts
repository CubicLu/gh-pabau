import { mutationField, nonNull } from 'nexus'

export const PhotoAlbumUpdateOneMutation = mutationField(
  'updateOnePhotoAlbum',
  {
    type: nonNull('PhotoAlbum'),
    args: {
      data: nonNull('PhotoAlbumUpdateInput'),
      where: nonNull('PhotoAlbumWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.photoAlbum.update({
        where,
        data,
        ...select,
      })
    },
  },
)
