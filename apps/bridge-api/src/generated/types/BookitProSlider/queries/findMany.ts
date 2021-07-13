import { queryField, nonNull, list } from 'nexus'

export const BookitProSliderFindManyQuery = queryField(
  'findManyBookitProSlider',
  {
    type: nonNull(list(nonNull('BookitProSlider'))),
    args: {
      where: 'BookitProSliderWhereInput',
      orderBy: list('BookitProSliderOrderByInput'),
      cursor: 'BookitProSliderWhereUniqueInput',
      distinct: 'BookitProSliderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProSlider.findMany({
        ...args,
        ...select,
      })
    },
  },
)
