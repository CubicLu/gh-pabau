import { mutationField, nonNull } from 'nexus'

export const CmContactMedicalConditionUpdateOneMutation = mutationField(
  'updateOneCmContactMedicalCondition',
  {
    type: nonNull('CmContactMedicalCondition'),
    args: {
      where: nonNull('CmContactMedicalConditionWhereUniqueInput'),
      data: nonNull('CmContactMedicalConditionUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactMedicalCondition.update({
        where,
        data,
        ...select,
      })
    },
  },
)
