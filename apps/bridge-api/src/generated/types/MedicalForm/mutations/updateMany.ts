import { mutationField, nonNull } from 'nexus'

export const MedicalFormUpdateManyMutation = mutationField(
  'updateManyMedicalForm',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MedicalFormWhereInput',
      data: nonNull('MedicalFormUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalForm.updateMany(args as any)
    },
  },
)
