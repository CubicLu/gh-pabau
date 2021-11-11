import { mutationField, nonNull } from 'nexus'

export const MedicalAttrUpsertOneMutation = mutationField(
  'upsertOneMedicalAttr',
  {
    type: nonNull('MedicalAttr'),
    args: {
      where: nonNull('MedicalAttrWhereUniqueInput'),
      create: nonNull('MedicalAttrCreateInput'),
      update: nonNull('MedicalAttrUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalAttr.upsert({
        ...args,
        ...select,
      })
    },
  },
)
