import { mutationField, nonNull } from 'nexus'

export const ContactMedicalConditionUpsertOneMutation = mutationField(
  'upsertOneContactMedicalCondition',
  {
    type: nonNull('ContactMedicalCondition'),
    args: {
      where: nonNull('ContactMedicalConditionWhereUniqueInput'),
      create: nonNull('ContactMedicalConditionCreateInput'),
      update: nonNull('ContactMedicalConditionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.contactMedicalCondition.upsert({
        ...args,
        ...select,
      })
    },
  },
)
