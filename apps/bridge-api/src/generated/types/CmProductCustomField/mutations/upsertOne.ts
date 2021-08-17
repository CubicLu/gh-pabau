import { mutationField, nonNull } from 'nexus'

export const CmProductCustomFieldUpsertOneMutation = mutationField(
  'upsertOneCmProductCustomField',
  {
    type: nonNull('CmProductCustomField'),
    args: {
      where: nonNull('CmProductCustomFieldWhereUniqueInput'),
      create: nonNull('CmProductCustomFieldCreateInput'),
      update: nonNull('CmProductCustomFieldUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmProductCustomField.upsert({
        ...args,
        ...select,
      })
    },
  },
)
