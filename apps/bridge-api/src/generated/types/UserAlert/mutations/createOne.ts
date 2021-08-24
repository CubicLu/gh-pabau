import { mutationField, nonNull } from 'nexus'

export const UserAlertCreateOneMutation = mutationField('createOneUserAlert', {
  type: nonNull('UserAlert'),
  args: {
    data: nonNull('UserAlertCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.userAlert.create({
      data,
      ...select,
    })
  },
})
