import { queryField, list } from 'nexus'

export const BookitProSliderFindFirstQuery = queryField(
  'findFirstBookitProSlider',
  {
    type: 'BookitProSlider',
    args: {
      where: 'BookitProSliderWhereInput',
      orderBy: list('BookitProSliderOrderByWithRelationInput'),
      cursor: 'BookitProSliderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BookitProSliderScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.bookitProSlider.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
