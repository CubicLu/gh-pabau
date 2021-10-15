import { queryField, nonNull, list } from 'nexus'

export const ClinicalSoftwareFindCountQuery = queryField(
  'findManyClinicalSoftwareCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClinicalSoftwareWhereInput',
      orderBy: list('ClinicalSoftwareOrderByInput'),
      cursor: 'ClinicalSoftwareWhereUniqueInput',
      distinct: 'ClinicalSoftwareScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clinicalSoftware.count(args as any)
    },
  },
)
