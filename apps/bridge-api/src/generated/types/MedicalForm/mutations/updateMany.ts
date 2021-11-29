import { mutationField, nonNull } from 'nexus'

export const MedicalFormUpdateManyMutation = mutationField(
  'updateManyMedicalForm',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MedicalFormUpdateManyMutationInput'),
      where: 'MedicalFormWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalForm.updateMany(args as any)
    },
  },
)
