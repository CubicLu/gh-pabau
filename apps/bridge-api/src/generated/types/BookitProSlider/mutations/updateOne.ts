import { mutationField, nonNull } from 'nexus'

export const BookitProSliderUpdateOneMutation = mutationField(
  'updateOneBookitProSlider',
  {
    type: nonNull('BookitProSlider'),
    args: {
      where: nonNull('BookitProSliderWhereUniqueInput'),
      data: nonNull('BookitProSliderUpdateInput'),
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
