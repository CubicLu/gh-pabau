import { mutationField, nonNull } from 'nexus'

export const PhotoAlbumUpdateManyMutation = mutationField(
  'updateManyPhotoAlbum',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PhotoAlbumUpdateManyMutationInput'),
      where: 'PhotoAlbumWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.photoAlbum.updateMany(args as any)
    },
  },
)
