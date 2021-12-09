import { objectType } from 'nexus'

export const Recall = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Recall',
  definition(t) {
    t.int('id')
    t.string('recall_name')
    t.string('recall_mode')
    t.string('recall_period')
    t.int('company_id')
    t.int('send_sms')
    t.int('recall_category_id')
    t.int('send_email')
    t.boolean('auto_recall')
    t.string('auto_recall_products_ids')
    t.string('auto_recall_trigger')
    t.string('auto_recall_services_ids')
    t.int('email_from')
    t.int('sms_from')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('RecallSchedule', {
      type: 'RecallSchedule',
      args: {
        where: 'RecallScheduleWhereInput',
        orderBy: 'RecallScheduleOrderByWithRelationInput',
        cursor: 'RecallScheduleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RecallScheduleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.RecallSchedule
      },
    })
    t.nullable.field('_count', {
      type: 'RecallCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
