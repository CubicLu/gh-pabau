import { mutationField, nonNull } from 'nexus'

export const UserAlertTypeUpdateOneMutation = mutationField(
  'updateOneUserAlertType',
  {
    type: nonNull('UserAlertType'),
    args: {
      where: nonNull('UserAlertTypeWhereUniqueInput'),
      data: nonNull('UserAlertTypeUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userAlertType.update({
        where,
        data,
        ...select,
      })
    },
  },
)
