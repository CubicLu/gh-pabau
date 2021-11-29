import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactUpdateManyMutation = mutationField(
  'updateManyMedicalFormContact',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MedicalFormContactUpdateManyMutationInput'),
      where: 'MedicalFormContactWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormContact.updateMany(args as any)
    },
  },
)
