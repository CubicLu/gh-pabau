import { queryField, list } from 'nexus'

export const BookitProSliderFindFirstQuery = queryField(
  'findFirstBookitProSlider',
  {
    type: 'BookitProSlider',
    args: {
      where: 'BookitProSliderWhereInput',
      orderBy: list('BookitProSliderOrderByInput'),
      cursor: 'BookitProSliderWhereUniqueInput',
      distinct: 'BookitProSliderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProSlider.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
