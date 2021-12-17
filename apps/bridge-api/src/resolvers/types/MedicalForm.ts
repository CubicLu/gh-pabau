import { Context } from '../../context'
import { extendType, objectType, nonNull, intArg } from 'nexus'

export const getFormVersions = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getFormVersions', {
      type: objectType({
        name: 'GetFormVersionsType',
        definition(t) {
          t.int('formId')
          t.int('version')
          t.nullable.field('createdAt', { type: 'DateTime' })
          t.field('createdBy', { type: 'User' })
        },
      }),
      args: {
        formId: nonNull(intArg()),
      },
      async resolve(_root, args, ctx: Context) {
        const form = await ctx.prisma.medicalForm.findUnique({
          where: {
            id: args.formId,
          },
          select: {
            id: true,
            name: true,
          },
        })

        if (!form) return []

        const deletedForms = await ctx.prisma.medicalForm.findMany({
          where: {
            company_id: {
              equals: ctx.authenticated.company,
            },
            name: {
              equals: form.name,
            },
            deleted_at: {
              not: {
                equals: null,
              },
            },
            id: {
              not: {
                equals: form.id,
              },
            },
          },
          select: {
            id: true,
            created_at: true,
            CreatedBy: true,
          },
          orderBy: {
            created_at: 'desc',
          },
        })

        return deletedForms.map((form, index) => {
          return {
            formId: form.id,
            version: deletedForms.length - index,
            createdAt: form.created_at,
            createdBy: form.CreatedBy,
          }
        })
      },
    })
  },
})
