import { mutationField, nonNull } from 'nexus'

export const MedicalAttrUpdateManyMutation = mutationField(
  'updateManyMedicalAttr',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MedicalAttrUpdateManyMutationInput'),
      where: 'MedicalAttrWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalAttr.updateMany(args as any)
    },
  },
)
