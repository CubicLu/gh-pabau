export function useData(t) {
  const columns = [
    {
      key: 'owner',
      title: t('team.user.permission.column.owner'),
      staffMember: [],
      isDisabled: true,
    },
  ]

  const staff_meta_keys = [
    'staff_disable_edit_invoice_content',
    'staff_disable_edit_invoices',
    'medical_approval_notes',
    'can_edit_stock_descriptions',
    'can_edit_stock_level',
  ]

  const field_type_number = [
    'hide_calendar',
    'hide_online_bookings',
    'can_edit_booking_time',
    'performance_stats',
    'can_discount',
  ]

  const loaderColumns = []
  for (let i = 0; i < 5; i = i + 1) {
    loaderColumns.push({
      key: i,
      title: '',
    })
  }

  const loaderDatasource = []
  for (let i = 0; i < 5; i = i + 1) {
    loaderDatasource.push({
      key: i,
      name: '',
      permissions: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      },
    })
  }

  const moduleTabData = {
    dataSource: [
      {
        key: 'contacts',
        name: t('team.user.module.source.contactsTitle'),
        children: [
          {
            key: 'Contact Manager',
            name: t('team.user.module.source.clients'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.clients.tooltip'),
          },
          {
            key: 'Case Manager',
            name: t('team.user.module.source.cases'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.cases.tooltip'),
          },
          {
            key: 'Lab Requests',
            name: t('team.user.module.source.labRequests'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.labRequests.tooltip'),
          },
        ],
      },
      {
        key: 'finance',
        name: t('team.user.module.source.financeTitle'),
        children: [
          {
            key: 'Accounts',
            name: t('team.user.module.source.accounts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.accounts.tooltip'),
          },
          {
            key: 'Cashup',
            name: t('team.user.module.source.cashup'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.cashup.tooltip'),
          },
          {
            key: 'Expenses',
            name: t('team.user.module.source.expenses'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.expenses.tooltip'),
          },
        ],
      },
      {
        key: 'leads',
        name: t('team.user.module.source.leadsTitle'),
        children: [
          {
            key: 'Lead Manager',
            name: t('team.user.module.source.leads'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.leads.tooltip'),
          },
        ],
      },
      {
        key: 'marketing',
        name: t('team.user.module.source.marketingTitle'),
        children: [
          {
            key: 'SMS Campaign',
            name: t('team.user.module.source.campaigns'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.campaigns.tooltip'),
          },
          {
            key: 'Social Survey',
            name: t('team.user.module.source.reviews'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.reviews.tooltip'),
          },
          {
            key: 'Gift Vouchers',
            name: t('team.user.module.source.giftVouchers'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.giftVouchers.tooltip'),
          },
          {
            key: 'Referral Tracker',
            name: t('team.user.module.source.referral'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.referral.tooltip'),
          },
          {
            key: 'Loyalty',
            name: t('team.user.module.source.loyalty'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.loyalty.tooltip'),
          },
        ],
      },
      {
        key: 'Reports',
        name: t('team.user.module.source.reportsTitle'),
        permissions: {
          owner: true,
        },
      },
      {
        key: 'stock',
        name: t('team.user.module.source.stockTitle'),
        children: [
          {
            key: 'Products',
            name: t('team.user.module.source.products'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.products.tooltip'),
          },
          {
            key: 'Inventory Count',
            name: t('team.user.module.source.inventoryCount'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.inventoryCount.tooltip'),
          },
          {
            key: 'Purchase Order',
            name: t('team.user.module.source.purchaseOrder'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.purchaseOrder.tooltip'),
          },
          {
            key: 'Suppliers',
            name: t('team.user.module.source.supplier'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.supplier.tooltip'),
          },
        ],
      },
      {
        key: 'Practice',
        name: t('team.user.module.source.calendarTitle'),
        permissions: {
          owner: true,
        },
      },
      {
        key: 'staff',
        name: t('team.user.module.source.teamTitle'),
        children: [
          {
            key: 'Staff Manager',
            name: t('team.user.module.source.teammates'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.teammates.tooltip'),
          },
          {
            key: 'Staff Targets',
            name: t('team.user.module.source.targets'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.targets.tooltip'),
          },
          {
            key: 'Staff Rota',
            name: t('team.user.module.source.schedule'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.schedule.tooltip'),
          },
          {
            key: 'STK015',
            name: t('team.user.module.source.hiring'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.hiring.tooltip'),
          },
          {
            key: 'STK015',
            name: t('team.user.module.source.commissions'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.module.source.commissions.tooltip'),
          },
        ],
      },
    ],
  }

  const featureTabData = {
    dataSource: [
      {
        key: '1',
        name: t('team.user.feature.source.calendarClientsTitle'),
        children: [
          {
            key: 'hide_calendar',
            name: t('team.user.feature.source.availableCalendar'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.availableCalendar.tooltip'
            ),
          },
          {
            key: 'can_view_full_cal',
            name: t('team.user.feature.source.viewEverybodyCalendar'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.viewEverybodyCalendar.tooltip'
            ),
          },
          {
            key: 'can_make_blockout',
            name: t('team.user.feature.source.canMakeBookOut'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canMakeBookOut.tooltip'
            ),
          },
          {
            key: 'hide_online_bookings',
            name: t('team.user.feature.source.bookableOnline'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.bookableOnline.tooltip'
            ),
          },
          {
            key: 'can_cancel_booking',
            name: t('team.user.feature.source.canCancelBooking'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canCancelBooking.tooltip'
            ),
          },
          {
            key: 'can_edit_booking_time',
            name: t('team.user.feature.source.changeBookingTime'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.changeBookingTime.tooltip'
            ),
          },
          {
            key: 'can_move_blockout',
            name: t('team.user.feature.source.canMoveBlockout'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canMoveBlockout.tooltip'
            ),
          },
          {
            key: 'can_delete_blockout',
            name: t('team.user.feature.source.canDeleteBlockout'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canDeleteBlockout.tooltip'
            ),
          },
        ],
      },
      {
        key: '2',
        name: t('team.user.feature.source.financialsTitle'),
        children: [
          {
            key: 'can_void',
            name: t('team.user.feature.source.canVoidSales'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.feature.source.canVoidSales.tooltip'),
          },
          {
            key: 'can_refund',
            name: t('team.user.feature.source.canRefundSales'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canRefundSales.tooltip'
            ),
          },
          {
            key: 'staff_disable_edit_invoice_content',
            name: t('team.user.feature.source.canEditInvoiceContent'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canEditInvoiceContent.tooltip'
            ),
          },
          {
            key: 'InvBiller',
            name: t('team.user.feature.source.availableToSell'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.availableToSell.tooltip'
            ),
          },
          {
            key: 'staff_disable_edit_invoices',
            name: t('team.user.feature.source.canEditInvoices'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canEditInvoices.tooltip'
            ),
          },
          {
            key: 'performance_stats',
            name: t('team.user.feature.source.performanceStats'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.performanceStats.tooltip'
            ),
          },
          {
            key: 'can_discount',
            name: t('team.user.feature.source.applyDiscount'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.feature.source.applyDiscount.tooltip'),
          },
        ],
      },
      {
        key: '3',
        name: t('team.user.feature.source.otherTitle'),
        children: [
          {
            key: 'delete_alert_notes',
            name: t('team.user.feature.source.canDeleteAlertNotes'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canDeleteAlertNotes.tooltip'
            ),
          },
          {
            key: 'delete_treatment',
            name: t('team.user.feature.source.editDeleteEMR'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.feature.source.editDeleteEMR.tooltip'),
          },
          {
            key: 'can_merge',
            name: t('team.user.feature.source.mergeDuplicateContrast'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.mergeDuplicateContrast.tooltip'
            ),
          },
          {
            key: 'can_report',
            name: t('team.user.feature.source.appearOnReports'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.appearOnReports.tooltip'
            ),
          },
          {
            key: 'can_rota',
            name: t('team.user.feature.source.canManageRota'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.feature.source.canManageRota.tooltip'),
          },
          {
            key: 'appear_on_rota',
            name: t('team.user.feature.source.appearOnRota'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.feature.source.appearOnRota.tooltip'),
          },
          {
            key: 'medical_approval_notes',
            name: t('team.user.feature.source.medicalApprovalNotes'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.medicalApprovalNotes.tooltip'
            ),
          },
          {
            key: 'can_edit_stock_descriptions',
            name: t('team.user.feature.source.canEditStockDescriptions'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canEditStockDescriptions.tooltip'
            ),
          },
          {
            key: 'can_edit_stock_level',
            name: t('team.user.feature.source.canEditStockLevel'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.feature.source.canEditStockLevel.tooltip'
            ),
          },
        ],
      },
    ],
  }

  const reportsTabData = {
    dataSource: [
      {
        key: '1',
        name: t('team.user.reports.source.contactReportsTitle'),
        children: [
          {
            key: 'CO001',
            name: t('team.user.reports.source.basicInformation'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.basicInformation.tooltip'
            ),
          },
          {
            key: 'CO003',
            name: t('team.user.reports.source.birthday'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.birthday.tooltip'),
          },
          {
            key: 'CO010',
            name: t('team.user.reports.source.outstandingPackages'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.outstandingPackages.tooltip'
            ),
          },
          {
            key: 'CO020',
            name: t('team.user.reports.source.newClients'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.outstandingPackages.tooltip'
            ),
          },
          {
            key: 'CO030',
            name: t('team.user.reports.source.lastSpend'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.lastSpend.tooltip'),
          },
          {
            key: 'CO031',
            name: t('team.user.reports.source.lastVisit'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.lastVisit.tooltip'),
          },
          {
            key: 'CO035',
            name: t('team.user.reports.source.clientsByLocation'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clientsByLocation.tooltip'
            ),
          },
          {
            key: 'CO046',
            name: t('team.user.reports.source.firstVisit'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.firstVisit.tooltip'),
          },
          {
            key: 'VA001',
            name: t('team.user.reports.source.vaccinationReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.vaccinationReport.tooltip'
            ),
          },
          {
            key: 'CO045',
            name: t('team.user.reports.source.bigSpenderReceipt'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.bigSpenderReceipt.tooltip'
            ),
          },
          {
            key: 'CO050',
            name: t('team.user.reports.source.clientReceiptsCategory'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clientReceiptsCategory.tooltip'
            ),
          },
          {
            key: 'CO065',
            name: t('team.user.reports.source.clientRetailPurchases'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clientRetailPurchases.tooltip'
            ),
          },
          {
            key: 'CO070',
            name: t('team.user.reports.source.accountBalance'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.accountBalance.tooltip'
            ),
          },
          {
            key: 'CO075',
            name: t('team.user.reports.source.clientServiceSales'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clientServiceSales.tooltip'
            ),
          },
          {
            key: 'CO147',
            name: t('team.user.reports.source.medicalDataReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.medicalDataReport.tooltip'
            ),
          },
          {
            key: 'CO060',
            name: t('team.user.reports.source.duplicateClients'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.duplicateClients.tooltip'
            ),
          },
          {
            key: 'CO105',
            name: t('team.user.reports.source.patientPrescriptions'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.patientPrescriptions.tooltip'
            ),
          },
          {
            key: 'CO110',
            name: t('team.user.reports.source.clientsTreatmentInterest'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clientsTreatmentInterest.tooltip'
            ),
          },
          {
            key: 'CO111',
            name: t('team.user.reports.source.neverPurchasedBefore'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.neverPurchasedBefore.tooltip'
            ),
          },
          {
            key: 'CO115',
            name: t('team.user.reports.source.clientEnquiryConversion'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clientEnquiryConversion.tooltip'
            ),
          },
          {
            key: 'CO130',
            name: t('team.user.reports.source.productConsumption'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.productConsumption.tooltip'
            ),
          },
          {
            key: 'CO135',
            name: t('team.user.reports.source.accountActivity'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.accountActivity.tooltip'
            ),
          },
          {
            key: 'CO140',
            name: t('team.user.reports.source.lastCustomerBookingsEmployee'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.lastCustomerBookingsEmployee.tooltip'
            ),
          },
          {
            key: 'CO145',
            name: t('team.user.reports.source.accountBalanceDate'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.accountBalanceDate.tooltip'
            ),
          },
          {
            key: 'CO146',
            name: t('team.user.reports.source.treatmentMissingData'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.treatmentMissingData.tooltip'
            ),
          },
        ],
      },
      {
        key: '2',
        name: t('team.user.reports.source.marketingReportsTitle'),
        children: [
          {
            key: 'CO095',
            name: t('team.user.reports.source.clientRecalls'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.clientRecalls.tooltip'),
          },
          {
            key: 'CO100',
            name: t('team.user.reports.source.loyaltyReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.loyaltyReport.tooltip'),
          },
          {
            key: 'CO085',
            name: t('team.user.reports.source.giftCards'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.giftCards.tooltip'),
          },
          {
            key: 'CO090',
            name: t('team.user.reports.source.giftCardAnalysis'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.giftCardAnalysis.tooltip'
            ),
          },
          {
            key: 'MA001',
            name: t('team.user.reports.source.salesReferralSource'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.salesReferralSource.tooltip'
            ),
          },
          {
            key: 'MA005',
            name: t('team.user.reports.source.optTextContacts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.optTextContacts.tooltip'
            ),
          },
          {
            key: 'MA010',
            name: t('team.user.reports.source.optEmailContacts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.optEmailContacts.tooltip'
            ),
          },
          {
            key: 'MA020',
            name: t('team.user.reports.source.referralSources'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.referralSources.tooltip'
            ),
          },
          {
            key: 'MA025',
            name: t('team.user.reports.source.feedbackResults'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.feedbackResults.tooltip'
            ),
          },
          {
            key: 'MA030',
            name: t('team.user.reports.source.surveyFeedback'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.surveyFeedback.tooltip'
            ),
          },
        ],
      },
      {
        key: '3',
        name: t('team.user.reports.source.financeReportsTitle'),
        children: [
          {
            key: 'FI000',
            name: t('team.user.reports.source.dailySales'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.dailySales.tooltip'),
          },
          {
            key: 'FI001',
            name: t('team.user.reports.source.dailyReconciliation'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.dailyReconciliation.tooltip'
            ),
          },
          {
            key: 'FI002',
            name: t('team.user.reports.source.dailyPayments'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.dailyPayments.tooltip'),
          },
          {
            key: 'FI005',
            name: t('team.user.reports.source.receiptsEmployee'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receiptsEmployee.tooltip'
            ),
          },
          {
            key: 'FI006',
            name: t('team.user.reports.source.salesEmployee'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.salesEmployee.tooltip'),
          },
          {
            key: 'FI010',
            name: t('team.user.reports.source.receiptsRetail'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receiptsRetail.tooltip'
            ),
          },
          {
            key: 'FI011',
            name: t('team.user.reports.source.receiptsService'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receiptsService.tooltip'
            ),
          },
          {
            key: 'FI012',
            name: t('team.user.reports.source.receiptsCategory'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receiptsCategory.tooltip'
            ),
          },
          {
            key: 'FI014',
            name: t('team.user.reports.source.salesCategory'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.salesCategory.tooltip'),
          },
          {
            key: 'FI015',
            name: t('team.user.reports.source.receiptsEmployeeService'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receiptsEmployeeService.tooltip'
            ),
          },
          {
            key: 'FI016',
            name: t('team.user.reports.source.receiptsEmployeeRetail'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receiptsEmployeeRetail.tooltip'
            ),
          },
          {
            key: 'FI019',
            name: t('team.user.reports.source.VATReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.VATReport.tooltip'),
          },
          {
            key: 'FI025',
            name: t('team.user.reports.source.receiptsMonth'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.receiptsMonth.tooltip'),
          },
          {
            key: 'FI026',
            name: t('team.user.reports.source.monthlyTakingSummary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.monthlyTakingSummary.tooltip'
            ),
          },
          {
            key: 'FI030',
            name: t('team.user.reports.source.raisedInvoices'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.raisedInvoices.tooltip'
            ),
          },
          {
            key: 'FI040',
            name: t('team.user.reports.source.expenses'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.expenses.tooltip'),
          },
          {
            key: 'FI075',
            name: t('team.user.reports.source.outstandingInvoices'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.outstandingInvoices.tooltip'
            ),
          },
          {
            key: 'FI085',
            name: t('team.user.reports.source.serviceRetailReceipts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.serviceRetailReceipts.tooltip'
            ),
          },
          {
            key: 'FI090',
            name: t('team.user.reports.source.agedInsuranceDebtReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.agedInsuranceDebtReport.tooltip'
            ),
          },
          {
            key: 'FI017',
            name: t('team.user.reports.source.receiptsEmployeeDetailed'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receiptsEmployeeDetailed.tooltip'
            ),
          },
          {
            key: 'FI022',
            name: t('team.user.reports.source.dailyPerformanceStats'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.dailyPerformanceStats.tooltip'
            ),
          },
          {
            key: 'FI031',
            name: t('team.user.reports.source.invoiceActivity'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.invoiceActivity.tooltip'
            ),
          },
          {
            key: 'FI035',
            name: t('team.user.reports.source.receiptsPaymentMethod'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.receiptsPaymentMethod.tooltip'
            ),
          },
          {
            key: 'FI055',
            name: t('team.user.reports.source.unpaidVisits'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.unpaidVisits.tooltip'),
          },
          {
            key: 'FI060',
            name: t('team.user.reports.source.freeGiveaways'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.freeGiveaways.tooltip'),
          },
          {
            key: 'FI065',
            name: t('team.user.reports.source.appointmentIncomeProjection'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.appointmentIncomeProjection.tooltip'
            ),
          },
          {
            key: 'FI070',
            name: t('team.user.reports.source.discountReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.discountReport.tooltip'
            ),
          },
          {
            key: 'FI080',
            name: t('team.user.reports.source.salesExpense'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.salesExpense.tooltip'),
          },
          {
            key: 'FI155',
            name: t('team.user.reports.source.insuranceReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.insuranceReport.tooltip'
            ),
          },
          {
            key: 'OT001',
            name: t('team.user.reports.source.salesConversion'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.salesConversion.tooltip'
            ),
          },
          {
            key: 'OT002',
            name: t('team.user.reports.source.telesalesReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.telesalesReport.tooltip'
            ),
          },
        ],
      },
      {
        key: '4',
        name: t('team.user.reports.source.leadReportsTitle'),
        children: [
          {
            key: 'LE000',
            name: t('team.user.reports.source.openLeads'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.openLeads.tooltip'),
          },
          {
            key: 'LE001',
            name: t('team.user.reports.source.convertedLeads'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.convertedLeads.tooltip'
            ),
          },
          {
            key: 'LE005',
            name: t('team.user.reports.source.leads'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leads.tooltip'),
          },
          {
            key: 'LE015',
            name: t('team.user.reports.source.leadsStatus'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leadsStatus.tooltip'),
          },
          {
            key: 'LE020',
            name: t('team.user.reports.source.leadsSources'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leadsSources.tooltip'),
          },
          {
            key: 'LE035',
            name: t('team.user.reports.source.leadsInterest'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leadsInterest.tooltip'),
          },
          {
            key: 'LE040',
            name: t('team.user.reports.source.leadsClinic'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.leadsClinic.tooltip'),
          },
        ],
      },
      {
        key: '5',
        name: t('team.user.reports.source.appointmentsTitle'),
        children: [
          {
            key: 'CO021',
            name: t('team.user.reports.source.bookedAppointments'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.bookedAppointments.tooltip'
            ),
          },
          {
            key: 'CO025',
            name: t('team.user.reports.source.missedCancelledAppointments'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.missedCancelledAppointments.tooltip'
            ),
          },
          {
            key: 'CO036',
            name: t('team.user.reports.source.connectRegistrationBookings'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.connectRegistrationBookings.tooltip'
            ),
          },
          {
            key: 'CO040',
            name: t('team.user.reports.source.consultationConversion'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.consultationConversion.tooltip'
            ),
          },
          {
            key: 'CO006',
            name: t('team.user.reports.source.appointmentsServiceTypeCount'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.appointmentsServiceTypeCount.tooltip'
            ),
          },
          {
            key: 'CO125',
            name: t('team.user.reports.source.surgeryPreparations'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.surgeryPreparations.tooltip'
            ),
          },
          {
            key: 'CO140',
            name: t('team.user.reports.source.lastCustomerBookingsByEmployee'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.lastCustomerBookingsByEmployee.tooltip'
            ),
          },
          {
            key: 'ST000',
            name: t('team.user.reports.source.staffAppointmentSchedule'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staffAppointmentSchedule.tooltip'
            ),
          },
          {
            key: 'ST025',
            name: t('team.user.reports.source.st025EmployeeAppointmentSummary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.st025EmployeeAppointmentSummary.tooltip'
            ),
          },
          {
            key: 'CO089',
            name: t('team.user.reports.source.locationsReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.locationsReport.tooltip'
            ),
          },
          {
            key: 'OT003',
            name: t('team.user.reports.source.classesAppointmentsReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.classesAppointmentsReport.tooltip'
            ),
          },
          {
            key: 'OT014',
            name: t('team.user.reports.source.roomUtilization'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.roomUtilization.tooltip'
            ),
          },
          {
            key: 'OT009',
            name: t('team.user.reports.source.clinicConversion'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.clinicConversion.tooltip'
            ),
          },
        ],
      },
      {
        key: '6',
        name: t('team.user.reports.source.stockReportsTitle'),
        children: [
          {
            key: 'STK001',
            name: t('team.user.reports.source.stockReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.stockReport.tooltip'),
          },
          {
            key: 'STK005',
            name: t('team.user.reports.source.lowStock'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.lowStock.tooltip'),
          },
          {
            key: 'STK015',
            name: t('team.user.reports.source.costGoods'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.costGoods.tooltip'),
          },
          {
            key: 'STK025',
            name: t('team.user.reports.source.stockCount'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.stockCount.tooltip'),
          },
        ],
      },
      {
        key: '7',
        name: t('team.user.reports.source.staffReportsTitle'),
        children: [
          {
            key: 'ADV001',
            name: t('team.user.reports.source.teamReports'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.teamReports.tooltip'),
          },
          {
            key: 'ST078',
            name: t('team.user.reports.source.staffBookouts'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.staffBookouts.tooltip'),
          },
          {
            key: 'ST001',
            name: t('team.user.reports.source.staffPerformanceSummary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staffPerformanceSummary.tooltip'
            ),
          },
          {
            key: 'ST002',
            name: t('team.user.reports.source.commissionSummary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.commissionSummary.tooltip'
            ),
          },
          {
            key: 'ST003',
            name: t('team.user.reports.source.commissionReportRetail'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.commissionReportRetail.tooltip'
            ),
          },
          {
            key: 'ST004',
            name: t('team.user.reports.source.staffPerformanceTracker'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staffPerformanceTracker.tooltip'
            ),
          },
          {
            key: 'ST005',
            name: t('team.user.reports.source.employeeHolidaysDate'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.employeeHolidaysDate.tooltip'
            ),
          },
          {
            key: 'ST015',
            name: t('team.user.reports.source.staffHours'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.staffHours.tooltip'),
          },
          {
            key: 'ST025',
            name: t('team.user.reports.source.employeeAppointmentSummary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.employeeAppointmentSummary.tooltip'
            ),
          },
          {
            key: 'ST031',
            name: t('team.user.reports.source.dailyEmployeeStatsSummary'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.dailyEmployeeStatsSummary.tooltip'
            ),
          },
          {
            key: 'ST033',
            name: t('team.user.reports.source.dailyEmployeeStats'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.dailyEmployeeStats.tooltip'
            ),
          },
          {
            key: 'ST035',
            name: t('team.user.reports.source.staffDaysOff'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t('team.user.reports.source.staffDaysOff.tooltip'),
          },
          {
            key: 'ST036',
            name: t('team.user.reports.source.staffPayrollReport'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staffPayrollReport.tooltip'
            ),
          },
          {
            key: 'ST037',
            name: t('team.user.reports.source.staffClockInOut'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.reports.source.staffClockInOut.tooltip'
            ),
          },
        ],
      },
      {
        key: '8',
        name: t('team.user.reports.source.customReports.Title'),
        children: [],
      },
    ],
  }

  const advancedTabData = {
    dataSource: [
      {
        key: '1',
        name: t('team.user.advanced.source.advancedPermissionsTitle'),
        children: [
          {
            key: 'CO001',
            name: t('team.user.advanced.source.restrictToClients'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.advanced.source.restrictToClients.tooltip'
            ),
          },
          {
            key: 'CO003',
            name: t('team.user.advanced.source.restrictDataUser'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.advanced.source.restrictDataUser.tooltip'
            ),
          },
          {
            key: 'CO010',
            name: t('team.user.advanced.source.restrictCalendarUser'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.advanced.source.restrictCalendarUser.tooltip'
            ),
          },
          {
            key: 'CO020',
            name: t('team.user.advanced.source.limitContactLocation'),
            permissions: {
              owner: true,
            },
            tooltipMessage: t(
              'team.user.advanced.source.limitContactLocation.tooltip'
            ),
          },
        ],
      },
    ],
  }

  return {
    advancedTabData,
    featureTabData,
    moduleTabData,
    reportsTabData,
    columns,
    staff_meta_keys,
    field_type_number,
    loaderDatasource,
    loaderColumns,
  }
}
