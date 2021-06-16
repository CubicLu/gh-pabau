import { objectType, arg, extendType } from 'nexus'

export const ContactInsurance = objectType({
  name: 'ContactInsurance',
  definition(t) {
    t.model.id()
    t.model.contact_id()
    t.model.provider_number()
    t.model.auth_code()
    t.model.membership_number()
    t.model.charge_type()
    t.model.company_id()
    t.model.imported()
    t.model.CmContact()
  },
})

export const contactInsuranceQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.contactInsurance()
    t.field('findFirstContactInsurance', {
      type: 'ContactInsurance',
      args: {
        where: 'ContactInsuranceWhereInput',
        orderBy: arg({ type: 'ContactInsuranceOrderByInput' }),
        cursor: 'ContactInsuranceWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.contactInsurance.findFirst(args as any)
      },
    })
    t.crud.contactInsurances({ filtering: true, ordering: true })
    t.field('contactInsurancesCount', {
      type: 'Int',
      args: {
        where: 'ContactInsuranceWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.contactInsurance.count(args as any)
      },
    })
  },
})

export const contactInsuranceMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneContactInsurance()
    t.crud.updateOneContactInsurance()
    t.crud.upsertOneContactInsurance()
    t.crud.deleteOneContactInsurance()
    t.crud.updateManyContactInsurance()
  },
})
