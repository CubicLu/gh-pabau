import { mutationField, nonNull } from 'nexus'

export const BookitProSliderDeleteOneMutation = mutationField(
  'deleteOneBookitProSlider',
  {
    type: 'BookitProSlider',
    args: {
      where: nonNull('BookitProSliderWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bookitProSlider.delete({
        where,
        ...select,
      })
    },
  },
)
