import { queryField, list } from 'nexus'

export const BookitProSliderAggregateQuery = queryField(
  'aggregateBookitProSlider',
  {
    type: 'AggregateBookitProSlider',
    args: {
      where: 'BookitProSliderWhereInput',
      orderBy: list('BookitProSliderOrderByWithRelationInput'),
      cursor: 'BookitProSliderWhereUniqueInput',
      distinct: 'BookitProSliderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProSlider.aggregate({ ...args, ...select }) as any
    },
  },
)
