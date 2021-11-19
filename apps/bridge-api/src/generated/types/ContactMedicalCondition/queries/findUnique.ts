import { queryField, nonNull } from 'nexus'

export const ContactMedicalConditionFindUniqueQuery = queryField(
  'findUniqueContactMedicalCondition',
  {
    type: 'ContactMedicalCondition',
    args: {
      where: nonNull('ContactMedicalConditionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.contactMedicalCondition.findUnique({
        where,
        ...select,
      })
    },
  },
)
