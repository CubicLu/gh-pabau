import { queryField, nonNull } from 'nexus'

export const CmContactMedicalConditionFindUniqueQuery = queryField(
  'findUniqueCmContactMedicalCondition',
  {
    type: 'CmContactMedicalCondition',
    args: {
      where: nonNull('CmContactMedicalConditionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactMedicalCondition.findUnique({
        where,
        ...select,
      })
    },
  },
)
