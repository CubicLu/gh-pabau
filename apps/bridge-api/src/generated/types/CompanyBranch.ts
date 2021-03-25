import { objectType, arg, extendType } from 'nexus'

export const CompanyBranch = objectType({
  name: 'CompanyBranch',
  definition(t) {
    t.model.id()
    t.model.group_id()
    t.model.company_id()
    t.model.address()
    t.model.street()
    t.model.city()
    t.model.county()
    t.model.name()
    t.model.postcode()
    t.model.online_bookings()
    t.model.phone()
    t.model.website()
    t.model.is_active()
    t.model.bookable_online()
    t.model.calendar_bookable()
    t.model.is_default()
    t.model.lat()
    t.model.lng()
    t.model.custom_id()
    t.model.email()
    t.model.send_conf_email()
    t.model.show_online()
    t.model.loc_order()
    t.model.region()
    t.model.invoice_template_id()
    t.model.color()
    t.model.notify_on_lead()
    t.model.notice()
    t.model.Company()
    t.model.CompanyRoomLocation()
  },
})

export const companyBranchQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyBranch()
    t.field('findFirstCompanyBranch', {
      type: 'CompanyBranch',
      args: {
        where: 'CompanyBranchWhereInput',
        orderBy: arg({ type: 'CompanyBranchOrderByInput' }),
        cursor: 'CompanyBranchWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyBranch.findFirst(args as any)
      },
    })
    t.crud.companyBranches({ filtering: true, ordering: true })
    t.field('companyBranchesCount', {
      type: 'Int',
      args: {
        where: 'CompanyBranchWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyBranch.count(args as any)
      },
    })
  },
})

export const companyBranchMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyBranch()
    t.crud.updateOneCompanyBranch()
    t.crud.upsertOneCompanyBranch()
    t.crud.deleteOneCompanyBranch()
    t.crud.updateManyCompanyBranch()
    t.crud.deleteManyCompanyBranch()
  },
})
