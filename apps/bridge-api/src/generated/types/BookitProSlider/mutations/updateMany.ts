import { mutationField, nonNull } from 'nexus'

export const BookitProSliderUpdateManyMutation = mutationField(
  'updateManyBookitProSlider',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookitProSliderWhereInput',
      data: nonNull('BookitProSliderUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookitProSlider.updateMany(args as any)
    },
  },
)
