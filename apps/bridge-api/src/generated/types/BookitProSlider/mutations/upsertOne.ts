import { mutationField, nonNull } from 'nexus'

export const BookitProSliderUpsertOneMutation = mutationField(
  'upsertOneBookitProSlider',
  {
    type: nonNull('BookitProSlider'),
    args: {
      where: nonNull('BookitProSliderWhereUniqueInput'),
      create: nonNull('BookitProSliderCreateInput'),
      update: nonNull('BookitProSliderUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProSlider.upsert({
        ...args,
        ...select,
      })
    },
  },
)
