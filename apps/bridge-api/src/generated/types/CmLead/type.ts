import { objectType } from 'nexus'

export const CmLead = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmLead',
  definition(t) {
    t.int('ID')
    t.string('Avatar')
    t.int('OwnerID')
    t.int('ContactID')
    t.string('Salutation')
    t.string('Fname')
    t.string('Lname')
    t.field('DOB', { type: 'DateTime' })
    t.string('Title')
    t.string('LeadCompany')
    t.int('company_id')
    t.string('Email')
    t.string('Phone')
    t.string('Fax')
    t.string('Mobile')
    t.string('Website')
    t.int('LeadSource')
    t.int('LeadStatus')
    t.string('Industry')
    t.string('NoOfEmp')
    t.string('AnualRevenue')
    t.int('Rating')
    t.field('EmailOptOut', { type: 'cm_leads_EmailOptOut' })
    t.string('SkypeId')
    t.string('SecondaryEmail')
    t.string('Twitter')
    t.string('MailingStreet')
    t.string('MailingCity')
    t.string('MailingProvince')
    t.string('MailingPostal')
    t.string('MailingCountry')
    t.string('Description')
    t.field('EnumStatus', { type: 'cm_leads_EnumStatus' })
    t.field('Status', { type: 'cm_leads_Status' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('MarketingOptInAll')
    t.int('MarketingOptInEmail')
    t.int('MarketingOptInPhone')
    t.int('MarketingOptInPost')
    t.int('MarketingOptInText')
    t.int('MarketingOptInNewsletter')
    t.string('IpAddress')
    t.string('fbimg')
    t.string('LastUpdated')
    t.string('custom_tag1')
    t.int('online_capture')
    t.int('capture_id')
    t.int('old_LeadStatus')
    t.string('custom_id')
    t.int('imported')
    t.field('ConvertDate', { type: 'DateTime' })
    t.int('group_id')
    t.field('first_interaction', { type: 'DateTime' })
    t.field('latest_interaction', { type: 'DateTime' })
    t.int('location_id')
    t.int('need_to_knows')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('CmLeadCustomField', {
      type: 'CmLeadCustomField',
      args: {
        where: 'CmLeadCustomFieldWhereInput',
        orderBy: 'CmLeadCustomFieldOrderByInput',
        cursor: 'CmLeadCustomFieldWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmLeadCustomFieldScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmLeadCustomField
      },
    })
    t.list.field('CommunicationRecipient', {
      type: 'CommunicationRecipient',
      args: {
        where: 'CommunicationRecipientWhereInput',
        orderBy: 'CommunicationRecipientOrderByInput',
        cursor: 'CommunicationRecipientWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationRecipientScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationRecipient
      },
    })
    t.nullable.field('_count', {
      type: 'CmLeadCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
