import { mutationField, nonNull } from 'nexus'

export const UserAlertUpsertOneMutation = mutationField('upsertOneUserAlert', {
  type: nonNull('UserAlert'),
  args: {
    where: nonNull('UserAlertWhereUniqueInput'),
    create: nonNull('UserAlertCreateInput'),
    update: nonNull('UserAlertUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.userAlert.upsert({
      ...args,
      ...select,
    })
  },
})
