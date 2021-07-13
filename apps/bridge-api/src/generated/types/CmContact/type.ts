import { objectType } from 'nexus'

export const CmContact = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmContact',
  definition(t) {
    t.int('ID')
    t.string('Avatar')
    t.int('OwnerID')
    t.string('Salutation')
    t.string('Fname')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('location_id')
    t.string('Email')
    t.string('Phone')
    t.string('OtherPhone')
    t.string('Mobile')
    t.string('Assistant')
    t.string('ReportsTo')
    t.string('LeadSource')
    t.string('Lname')
    t.string('Title')
    t.string('Department')
    t.string('HomePhone')
    t.string('Fax')
    t.nullable.field('DOB', { type: 'DateTime' })
    t.string('AsstPhone')
    t.field('EmailOptOut', { type: 'cm_contacts_EmailOptOut' })
    t.string('SkypeId')
    t.field('AddToQuickBooks', { type: 'cm_contacts_AddToQuickBooks' })
    t.string('SecondaryEmail')
    t.string('Twitter')
    t.string('MailingStreet')
    t.string('OtherStreet')
    t.string('MailingCity')
    t.string('OtherCity')
    t.string('MailingProvince')
    t.string('OtherProvince')
    t.string('MailingPostal')
    t.string('OtherPostal')
    t.string('MailingCountry')
    t.string('OtherCountry')
    t.string('Description')
    t.field('Status', { type: 'cm_contacts_Status' })
    t.field('CreatedDate', { type: 'DateTime' })
    t.int('IpAddress')
    t.string('fbimg')
    t.int('MarketingSource')
    t.nullable.string('RefferalSource')
    t.int('LeadID')
    t.string('group_tag')
    t.string('polite_notice')
    t.string('custom_id')
    t.string('gender')
    t.nullable.int('MarketingOptInAll')
    t.nullable.int('MarketingOptInEmail')
    t.nullable.int('MarketingOptInPhone')
    t.nullable.int('MarketingOptInPost')
    t.nullable.int('MarketingOptInText')
    t.string('notes_drop')
    t.int('imported')
    t.string('alerts_drop')
    t.int('MarketingSourceRelated')
    t.string('customer_reference')
    t.int('MarketingOptInNewsletter')
    t.string('custom_marketing_source')
    t.int('insurer_id')
    t.int('is_active')
    t.string('xero_contact_id')
    t.int('is_ambassador')
    t.nullable.field('UpdatedDate', { type: 'DateTime' })
    t.nullable.field('xero_updated_date', { type: 'DateTime' })
    t.int('discount_type')
    t.int('custom_clinic_id')
    t.int('ambassador_id')
    t.int('contract_id')
    t.string('privacy_policy')
    t.boolean('need_to_knows')
    t.int('contact_type')
    t.nullable.field('SocialSurveyFeedback', {
      type: 'SocialSurveyFeedback',
      resolve(root: any) {
        return root.SocialSurveyFeedback
      },
    })
    t.list.field('CmContactAlert', {
      type: 'CmContactAlert',
      args: {
        where: 'CmContactAlertWhereInput',
        orderBy: 'CmContactAlertOrderByInput',
        cursor: 'CmContactAlertWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactAlertScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactAlert
      },
    })
    t.list.field('AccountBalance', {
      type: 'AccountBalance',
      args: {
        where: 'AccountBalanceWhereInput',
        orderBy: 'AccountBalanceOrderByInput',
        cursor: 'AccountBalanceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AccountBalanceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AccountBalance
      },
    })
    t.list.field('AccountBalanceLog', {
      type: 'AccountBalanceLog',
      args: {
        where: 'AccountBalanceLogWhereInput',
        orderBy: 'AccountBalanceLogOrderByInput',
        cursor: 'AccountBalanceLogWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AccountBalanceLogScalarFieldEnum',
      },
      resolve(root: any) {
        return root.AccountBalanceLog
      },
    })
    t.list.field('CmContactLocation', {
      type: 'CmContactLocation',
      args: {
        where: 'CmContactLocationWhereInput',
        orderBy: 'CmContactLocationOrderByInput',
        cursor: 'CmContactLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactLocation
      },
    })
    t.list.field('CmContactTravel', {
      type: 'CmContactTravel',
      args: {
        where: 'CmContactTravelWhereInput',
        orderBy: 'CmContactTravelOrderByInput',
        cursor: 'CmContactTravelWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactTravelScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactTravel
      },
    })
    t.list.field('CmContactViewed', {
      type: 'CmContactViewed',
      args: {
        where: 'CmContactViewedWhereInput',
        orderBy: 'CmContactViewedOrderByInput',
        cursor: 'CmContactViewedWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactViewedScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactViewed
      },
    })
    t.list.field('CmContactMedicalCondition', {
      type: 'CmContactMedicalCondition',
      args: {
        where: 'CmContactMedicalConditionWhereInput',
        orderBy: 'CmContactMedicalConditionOrderByInput',
        cursor: 'CmContactMedicalConditionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactMedicalConditionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactMedicalCondition
      },
    })
    t.list.field('CmContactNote', {
      type: 'CmContactNote',
      args: {
        where: 'CmContactNoteWhereInput',
        orderBy: 'CmContactNoteOrderByInput',
        cursor: 'CmContactNoteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmContactNoteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmContactNote
      },
    })
    t.list.field('MedicalFormContact', {
      type: 'MedicalFormContact',
      args: {
        where: 'MedicalFormContactWhereInput',
        orderBy: 'MedicalFormContactOrderByInput',
        cursor: 'MedicalFormContactWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MedicalFormContactScalarFieldEnum',
      },
      resolve(root: any) {
        return root.MedicalFormContact
      },
    })
    t.list.field('CmExtraGym', {
      type: 'CmExtraGym',
      args: {
        where: 'CmExtraGymWhereInput',
        orderBy: 'CmExtraGymOrderByInput',
        cursor: 'CmExtraGymWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraGymScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraGym
      },
    })
    t.list.field('CmExtraPatient', {
      type: 'CmExtraPatient',
      args: {
        where: 'CmExtraPatientWhereInput',
        orderBy: 'CmExtraPatientOrderByInput',
        cursor: 'CmExtraPatientWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraPatientScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraPatient
      },
    })
    t.list.field('CmExtraSalon', {
      type: 'CmExtraSalon',
      args: {
        where: 'CmExtraSalonWhereInput',
        orderBy: 'CmExtraSalonOrderByInput',
        cursor: 'CmExtraSalonWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CmExtraSalonScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CmExtraSalon
      },
    })
    t.list.field('InvPayment', {
      type: 'InvPayment',
      args: {
        where: 'InvPaymentWhereInput',
        orderBy: 'InvPaymentOrderByInput',
        cursor: 'InvPaymentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvPaymentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvPayment
      },
    })
    t.list.field('InvSale', {
      type: 'InvSale',
      args: {
        where: 'InvSaleWhereInput',
        orderBy: 'InvSaleOrderByInput',
        cursor: 'InvSaleWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvSaleScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvSale
      },
    })
    t.list.field('ContactInsurance', {
      type: 'ContactInsurance',
      args: {
        where: 'ContactInsuranceWhereInput',
        orderBy: 'ContactInsuranceOrderByInput',
        cursor: 'ContactInsuranceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ContactInsuranceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ContactInsurance
      },
    })
    t.list.field('InventoryMovement', {
      type: 'InventoryMovement',
      args: {
        where: 'InventoryMovementWhereInput',
        orderBy: 'InventoryMovementOrderByInput',
        cursor: 'InventoryMovementWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InventoryMovementScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InventoryMovement
      },
    })
    t.nullable.field('_count', {
      type: 'CmContactCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
