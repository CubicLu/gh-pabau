import { mutationField, nonNull } from 'nexus'

export const PhotoAlbumUpdateOneMutation = mutationField(
  'updateOnePhotoAlbum',
  {
    type: nonNull('PhotoAlbum'),
    args: {
      where: nonNull('PhotoAlbumWhereUniqueInput'),
      data: nonNull('PhotoAlbumUpdateInput'),
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
