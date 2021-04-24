import { objectType, arg, extendType } from 'nexus'

export const CmExtraPatient = objectType({
  name: 'CmExtraPatient',
  definition(t) {
    t.model.id()
    t.model.contact_id()
    t.model.nhs_number()
    t.model.gp()
    t.model.surgeon()
    t.model.company_id()
    t.model.date_of_death()
    t.model.external_clinic()
    t.model.assigned_clinic()
    t.model.treatment_group()
    t.model.assigned_diary()
    t.model.marketing_source()
    t.model.referral_source()
    t.model.Company()
    t.model.CmContact()
    t.model.MarketingSource()
  },
})

export const cmExtraPatientQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmExtraPatient()
    t.field('findFirstCmExtraPatient', {
      type: 'CmExtraPatient',
      args: {
        where: 'CmExtraPatientWhereInput',
        orderBy: arg({ type: 'CmExtraPatientOrderByInput' }),
        cursor: 'CmExtraPatientWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmExtraPatient.findFirst(args as any)
      },
    })
    t.crud.cmExtraPatients({ filtering: true, ordering: true })
    t.field('cmExtraPatientsCount', {
      type: 'Int',
      args: {
        where: 'CmExtraPatientWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmExtraPatient.count(args as any)
      },
    })
  },
})

export const cmExtraPatientMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmExtraPatient()
    t.crud.updateOneCmExtraPatient()
    t.crud.upsertOneCmExtraPatient()
    t.crud.deleteOneCmExtraPatient()
    t.crud.updateManyCmExtraPatient()
  },
})
