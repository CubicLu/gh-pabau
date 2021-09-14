import { mutationField, nonNull } from 'nexus'

export const PhotoAlbumUpsertOneMutation = mutationField(
  'upsertOnePhotoAlbum',
  {
    type: nonNull('PhotoAlbum'),
    args: {
      where: nonNull('PhotoAlbumWhereUniqueInput'),
      create: nonNull('PhotoAlbumCreateInput'),
      update: nonNull('PhotoAlbumUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.photoAlbum.upsert({
        ...args,
        ...select,
      })
    },
  },
)
