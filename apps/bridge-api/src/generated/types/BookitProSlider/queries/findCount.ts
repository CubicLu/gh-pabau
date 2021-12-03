import { queryField, nonNull, list } from 'nexus'

export const BookitProSliderFindCountQuery = queryField(
  'findManyBookitProSliderCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BookitProSliderWhereInput',
      orderBy: list('BookitProSliderOrderByWithRelationInput'),
      cursor: 'BookitProSliderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookitProSliderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookitProSlider.count(args as any)
    },
  },
)
