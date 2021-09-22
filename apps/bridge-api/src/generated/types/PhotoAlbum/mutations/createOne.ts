import { mutationField, nonNull } from 'nexus'

export const PhotoAlbumCreateOneMutation = mutationField(
  'createOnePhotoAlbum',
  {
    type: nonNull('PhotoAlbum'),
    args: {
      data: nonNull('PhotoAlbumCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.photoAlbum.create({
        data,
        ...select,
      })
    },
  },
)
