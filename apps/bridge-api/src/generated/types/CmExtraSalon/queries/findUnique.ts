import { queryField, nonNull } from 'nexus'

export const CmExtraSalonFindUniqueQuery = queryField(
  'findUniqueCmExtraSalon',
  {
    type: 'CmExtraSalon',
    args: {
      where: nonNull('CmExtraSalonWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmExtraSalon.findUnique({
        where,
        ...select,
      })
    },
  },
)
