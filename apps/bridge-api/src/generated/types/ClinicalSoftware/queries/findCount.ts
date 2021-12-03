import { queryField, nonNull, list } from 'nexus'

export const ClinicalSoftwareFindCountQuery = queryField(
  'findManyClinicalSoftwareCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClinicalSoftwareWhereInput',
      orderBy: list('ClinicalSoftwareOrderByWithRelationInput'),
      cursor: 'ClinicalSoftwareWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClinicalSoftwareScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clinicalSoftware.count(args as any)
    },
  },
)
