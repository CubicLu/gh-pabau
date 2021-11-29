import { queryField, nonNull, list } from 'nexus'

export const CmCampaignNoteFindManyQuery = queryField(
  'findManyCmCampaignNote',
  {
    type: nonNull(list(nonNull('CmCampaignNote'))),
    args: {
      where: 'CmCampaignNoteWhereInput',
      orderBy: list('CmCampaignNoteOrderByWithRelationInput'),
      cursor: 'CmCampaignNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmCampaignNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCampaignNote.findMany({
        ...args,
        ...select,
      })
    },
  },
)
