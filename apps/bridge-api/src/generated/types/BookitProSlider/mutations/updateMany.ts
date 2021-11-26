import { mutationField, nonNull } from 'nexus'

export const BookitProSliderUpdateManyMutation = mutationField(
  'updateManyBookitProSlider',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookitProSliderUpdateManyMutationInput'),
      where: 'BookitProSliderWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookitProSlider.updateMany(args as any)
    },
  },
)
