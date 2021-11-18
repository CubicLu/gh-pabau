import { ContactAlert } from '@prisma/client'
import { Context } from '../../../context'
import { extendType, list, nonNull } from 'nexus'

export const ContactAlertExtended = extendType({
  type: 'ContactAlert',
  definition(t) {
    t.field('MedicalConditions', {
      type: nonNull(list('MedicalCondition')),
      async resolve(parent: ContactAlert, args, ctx: Context) {
        if (!parent?.Note) return []

        const tags = parent.Note?.split('#')
          ?.splice(1)
          ?.map((item) => {
            return item.split(' ')[0]
          })

        console.info('tags', tags, parent)

        return await ctx.prisma.medicalCondition.findMany({
          where: {
            name: { in: tags },
            company_id: ctx.authenticated.company,
          },
        })
      },
    })
  },
})
