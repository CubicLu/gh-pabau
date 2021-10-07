import { queryField, nonNull } from 'nexus'

export const BookitProSliderFindUniqueQuery = queryField(
  'findUniqueBookitProSlider',
  {
    type: 'BookitProSlider',
    args: {
      where: nonNull('BookitProSliderWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.bookitProSlider.findUnique({
        where,
        ...select,
      })
    },
  },
)
