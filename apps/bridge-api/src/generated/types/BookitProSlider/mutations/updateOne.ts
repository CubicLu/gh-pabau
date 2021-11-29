import { mutationField, nonNull } from 'nexus'

export const BookitProSliderUpdateOneMutation = mutationField(
  'updateOneBookitProSlider',
  {
    type: nonNull('BookitProSlider'),
    args: {
      data: nonNull('BookitProSliderUpdateInput'),
      where: nonNull('BookitProSliderWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.bookitProSlider.update({
        where,
        data,
        ...select,
      })
    },
  },
)
