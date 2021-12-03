import { queryField, list } from 'nexus'

export const CmCampaignNoteFindFirstQuery = queryField(
  'findFirstCmCampaignNote',
  {
    type: 'CmCampaignNote',
    args: {
      where: 'CmCampaignNoteWhereInput',
      orderBy: list('CmCampaignNoteOrderByWithRelationInput'),
      cursor: 'CmCampaignNoteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmCampaignNoteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmCampaignNote.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
