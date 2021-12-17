import { extendType, stringArg, intArg, list, objectType, nonNull } from 'nexus'
import { Context } from '../../context'

export const GetLibraryForms = extendType({
  type: 'Query',
  definition(t) {
    t.field('getLibraryForms', {
      type: list('MedicalForm'),
      args: {
        form_id: intArg(),
        business_type: stringArg(),
        name: stringArg(),
      },
      async resolve(
        parent,
        { form_id, business_type, name },
        { prismaArray }: Context
      ) {
        const DO_NOT_DELETE_COMPANY_ID = 3452
        const where = {
          deleted_at: {
            equals: null,
          },
          company_id: {
            equals: DO_NOT_DELETE_COMPANY_ID,
          },
        }
        if (form_id > 0) {
          where['id'] = {
            equals: form_id,
          }
        }
        if (business_type !== undefined && name !== '') {
          where['form_category'] = {
            equals: business_type,
          }
        }
        if (name !== undefined && name !== '') {
          where['name'] = {
            equals: name,
          }
        }
        return await prismaArray(undefined).medicalForm.findMany({
          where: where,
        })
      },
    })
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
