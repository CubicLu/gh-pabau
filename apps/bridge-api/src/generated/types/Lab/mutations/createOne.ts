import { mutationField, nonNull } from 'nexus'

export const LabCreateOneMutation = mutationField('createOneLab', {
  type: nonNull('Lab'),
  args: {
    data: nonNull('LabCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.lab.create({
      data,
      ...select,
    })
  },
})
