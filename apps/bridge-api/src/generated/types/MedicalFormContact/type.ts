import { objectType } from 'nexus'

export const MedicalFormContact = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalFormContact',
  definition(t) {
    t.int('id')
    t.int('form_id')
    t.nullable.int('contact_id')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.nullable.field('deleted_at', { type: 'DateTime' })
    t.int('complete')
    t.int('locked')
    t.nullable.int('user_created')
    t.int('user_updated')
    t.int('related_to')
    t.string('custom_user_name')
    t.int('prescriber')
    t.string('priority')
    t.int('pharmacy_id')
    t.int('form_status')
    t.nullable.string('comments')
    t.nullable.int('urgent')
    t.int('imported')
    t.string('custom_contact_name')
    t.int('custom_contact_id')
    t.nullable.string('approved_triggers')
    t.nullable.int('actioned_by')
    t.int('form_contact_number')
    t.string('diagnosis_code')
    t.field('Form', {
      type: 'MedicalForm',
      resolve(root: any) {
        return root.Form
      },
    })
    t.nullable.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.nullable.field('CreatedBy', {
      type: 'User',
      resolve(root: any) {
        return root.CreatedBy
      },
    })
    t.list.field('MedicalFormContactHistory', {
      type: 'MedicalFormContactHistory',
      args: {
        where: 'MedicalFormContactHistoryWhereInput',
        orderBy: 'MedicalFormContactHistoryOrderByWithRelationInput',
        cursor: 'MedicalFormContactHistoryWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormContactHistoryScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalFormContactHistory
      },
    })
    t.list.field('MedicalContactAttr', {
      type: 'MedicalContactAttr',
      args: {
        where: 'MedicalContactAttrWhereInput',
        orderBy: 'MedicalContactAttrOrderByWithRelationInput',
        cursor: 'MedicalContactAttrWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalContactAttrScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalContactAttr
      },
    })
    t.nullable.field('_count', {
      type: 'MedicalFormContactCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
