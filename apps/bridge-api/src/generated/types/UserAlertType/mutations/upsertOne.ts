import { mutationField, nonNull } from 'nexus'

export const UserAlertTypeUpsertOneMutation = mutationField(
  'upsertOneUserAlertType',
  {
    type: nonNull('UserAlertType'),
    args: {
      where: nonNull('UserAlertTypeWhereUniqueInput'),
      create: nonNull('UserAlertTypeCreateInput'),
      update: nonNull('UserAlertTypeUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertType.upsert({
        ...args,
        ...select,
      })
    },
  },
)
