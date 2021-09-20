import { mutationField, nonNull } from 'nexus'

export const PhotoAlbumDeleteOneMutation = mutationField(
  'deleteOnePhotoAlbum',
  {
    type: 'PhotoAlbum',
    args: {
      where: nonNull('PhotoAlbumWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.photoAlbum.delete({
        where,
        ...select,
      })
    },
  },
)
