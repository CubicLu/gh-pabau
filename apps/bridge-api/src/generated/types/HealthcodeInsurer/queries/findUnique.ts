import { queryField, nonNull } from 'nexus'

export const HealthcodeInsurerFindUniqueQuery = queryField(
  'findUniqueHealthcodeInsurer',
  {
    type: 'HealthcodeInsurer',
    args: {
      where: nonNull('HealthcodeInsurerWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.healthcodeInsurer.findUnique({
        where,
        ...select,
      })
    },
  },
)
