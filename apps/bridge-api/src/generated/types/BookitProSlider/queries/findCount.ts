import { queryField, nonNull, list } from 'nexus'

export const BookitProSliderFindCountQuery = queryField(
  'findManyBookitProSliderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookitProSliderWhereInput',
      orderBy: list('BookitProSliderOrderByWithRelationInput'),
      cursor: 'BookitProSliderWhereUniqueInput',
      distinct: 'BookitProSliderScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookitProSlider.count(args as any)
    },
  },
)
