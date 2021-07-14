import { queryField, nonNull, list } from 'nexus'

export const CmExtraPatientFindCountQuery = queryField(
  'findManyCmExtraPatientCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmExtraPatientWhereInput',
      orderBy: list('CmExtraPatientOrderByInput'),
      cursor: 'CmExtraPatientWhereUniqueInput',
      distinct: 'CmExtraPatientScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraPatient.count(args as any)
    },
  },
)
