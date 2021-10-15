import { queryField, list } from 'nexus'

export const CmExtraPatientFindFirstQuery = queryField(
  'findFirstCmExtraPatient',
  {
    type: 'CmExtraPatient',
    args: {
      where: 'CmExtraPatientWhereInput',
      orderBy: list('CmExtraPatientOrderByInput'),
      cursor: 'CmExtraPatientWhereUniqueInput',
      distinct: 'CmExtraPatientScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmExtraPatient.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
