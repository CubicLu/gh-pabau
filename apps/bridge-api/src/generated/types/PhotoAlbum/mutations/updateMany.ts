import { mutationField, nonNull } from 'nexus'

export const PhotoAlbumUpdateManyMutation = mutationField(
  'updateManyPhotoAlbum',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PhotoAlbumWhereInput',
      data: nonNull('PhotoAlbumUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.photoAlbum.updateMany(args as any)
    },
  },
)
