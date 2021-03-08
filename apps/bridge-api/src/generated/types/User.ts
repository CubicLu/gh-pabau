import { objectType, arg, extendType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.username()
    t.model.fullName()
    t.model.password()
    t.model.passwordAlgor()
    t.model.salt()
    t.model.created()
    t.model.lastLogin()
    t.model.companyId()
    t.model.hash()
    t.model.email()
    t.model.admin()
    t.model.address()
    t.model.timezone()
    t.model.locale()
    t.model.language()
    t.model.jobTitle()
    t.model.department()
    t.model.division()
    t.model.super()
    t.model.defaultPage()
    t.model.signature()
    t.model.image()
    t.model.position()
    t.model.location()
    t.model.deleted()
    t.model.passCode()
    t.model.phoneNumber()
    t.model.hideOnlineBookings()
    t.model.passcode()
    t.model.lastLoadedPage()
    t.model.temporaryPassword()
    t.model.customId()
    t.model.hideCalendar()
    t.model.calendarOrder()
    t.model.clockedIn()
    t.model.clockedOut()
    t.model.lastPasswordReset()
    t.model.forcePassword()
    t.model.limitedUser()
    t.model.canVoid()
    t.model.canRefund()
    t.model.canReport()
    t.model.canRota()
    t.model.staffReadOnly()
    t.model.stockReadOnly()
    t.model.allReports()
    t.model.performanceStats()
    t.model.disableTutorial()
    t.model.allServices()
    t.model.deleteTreatment()
    t.model.adminTasks()
    t.model.adminLeads()
    t.model.imported()
    t.model.loginFailCount()
    t.model.canEditBookingTime()
    t.model.userColor()
    t.model.disableMultipleClinics()
    t.model.isHcp()
    t.model.loginDisabled()
    t.model.canPatientAppoint()
    t.model.canPatientCommunicatons()
    t.model.canPatientPhotos()
    t.model.canPatientFiancials()
    t.model.canPatientTreatments()
    t.model.canPatientDocs()
    t.model.canPatientPackages()
    t.model.canPatientPrescription()
    t.model.canPatientConsents()
    t.model.canPatientGiftvoucher()
    t.model.canPatientLoyalty()
    t.model.canPatientRecall()
    t.model.canPatientMemberships()
    t.model.canCancelBooking()
    t.model.notifyOnBooking()
    t.model.canEditCommunications()
    t.model.canDeleteCommunications()
    t.model.canViewFullCal()
    t.model.permissionLastRole()
    t.model.canMerge()
    t.model.canDiscount()
    t.model.canDiscountSingle()
    t.model.restored()
    t.model.googleAuthSecret()
    t.model.defaultContractId()
    t.model.canSeePersonal()
    t.model.appearOnRota()
    t.model.canPatientMedicalHistory()
    t.model.canLabRequests()
    t.model.detailedView()
    t.model.canMakeBlockout()
    t.model.canDeleteBlockout()
    t.model.canMoveBlockout()
    t.model.mainContact()
    t.model.company()
  },
})

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user()
    t.field('findFirstUser', {
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: arg({ type: 'UserOrderByInput' }),
        cursor: 'UserWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.user.findFirst(args as any)
      },
    })
    t.crud.users({ filtering: true, ordering: true })
    t.field('usersCount', {
      type: 'Int',
      args: {
        where: 'UserWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.user.count(args as any)
      },
    })
  },
})

export const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser()
    t.crud.updateOneUser()
    t.crud.upsertOneUser()
    t.crud.deleteOneUser()
    t.crud.updateManyUser()
    t.crud.deleteManyUser()
  },
})
