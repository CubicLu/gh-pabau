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
      async resolve(_, input: MetaInput, ctx: Context) {
        if (!input.meta_name || !input.meta_value) {
          throw new Error('Malformed Parameters')
        }
        try {
          const meta = await ctx.prisma.companyMeta.findFirst({
            where: {
              meta_name: input.meta_name,
              company_id: ctx.user.company,
            },
          })
          if (meta.id) {
            return await ctx.prisma.companyMeta.update({
              where: {
                id: meta.id,
              },
              data: {
                meta_value: input.meta_value,
              },
            })
          }
        } catch {
          return await ctx.prisma.companyMeta.create({
            data: {
              meta_name: input.meta_name,
              meta_value: input.meta_value,
              company_id: ctx.user.company,
            },
          })
        }
      },
    })
  },
})
