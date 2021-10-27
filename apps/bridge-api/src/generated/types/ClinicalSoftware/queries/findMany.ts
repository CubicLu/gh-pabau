import { queryField, nonNull, list } from 'nexus'

export const ClinicalSoftwareFindManyQuery = queryField(
  'findManyClinicalSoftware',
  {
    type: nonNull(list(nonNull('ClinicalSoftware'))),
    args: {
      where: 'ClinicalSoftwareWhereInput',
      orderBy: list('ClinicalSoftwareOrderByWithRelationInput'),
      cursor: 'ClinicalSoftwareWhereUniqueInput',
      distinct: 'ClinicalSoftwareScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clinicalSoftware.findMany({
        ...args,
        ...select,
      })
    },
  },
)
