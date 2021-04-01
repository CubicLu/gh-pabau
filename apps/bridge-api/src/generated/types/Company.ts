import { objectType, arg, extendType } from 'nexus'

export const Company = objectType({
  name: 'Company',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.digit8()
    t.model.admin()
    t.model.creation_date()
    t.model.image()
    t.model.slug()
    t.model.remote_url()
    t.model.remote_connect()
    t.model.cron_enabled()
    t.model.details()
    t.model.subscription()
    t.model.TwoFactorHistory()
    t.model.ThirdPartyAccess()
    t.model.AcceptEmailToken()
    t.model.AccountBalance()
    t.model.MarketingSource()
    t.model.CmCase()
    t.model.CmCaseReply()
    t.model.CmCampaign()
    t.model.User()
    t.model.Candidate()
    t.model.BookingStatus()
    t.model.UserSalutation()
    t.model.CompanyBranch()
    t.model.CompanyLocation()
    t.model.CompanyRoom()
    t.model.CompanyRoomService()
    t.model.CompanyService()
    t.model.CompanyDepartment()
    t.model.Job()
    t.model.JobConfiguration()
    t.model.JobOpening()
    t.model.JobStatus()
    t.model.PointOfSaleSetting()
    t.model.BookingSetting()
    t.model.AccountManager()
    t.model.AcLog()
    t.model.AppSubscriptionsCompanyPrice()
    t.model.AvilableDatesLog()
    t.model.BlockReason()
    t.model.BodyChartTemplate()
    t.model.BookitProSlider()
    t.model.CalendarView()
    t.model.CampaignAttachment()
    t.model.CancellationPolicy()
    t.model.CancelReason()
    t.model.ClassCategory()
    t.model.ClassProduct()
    t.model.ClockinLongpoll()
    t.model.CmAppointmentsCustomImportHelper()
    t.model.CmAppointmentCustom()
    t.model.CmContact()
    t.model.CompanyMeta()
    t.model.RotaShift()
    t.model.PermissionTemplate()
    t.model.UserGroup()
    t.model.UserMaster()
    t.model.UserMobilePermission()
    t.model.GroupPermission()
    t.model.UserReport()
    t.model.InvBiller()
    t.model.UserAlertPermission()
    t.model.SocialSurvey()
    t.model.SocialSurveyFeedback()
    t.model.SocialSurveyQuestion()
  },
})

export const companyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('findFirstCompany', {
      type: 'Company',
      args: {
        where: 'CompanyWhereInput',
        orderBy: arg({ type: 'CompanyOrderByInput' }),
        cursor: 'CompanyWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.company.findFirst(args as any)
      },
    })
    t.crud.companies({ filtering: true, ordering: true })
    t.field('companiesCount', {
      type: 'Int',
      args: {
        where: 'CompanyWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.company.count(args as any)
      },
    })
  },
})

export const companyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneCompany()
    t.crud.updateManyCompany()
  },
})
