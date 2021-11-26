import { mutationField, nonNull } from 'nexus'

export const ContactMedicalConditionUpdateManyMutation = mutationField(
  'updateManyContactMedicalCondition',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ContactMedicalConditionUpdateManyMutationInput'),
      where: 'ContactMedicalConditionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactMedicalCondition.updateMany(args as any)
    },
  },
)
