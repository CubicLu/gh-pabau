import { objectType, arg, extendType } from 'nexus'

export const CmDrug = objectType({
  name: 'CmDrug',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.company_id()
    t.model.dosage()
    t.model.units()
    t.model.frequency()
    t.model.route()
    t.model.comment()
    t.model.is_active()
    t.model.product_id()
    t.model.lot_number()
    t.model.expiry_date()
    t.model.field_order()
    t.model.is_vaccine()
    t.model.is_required()
    t.model.custom_id()
    t.model.max_age()
    t.model.min_age()
    t.model.nathnac_link()
    t.model.travax_link()
    t.model.Company()
    t.model.InvProduct()
  },
})

export const cmDrugQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.cmDrug()
    t.field('findFirstCmDrug', {
      type: 'CmDrug',
      args: {
        where: 'CmDrugWhereInput',
        orderBy: arg({ type: 'CmDrugOrderByInput' }),
        cursor: 'CmDrugWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmDrug.findFirst(args as any)
      },
    })
    t.crud.cmDrugs({ filtering: true, ordering: true })
    t.field('cmDrugsCount', {
      type: 'Int',
      args: {
        where: 'CmDrugWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.cmDrug.count(args as any)
      },
    })
  },
})

export const cmDrugMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCmDrug()
    t.crud.updateOneCmDrug()
    t.crud.upsertOneCmDrug()
    t.crud.deleteOneCmDrug()
    t.crud.updateManyCmDrug()
  },
})
