import { queryField, nonNull, list } from 'nexus'

export const CmCampaignNoteFindCountQuery = queryField(
  'findManyCmCampaignNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmCampaignNoteWhereInput',
      orderBy: list('CmCampaignNoteOrderByInput'),
      cursor: 'CmCampaignNoteWhereUniqueInput',
      distinct: 'CmCampaignNoteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCampaignNote.count(args as any)
    },
  },
)
