import { objectType, arg, extendType } from 'nexus'

export const CompanyDetails = objectType({
  name: 'CompanyDetails',
  definition(t) {
    t.model.detailsId()
    t.model.companyId()
    t.model.companyName()
    t.model.subscription()
    t.model.industrySector()
    t.model.employees()
    t.model.website()
    t.model.street()
    t.model.city()
    t.model.county()
    t.model.postCode()
    t.model.country()
    t.model.phone()
    t.model.fax()
    t.model.infoEmail()
    t.model.admin()
    t.model.logo()
    t.model.currency()
    t.model.facebookPage()
    t.model.twitterPage()
    t.model.headOffice()
    t.model.footerLogo()
    t.model.headerLogo()
    t.model.vat()
    t.model.dateFormat()
    t.model.weekStartDay()
    t.model.autoSms()
    t.model.smsActive()
    t.model.dbLock()
    t.model.stockManager()
    t.model.companyNotes()
    t.model.timezoneId()
    t.model.convertedValue()
    t.model.enable2fa()
    t.model.enableAd()
    t.model.enableAdCode()
    t.model.enableIpFilter()
    t.model.demoMode()
    t.model.linkedinPage()
    t.model.youtubePage()
    t.model.isSurgical()
    t.model.privateTreatmentNotes()
    t.model.acceptInsurance()
    t.model.phonePrefix()
    t.model.taxName()
    t.model.secureMedicalForms()
    t.model.debrandLogo()
    t.model.defaultSearch()
    t.model.calendarVersion()
    t.model.contactTermSingular()
    t.model.contactTermPlural()
    t.model.flagEnabled()
    t.model.lockPrescription()
    t.model.showReportLogo()
    t.model.rotaVersion()
    t.model.useGoogleAuth()
    t.model.employeeClockTrack()
    t.model.slug()
    t.model.defaultInvTemplateId()
    t.model.diagnosisCodesType()
    t.model.appendClientPref()
    t.model.capitalSurname()
    t.model.disablePrescriptions()
    t.model.cyclesDisplay()
    t.model.enableSensData()
    t.model.classTermSingular()
    t.model.classTermPlural()
    t.model.sensitiveDataQuestion()
    t.model.legacyConsultations()
    t.model.classTeacherSingular()
    t.model.employeeTermSingular()
    t.model.employeeTermPlural()
    t.model.medicalApprovals()
    t.model.newReports()
    t.model.mergeBookingsTabs()
    t.model.preferencesSms()
    t.model.preferencesEmail()
    t.model.preferencesPost()
    t.model.preferencesNewsletters()
    t.model.healthcodeLive()
    t.model.lockExport()
    t.model.language()
    t.model.completedSetup()
    t.model.timezone()
    t.model.company()
  },
})

export const companyDetailsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyDetails()
    t.field('findFirstCompanyDetails', {
      type: 'CompanyDetails',
      args: {
        where: 'CompanyDetailsWhereInput',
        orderBy: arg({ type: 'CompanyDetailsOrderByInput' }),
        cursor: 'CompanyDetailsWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyDetails.findFirst(args as any)
      },
    })
    t.crud.companyDetails({ filtering: true, ordering: true })
    t.field('companyDetailsCount', {
      type: 'Int',
      args: {
        where: 'CompanyDetailsWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyDetails.count(args as any)
      },
    })
  },
})

export const companyDetailsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyDetails()
    t.crud.updateOneCompanyDetails()
    t.crud.upsertOneCompanyDetails()
    t.crud.deleteOneCompanyDetails()
    t.crud.updateManyCompanyDetails()
    t.crud.deleteManyCompanyDetails()
  },
})
