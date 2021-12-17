import { extendType, inputObjectType, nonNull } from 'nexus'
import { Context } from '../../../context'
import { PublicCompanyServerResponse } from '../nexus-type'

export const PCSInput = inputObjectType({
  name: 'PCSInput',
  definition(t) {
    t.int('company_id')
    t.string('slug')
  },
})

export const Public_CompanyServer = extendType({
  type: 'Query',
  definition(t) {
    t.field('Public_CompanyServer', {
      type: PublicCompanyServerResponse,
      description: 'Get company server location',
      args: {
        where: nonNull(PCSInput),
      },
      resolve(_, input, ctx: Context) {
        if (input.where.slug) {
          return ctx.prisma.company.findFirst({
            where: { slug: input.where.slug },
            select: {
              slug: true,
              remote_url: true,
              remote_connect: true,
            },
          })
        }

        return ctx.prisma.company.findUnique({
          where: { id: input.where.company_id },
          select: {
            slug: true,
            remote_url: true,
            remote_connect: true,
          },
        })
      },
    })
  },
})
