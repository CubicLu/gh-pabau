import { objectType } from 'nexus'

export const InsurerContract = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InsurerContract',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('insurer_id')
    t.nullable.int('company_id')
    t.int('folder_id')
    t.field('contract_type', { type: 'insurer_contracts_contract_type' })
    t.boolean('active')
    t.boolean('show_bank_details')
    t.string('bank_account')
    t.string('bank_number')
    t.string('sort_code')
    t.string('bank_name')
    t.string('iban')
    t.string('swift')
    t.string('vat_number')
    t.int('imported')
    t.boolean('private_contract')
    t.int('employee_id')
    t.string('full_address')
    t.string('registered_company_address')
    t.boolean('default_address_to')
    t.nullable.int('invoice_template_id')
    t.int('location_id')
    t.field('last_update', { type: 'DateTime' })
    t.string('mp_rule_name')
    t.int('rule_type')
    t.float('second_service')
    t.float('further_service')
    t.int('action_tax_id')
    t.nullable.string('custom_id_template')
    t.nullable.string('invoice_prefix')
    t.int('invoice_starting_num')
    t.int('custom_id')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
