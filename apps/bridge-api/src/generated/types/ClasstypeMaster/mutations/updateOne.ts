import { mutationField, nonNull } from 'nexus'

export const ClasstypeMasterUpdateOneMutation = mutationField(
  'updateOneClasstypeMaster',
  {
    type: nonNull('ClasstypeMaster'),
    args: {
      where: nonNull('ClasstypeMasterWhereUniqueInput'),
      data: nonNull('ClasstypeMasterUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classtypeMaster.update({
        where,
        data,
        ...select,
      })
    },
  },
)
