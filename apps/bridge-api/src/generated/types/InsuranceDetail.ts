import { objectType, arg, extendType } from 'nexus'

export const InsuranceDetail = objectType({
  name: 'InsuranceDetail',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.insurer_name()
    t.model.phone()
    t.model.website()
    t.model.city()
    t.model.street()
    t.model.county()
    t.model.post_code()
    t.model.email()
    t.model.is_active()
    t.model.image()
    t.model.country()
    t.model.street2()
    t.model.provider_no()
    t.model.imported()
    t.model.healthcode_id()
    t.model.cycle_quantity()
    t.model.custom_id()
    t.model.company_type()
    t.model.hc_identifier()
    t.model.xero_contact_id()
    t.model.Company()
    t.model.HealthcodeInsurer()
  },
})

export const insuranceDetailQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.insuranceDetail()
    t.field('findFirstInsuranceDetail', {
      type: 'InsuranceDetail',
      args: {
        where: 'InsuranceDetailWhereInput',
        orderBy: arg({ type: 'InsuranceDetailOrderByInput' }),
        cursor: 'InsuranceDetailWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.insuranceDetail.findFirst(args as any)
      },
    })
    t.crud.insuranceDetails({ filtering: true, ordering: true })
    t.field('insuranceDetailsCount', {
      type: 'Int',
      args: {
        where: 'InsuranceDetailWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.insuranceDetail.count(args as any)
      },
    })
  },
})

export const insuranceDetailMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneInsuranceDetail()
    t.crud.updateOneInsuranceDetail()
    t.crud.upsertOneInsuranceDetail()
    t.crud.deleteOneInsuranceDetail()
    t.crud.updateManyInsuranceDetail()
  },
})
