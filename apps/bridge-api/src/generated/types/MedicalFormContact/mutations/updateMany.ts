import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactUpdateManyMutation = mutationField(
  'updateManyMedicalFormContact',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MedicalFormContactWhereInput',
      data: nonNull('MedicalFormContactUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormContact.updateMany(args as any)
    },
  },
)
