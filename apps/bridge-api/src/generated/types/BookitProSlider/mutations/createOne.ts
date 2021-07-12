import { mutationField, nonNull } from 'nexus'

export const BookitProSliderCreateOneMutation = mutationField(
  'createOneBookitProSlider',
  {
    type: nonNull('BookitProSlider'),
    args: {
      data: nonNull('BookitProSliderCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookitProSlider.create({
        data,
        ...select,
      })
    },
  },
)
