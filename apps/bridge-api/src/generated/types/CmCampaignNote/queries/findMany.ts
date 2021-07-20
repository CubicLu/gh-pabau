import { queryField, nonNull, list } from 'nexus'

export const CmCampaignNoteFindManyQuery = queryField(
  'findManyCmCampaignNote',
  {
    type: nonNull(list(nonNull('CmCampaignNote'))),
    args: {
      where: 'CmCampaignNoteWhereInput',
      orderBy: list('CmCampaignNoteOrderByInput'),
      cursor: 'CmCampaignNoteWhereUniqueInput',
      distinct: 'CmCampaignNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCampaignNote.findMany({
        ...args,
        ...select,
      })
    },
  },
)
