import { mutationField, nonNull } from 'nexus'

export const BookmarkedPageCreateOneMutation = mutationField(
  'createOneBookmarkedPage',
  {
    type: nonNull('BookmarkedPage'),
    args: {
      data: nonNull('BookmarkedPageCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.bookmarkedPage.create({
        data,
        ...select,
      })
    },
  },
)
