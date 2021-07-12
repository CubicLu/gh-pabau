import { mutationField, nonNull } from 'nexus'

export const ManageCustomFieldUpsertOneMutation = mutationField(
  'upsertOneManageCustomField',
  {
    type: nonNull('ManageCustomField'),
    args: {
      where: nonNull('ManageCustomFieldWhereUniqueInput'),
      create: nonNull('ManageCustomFieldCreateInput'),
      update: nonNull('ManageCustomFieldUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.manageCustomField.upsert({
        ...args,
        ...select,
      })
    },
  },
)
