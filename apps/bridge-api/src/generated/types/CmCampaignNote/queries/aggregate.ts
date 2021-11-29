import { queryField, list } from 'nexus'

export const CmCampaignNoteAggregateQuery = queryField(
  'aggregateCmCampaignNote',
  {
    type: 'AggregateCmCampaignNote',
    args: {
      where: 'CmCampaignNoteWhereInput',
      orderBy: list('CmCampaignNoteOrderByWithRelationInput'),
      cursor: 'CmCampaignNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCampaignNote.aggregate({ ...args, ...select }) as any
    },
  },
)
