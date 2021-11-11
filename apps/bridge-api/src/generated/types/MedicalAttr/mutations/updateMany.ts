import { mutationField, nonNull } from 'nexus'

export const MedicalAttrUpdateManyMutation = mutationField(
  'updateManyMedicalAttr',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MedicalAttrWhereInput',
      data: nonNull('MedicalAttrUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalAttr.updateMany(args as any)
    },
  },
)
