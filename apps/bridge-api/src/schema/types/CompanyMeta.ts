import { extendType, inputObjectType, list, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'
import { UpdateCompanyMetaResponse } from '../../app/company-meta/nexus-type'

interface MetaInput {
  meta_name: string
  meta_value: string
}

interface ManyMetaInput {
  company_meta: MetaInput[]
}

const CompanyMetaData = inputObjectType({
  name: 'CompanyMetaData',
  definition(t) {
    t.string('meta_name')
    t.string('meta_value')
  },
})

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
            company_id_name: {
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
    t.field('setManyCompanyMeta', {
      type: list(UpdateCompanyMetaResponse),
      description:
        'Creates or updates many company meta entry for the currently authenticated company',
      args: {
        company_meta: nonNull(list(CompanyMetaData)),
      },
      async resolve(_, input: ManyMetaInput, ctx: Context) {
        if (input === undefined || input?.company_meta?.length === 0) {
          throw new Error('Malformed Parameters')
        }
        try {
          const data = await Promise.all(
            input?.company_meta.map(async (item) => {
              if (!item.meta_name) {
                throw new Error('Malformed Parameters')
              }
              return ctx.prisma.companyMeta.upsert({
                where: {
                  company_id_name: {
                    company_id: ctx.authenticated.company,
                    meta_name: item.meta_name,
                  },
                },
                create: {
                  meta_name: item.meta_name,
                  meta_value: item.meta_value,
                  company_id: ctx.authenticated.company,
                },
                update: {
                  meta_value: item.meta_value,
                },
              })
            })
          )
          return data
        } catch (Error) {
          return Error
        }
      },
    })
  },
})
