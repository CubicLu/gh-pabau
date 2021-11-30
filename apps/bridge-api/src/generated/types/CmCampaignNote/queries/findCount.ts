import { queryField, nonNull, list } from 'nexus'

export const CmCampaignNoteFindCountQuery = queryField(
  'findManyCmCampaignNoteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmCampaignNoteWhereInput',
      orderBy: list('CmCampaignNoteOrderByWithRelationInput'),
      cursor: 'CmCampaignNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmCampaignNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCampaignNote.count(args as any)
    },
  },
)
