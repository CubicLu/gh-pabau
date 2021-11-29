import { queryField, nonNull, list } from 'nexus'

export const BookitProSliderFindManyQuery = queryField(
  'findManyBookitProSlider',
  {
    type: nonNull(list(nonNull('BookitProSlider'))),
    args: {
      where: 'BookitProSliderWhereInput',
      orderBy: list('BookitProSliderOrderByWithRelationInput'),
      cursor: 'BookitProSliderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookitProSliderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProSlider.findMany({
        ...args,
        ...select,
      })
    },
  },
)
