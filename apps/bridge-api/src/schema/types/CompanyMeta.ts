import { extendType, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'

interface MetaInput {
  meta_name: string
  meta_value: string
}

export const SetCompanyMeta = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('setOneCompanyMeta', {
      type: 'CompanyMeta',
      description:
        'Creates or updates one company meta entry for the currently authenticated company',
      args: {
        meta_name: nonNull(stringArg()),
        meta_value: nonNull(stringArg()),
      },
      resolve(_root, input: MetaInput, ctx: Context) {
        if (!input.meta_name || !input.meta_value) {
          throw new Error('Malformed Parameters')
        }
        return ctx.prisma.companyMeta.upsert({
          where: {
            company_id: {
              company_id: ctx.authenticated.company,
              meta_name: input.meta_name,
            },
          },
          create: {
            meta_name: input.meta_name,
            meta_value: input.meta_value,
            company_id: ctx.authenticated.company,
          },
          update: {
            meta_value: input.meta_value,
          },
        })
      },
    })
  },
})
