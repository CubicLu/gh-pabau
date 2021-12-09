import { objectType } from 'nexus'

export const PathwayStep = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PathwayStep',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.field('created_date', { type: 'DateTime' })
    t.field('step', { type: 'cp_steps_step' })
    t.int('order')
    t.int('item_id')
    t.int('pathway_id')
    t.int('can_skip')
    t.int('display_time')
    t.string('other_value')
    t.string('description')
    t.nullable.string('who_does_this')
    t.field('Pathway', {
      type: 'Pathway',
      resolve(root: any) {
        return root.Pathway
      },
    })
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.nullable.field('MedicalForm', {
      type: 'MedicalForm',
      resolve(root: any) {
        return root.MedicalForm
      },
    })
    t.list.field('PathwayStepsTaken', {
      type: 'PathwayStepsTaken',
      args: {
        where: 'PathwayStepsTakenWhereInput',
        orderBy: 'PathwayStepsTakenOrderByWithRelationInput',
        cursor: 'PathwayStepsTakenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwayStepsTakenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwayStepsTaken
      },
    })
    t.field('_count', {
      type: 'PathwayStepCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
