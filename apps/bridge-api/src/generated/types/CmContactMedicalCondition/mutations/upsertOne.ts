import { mutationField, nonNull } from 'nexus'

export const CmContactMedicalConditionUpsertOneMutation = mutationField(
  'upsertOneCmContactMedicalCondition',
  {
    type: nonNull('CmContactMedicalCondition'),
    args: {
      where: nonNull('CmContactMedicalConditionWhereUniqueInput'),
      create: nonNull('CmContactMedicalConditionCreateInput'),
      update: nonNull('CmContactMedicalConditionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactMedicalCondition.upsert({
        ...args,
        ...select,
      })
    },
  },
)
