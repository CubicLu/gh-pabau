import { objectType, arg, extendType } from 'nexus'

export const IssuingCompany = objectType({
  name: 'IssuingCompany',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.is_active()
    t.model.name()
    t.model.abbreviation()
    t.model.address()
    t.model.address2()
    t.model.city()
    t.model.postcode()
    t.model.website()
    t.model.email()
    t.model.phone()
    t.model.vat_registered()
    t.model.invoice_template_id()
    t.model.custom_id()
    t.model.invoice_prefix()
    t.model.invoice_starting_number()
    t.model.Company()
  },
})

export const issuingCompanyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.issuingCompany()
    t.field('findFirstIssuingCompany', {
      type: 'IssuingCompany',
      args: {
        where: 'IssuingCompanyWhereInput',
        orderBy: arg({ type: 'IssuingCompanyOrderByInput' }),
        cursor: 'IssuingCompanyWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.issuingCompany.findFirst(args as any)
      },
    })
    t.crud.issuingCompanies({ filtering: true, ordering: true })
    t.field('issuingCompaniesCount', {
      type: 'Int',
      args: {
        where: 'IssuingCompanyWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.issuingCompany.count(args as any)
      },
    })
  },
})

export const issuingCompanyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneIssuingCompany()
    t.crud.updateOneIssuingCompany()
    t.crud.upsertOneIssuingCompany()
    t.crud.deleteOneIssuingCompany()
    t.crud.updateManyIssuingCompany()
  },
})
