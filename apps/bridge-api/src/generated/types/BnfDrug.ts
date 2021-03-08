import { objectType, arg, extendType } from 'nexus'

export const BnfDrug = objectType({
  name: 'BnfDrug',
  definition(t) {
    t.model.id()
    t.model.url()
    t.model.page()
    t.model.drugName()
    t.model.indicationsDosage()
    t.model.contraIndications()
    t.model.cautions()
    t.model.sideEffects()
    t.model.pregnancy()
    t.model.breastFeeding()
    t.model.prescribingInfo()
    t.model.patientAdvice()
    t.model.directions()
    t.model.specificInfo()
  },
})

export const bnfDrugQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.bnfDrug()
    t.field('findFirstBnfDrug', {
      type: 'BnfDrug',
      args: {
        where: 'BnfDrugWhereInput',
        orderBy: arg({ type: 'BnfDrugOrderByInput' }),
        cursor: 'BnfDrugWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bnfDrug.findFirst(args as any)
      },
    })
    t.crud.bnfDrugs({ filtering: true, ordering: true })
    t.field('bnfDrugsCount', {
      type: 'Int',
      args: {
        where: 'BnfDrugWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.bnfDrug.count(args as any)
      },
    })
  },
})

export const bnfDrugMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneBnfDrug()
    t.crud.updateOneBnfDrug()
    t.crud.upsertOneBnfDrug()
    t.crud.deleteOneBnfDrug()
    t.crud.updateManyBnfDrug()
    t.crud.deleteManyBnfDrug()
  },
})
