import { extendType, list, nonNull } from 'nexus'
import { Context } from '../../../context'
import { CompanyService } from '@prisma/client'

export const CompanyServiceExtended = extendType({
  type: 'CompanyService',
  definition(t) {
    t.field('MedicalForm', {
      type: nonNull(list('MedicalForm')),
      async resolve(parent: CompanyService, args, ctx: Context) {
        if (!parent?.id) return []
        return (
          (await ctx.prisma.$queryRaw`SELECT
                      id, name
                      FROM medical_form
                      WHERE occupier = ${ctx.authenticated.company} AND FIND_IN_SET(${parent.id}, service_id) AND deleted_at IS NULL `) ??
          []
        )
      },
    })
  },
})
