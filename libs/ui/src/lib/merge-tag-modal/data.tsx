export interface TagModule {
  name: string
  module: string
  tag: string
  selected: boolean
}

export interface TagModuleItems {
  [key: string]: {
    displayName: string
    items: TagModule[]
  }
}

export const tagList: TagModuleItems = {
  clients: {
    displayName: 'Clients',
    items: [
      {
        name: 'Client full name',
        module: 'clients',
        tag: '[APPOINTMENTNAME]',
        selected: false,
      },
      {
        name: 'First Name',
        module: 'clients',
        tag: '[APPOINTMENTFIRSTNAME]',
        selected: false,
      },
      {
        name: 'Last Name',
        module: 'clients',
        tag: '[APPOINTMENTLASTNAME]',
        selected: false,
      },
      {
        name: 'Email Address',
        module: 'clients',
        tag: '[CLIENTEMAIL]',
        selected: false,
      },
      {
        name: 'Date of birth',
        module: 'clients',
        tag: '[CLIENTDOB]',
        selected: false,
      },
      {
        name: 'Gender',
        module: 'clients',
        tag: '[CLIENTGENDER]',
        selected: false,
      },
      {
        name: 'Home phone number',
        module: 'clients',
        tag: '[CLIENTPHONE]',
        selected: false,
      },
      {
        name: 'Mobile phone number',
        module: 'clients',
        tag: '[CLIENTMOBILE]',
        selected: false,
      },
      {
        name: 'Client ID',
        module: 'clients',
        tag: '[CLIENTID]',
        selected: false,
      },
      {
        name: 'Salutation',
        module: 'clients',
        tag: '[CLIENTSALUTATION]',
        selected: false,
      },
      {
        name: 'Full Address',
        module: 'clients',
        tag: '[FULLADDRESS]',
        selected: false,
      },
      {
        name: 'Full Address Other',
        module: 'clients',
        tag: '[FULLADDRESS2]',
        selected: false,
      },
      {
        name: 'City',
        module: 'clients',
        tag: '[CLIENTCITY]',
        selected: false,
      },
      {
        name: 'Street',
        module: 'clients',
        tag: '[CLIENTSTREET]',
        selected: false,
      },
      {
        name: 'Street 2',
        module: 'clients',
        tag: '[CLIENTADDRESS2]',
        selected: false,
      },
      {
        name: 'Post code',
        module: 'clients',
        tag: '[CLIENTPOSTAL]',
        selected: false,
      },
      {
        name: 'County',
        module: 'clients',
        tag: '[CLIENTCOUNTY]',
        selected: false,
      },
      {
        name: 'Country',
        module: 'clients',
        tag: '[CLIENTCOUNTRY]',
        selected: false,
      },
      {
        name: 'Client preferences',
        module: 'clients',
        tag: '[CLIENT_PREFERENCES]',
        selected: false,
      },
      {
        name: 'Client form',
        module: 'clients',
        tag: '[CLIENTFORM]',
        selected: false,
      },
      {
        name: 'Client loyalty points',
        module: 'clients',
        tag: '[CLIENTLOYALTY]',
        selected: false,
      },
      {
        name: 'Number of sessions',
        module: 'clients',
        tag: 'NUMBER_OF_SESSIONS',
        selected: false,
      },
      {
        name: 'Client diagnosis code',
        module: 'clients',
        tag: 'DIAG_CODE',
        selected: false,
      },
      {
        name: 'Client mailing country',
        module: 'clients',
        tag: 'CLIENTMAILINGCOUNTRY',
        selected: false,
      },
      {
        name: 'Connect update information link',
        module: 'clients',
        tag: 'APPOINTMENTMANAGE',
        selected: false,
      },
      {
        name: 'Medical history form',
        module: 'clients',
        tag: 'MEDICAL_FORM',
        selected: false,
      },
      {
        name: 'Birthday voucher',
        module: 'clients',
        tag: 'BDAYVOUCHER',
        selected: false,
      },
      {
        name: 'Prescription date',
        module: 'clients',
        tag: 'PRESCRIPTION_DATE',
        selected: false,
      },
      {
        name: 'Prescriber name',
        module: 'clients',
        tag: 'PRESCRIBER_NAME',
        selected: false,
      },
      {
        name: 'Package name',
        module: 'clients',
        tag: 'PACKAGE_NAME',
        selected: false,
      },
      {
        name: 'Insurance name',
        module: 'clients',
        tag: 'CLIENT_INS_COMP',
        selected: false,
      },
      {
        name: 'Insurance contract',
        module: 'clients',
        tag: 'CLIENT_INS_CONTRACT',
        selected: false,
      },
      {
        name: 'Membership number',
        module: 'clients',
        tag: 'CLIENT_INS_MEM_NUM',
        selected: false,
      },
      {
        name: 'Insurance authorization code',
        module: 'clients',
        tag: 'CLIENT_INS_AUTH_CODE',
        selected: false,
      },
      {
        name: 'Insurance mobile',
        module: 'clients',
        tag: 'CLIENT_INS_MOBILE',
        selected: false,
      },
      {
        name: 'Insurance website',
        module: 'clients',
        tag: 'CLIENT_INS_WEBSITE',
        selected: false,
      },
      {
        name: 'Insurance city',
        module: 'clients',
        tag: 'CLIENT_INS_CITY',
        selected: false,
      },
      {
        name: 'Insurance street',
        module: 'clients',
        tag: 'CLIENT_INS_STREET',
        selected: false,
      },
      {
        name: 'Insurance county',
        module: 'clients',
        tag: 'CLIENT_INS_COUNTY',
        selected: false,
      },
      {
        name: 'Insurance postal',
        module: 'clients',
        tag: 'CLIENT_INS_POSTAL',
        selected: false,
      },
      {
        name: 'Insurance email',
        module: 'clients',
        tag: 'CLIENT_INS_EMAIL',
        selected: false,
      },
      {
        name: 'Insurance image',
        module: 'clients',
        tag: 'CLIENT_INS_IMAGE',
        selected: false,
      },
      {
        name: 'Insurance country',
        module: 'clients',
        tag: 'CLIENT_INS_COUNTRY',
        selected: false,
      },
      {
        name: 'Insurance street 2',
        module: 'clients',
        tag: 'CLIENT_INS_STREET2',
        selected: false,
      },
      {
        name: 'Insurance provider number',
        module: 'clients',
        tag: 'CLIENT_INS_PROVIDERNUM',
        selected: false,
      },
    ],
  },
  appointments: {
    displayName: 'Appointments',
    items: [
      {
        name: 'Appt Date',
        module: 'appointments',
        tag: '[ADATE]',
        selected: false,
      },
      {
        name: 'Appt Start Time',
        module: 'appointments',
        tag: '[ASTARTTIME]',
        selected: false,
      },
      {
        name: 'Appt End Time',
        module: 'appointments',
        tag: '[AENDTIME]',
        selected: false,
      },
      {
        name: 'Day',
        module: 'appointments',
        tag: '[AWEEKDAY]',
        selected: false,
      },
      {
        name: 'Type',
        module: 'appointments',
        tag: '[ATYPE]',
        selected: false,
      },
      {
        name: 'With',
        module: 'appointments',
        tag: '[AWITH]',
        selected: false,
      },
      {
        name: 'Location',
        module: 'appointments',
        tag: '[ALOCATIONNAME]',
        selected: false,
      },
      {
        name: 'Location address',
        module: 'appointments',
        tag: '[ALOCATIONADDRESS]',
        selected: false,
      },
      {
        name: 'Location address 2',
        module: 'appointments',
        tag: '[ALOCATIONADDRESS2]',
        selected: false,
      },
      {
        name: 'City',
        module: 'appointments',
        tag: '[ALOCATIONCITY]',
        selected: false,
      },
      {
        name: 'Post code',
        module: 'appointments',
        tag: '[ALOCATIONPOSTAL]',
        selected: false,
      },
      {
        name: 'Map Image',
        module: 'appointments',
        tag: '[ALOCATION_IMAGE]',
        selected: false,
      },
      {
        name: 'Reschedule from date',
        module: 'appointments',
        tag: '[RESCHEDULE_FROM_DATE]',
        selected: false,
      },
      {
        name: 'Reschedule from date and time',
        module: 'appointments',
        tag: '[RESCHEDULE_FROM_DATE_TIME]',
        selected: false,
      },
      {
        name: 'Reschedule to date',
        module: 'appointments',
        tag: '[RESCHEDULE_TO_DATE]',
        selected: false,
      },
      {
        name: 'Reschedule to date and time',
        module: 'appointments',
        tag: '[RESCHEDULE_TO_DATE_TIME]',
        selected: false,
      },
      {
        name: 'Location email',
        module: 'appointments',
        tag: '[ALOCATIONEMAIL]',
        selected: false,
      },
      {
        name: 'Location phone',
        module: 'appointments',
        tag: '[ALOCATIONPHONE]',
        selected: false,
      },
      {
        name: 'Location website',
        module: 'appointments',
        tag: '[ALOCATIONWEB]',
        selected: false,
      },
      {
        name: 'Appt Status',
        module: 'appointments',
        tag: '[APPOINTMENTSTATUS]',
        selected: false,
      },
      {
        name: 'Appt Cancel',
        module: 'appointments',
        tag: '[APPOINTMENTCANCEL]',
        selected: false,
      },
      {
        name: 'Appt Room',
        module: 'appointments',
        tag: '[APPOINTMENTROOM]',
        selected: false,
      },
      {
        name: 'Social survey',
        module: 'appointments',
        tag: '[SOCIALSURVEY]',
        selected: false,
      },
      {
        name: 'Social survey URL',
        module: 'appointments',
        tag: '[LINKSOCIALSURVEY]',
        selected: false,
      },
      {
        name: 'Appointment group bookings',
        module: 'appointments',
        tag: '[FULL_APPT_DETAILS]',
        selected: false,
      },
      {
        name: 'Video conference',
        module: 'appointments',
        tag: '[VIDEO_CONFERENCE]',
        selected: false,
      },
      {
        name: 'Service category',
        module: 'appointments',
        tag: '[SERVICE_CATEGORY]',
        selected: false,
      },
      {
        name: 'Master service category',
        module: 'appointments',
        tag: '[MASTER_CATEGORY]',
        selected: false,
      },
    ],
  },
  datetime: {
    displayName: 'Date and Time',
    items: [
      {
        name: 'Current date',
        module: 'datetime',
        tag: '[DATE]',
        selected: false,
      },
      {
        name: 'Current date 2',
        module: 'datetime',
        tag: '[DATE2]',
        selected: false,
      },
      {
        name: 'Current date & time friendly',
        module: 'datetime',
        tag: '[DATEFULL]',
        selected: false,
      },

      {
        name: 'Current date & time',
        module: 'datetime',
        tag: '[DATETIME]',
        selected: false,
      },

      {
        name: 'Current time',
        module: 'datetime',
        tag: '[TIME]',
        selected: false,
      },
    ],
  },
  company: {
    displayName: 'Company',
    items: [
      {
        name: 'Company ID',
        module: 'company',
        tag: '[COMPANYID]',
        selected: false,
      },
      {
        name: 'Name',
        module: 'company',
        tag: '[COMPANYNAME]',
        selected: false,
      },
      {
        name: 'Site',
        module: 'company',
        tag: '[COMPANYSITE]',
        selected: false,
      },
      {
        name: 'City',
        module: 'company',
        tag: '[COMPANYCITY]',
        selected: false,
      },
      {
        name: 'Street',
        module: 'company',
        tag: '[COMPANYSTREET]',
        selected: false,
      },
      {
        name: 'County',
        module: 'company',
        tag: '[COMPANYCOUNTRY]',
        selected: false,
      },
      {
        name: 'Post code',
        module: 'company',
        tag: '[COMPANYPOSTAL]',
        selected: false,
      },
      {
        name: 'Country',
        module: 'company',
        tag: '[COMPANYCOUNTY]',
        selected: false,
      },
      {
        name: 'Phone number',
        module: 'company',
        tag: '[COMPANYPHONE]',
        selected: false,
      },
      {
        name: 'Company logo',
        module: 'company',
        tag: '[COMPANYLOGO_IMG]',
        selected: false,
      },
    ],
  },
  invoice: {
    displayName: 'Invoice',
    items: [
      {
        name: 'Invoice number',
        module: 'invoice',
        tag: '[INVOICE_NUM]',
        selected: false,
      },
      {
        name: 'Invoice URL',
        module: 'invoice',
        tag: '[INVOICE_URL]',
        selected: false,
      },
      {
        name: 'Outstanding amount',
        module: 'invoice',
        tag: '[OUTSTANDING_AMOUNT]',
        selected: false,
      },
      {
        name: 'Invoice date',
        module: 'invoice',
        tag: '[INVOICEDATE]',
        selected: false,
      },
    ],
  },
  giftvoucher: {
    displayName: 'Gift voucher',
    items: [
      {
        name: 'Voucher code',
        module: 'giftvoucher',
        tag: '[VOUCHER_CODE]',
        selected: false,
      },
      {
        name: 'Voucher amount',
        module: 'giftvoucher',
        tag: '[VOUCHER_AMOUNT]',
        selected: false,
      },
      {
        name: 'Voucher QR',
        module: 'giftvoucher',
        tag: '[VOUCHER_QR]',
        selected: false,
      },
      {
        name: 'Voucher barcode',
        module: 'giftvoucher',
        tag: '[VOUCHER_BARCODE]',
        selected: false,
      },
      {
        name: 'Voucher expiry',
        module: 'giftvoucher',
        tag: '[VOUCHER_EXPIRY]',
        selected: false,
      },
      {
        name: 'Voucher first name',
        module: 'giftvoucher',
        tag: '[VOUCHER_FNAME]',
        selected: false,
      },
      {
        name: 'Voucher last name',
        module: 'giftvoucher',
        tag: '[VOUCHER_LNAME]',
        selected: false,
      },
      {
        name: 'Voucher full name',
        module: 'giftvoucher',
        tag: '[VOUCHER_FULLNAME]',
        selected: false,
      },
    ],
  },
  leads: {
    displayName: 'Leads',
    items: [
      {
        name: 'Name',
        module: 'leads',
        tag: '[LEADNAME]',
        selected: false,
      },
      {
        name: 'First Name',
        module: 'leads',
        tag: '[LEADFNAME]',
        selected: false,
      },
      {
        name: 'Last Name',
        module: 'leads',
        tag: '[LEADLNAME]',
        selected: false,
      },
      {
        name: 'Salutation',
        module: 'leads',
        tag: '[LEADTITLE]',
        selected: false,
      },
      {
        name: 'Email',
        module: 'leads',
        tag: '[LEADEMAIL]',
        selected: false,
      },
      {
        name: 'Mobile',
        module: 'leads',
        tag: '[LEADMOBILE]',
        selected: false,
      },
      {
        name: 'Phone',
        module: 'leads',
        tag: '[LEADPHONE]',
        selected: false,
      },
      {
        name: 'Last call date',
        module: 'leads',
        tag: '[LASTCALLDATE]',
        selected: false,
      },
      {
        name: 'Last call date and time',
        module: 'leads',
        tag: '[LASTCALLDATETIME]',
        selected: false,
      },
    ],
  },
  staff: {
    displayName: 'Staff',
    items: [
      {
        name: 'Full name',
        module: 'staff',
        tag: '[YOURNAME]',
        selected: false,
      },
      {
        name: 'First name',
        module: 'staff',
        tag: '[STAFFIRSTNAME]',
        selected: false,
      },
      {
        name: 'Last name',
        module: 'staff',
        tag: '[STAFFLASTNAME]',
        selected: false,
      },
      {
        name: 'Email',
        module: 'staff',
        tag: '[YOUREMAIL]',
        selected: false,
      },
      {
        name: 'Job title',
        module: 'staff',
        tag: '[YOURTITLE]',
        selected: false,
      },
      {
        name: 'Mobile',
        module: 'staff',
        tag: '[STAFFMOBILE]',
        selected: false,
      },
      {
        name: 'Signature',
        module: 'staff',
        tag: '[STAFF_SIGNATURE]',
        selected: false,
      },
    ],
  },
  opportunity: {
    displayName: 'Opportunity',
    items: [
      {
        name: 'Opportunity owner',
        module: 'opportunity',
        tag: '[OPPORTUNITY_OWNERFULLNAME]',
        selected: false,
      },
      {
        name: 'Opportunity owner mobile',
        module: 'opportunity',
        tag: '[OPPORTUNITY_OWNERMOBILE]',
        selected: false,
      },
      {
        name: 'Opportunity owner job position',
        module: 'opportunity',
        tag: '[OPPORTUNITY_OWNERJOBPOSITION]',
        selected: false,
      },
    ],
  },
  quickbook: {
    displayName: 'Quick book',
    items: [
      {
        name: 'Quickbook link',
        module: 'quickbook',
        tag: '[QUICKBOOK_LINK]',
        selected: false,
      },
      {
        name: 'Quickbook URL',
        module: 'quickbook',
        tag: '[QUICKBOOK_URL]',
        selected: false,
      },
      {
        name: 'Quickbook date and time',
        module: 'quickbook',
        tag: '[QUICKBOOK_DATETIME]',
        selected: false,
      },
      {
        name: 'Quickbook duration (minutes)',
        module: 'quickbook',
        tag: '[QUICKBOOK_DURATION_MINUTES]',
        selected: false,
      },
    ],
  },
  customfields: {
    displayName: 'Custom Fields',
    items: [
      {
        name: 'Custom Fields 1',
        module: 'customfields',
        tag: '[CUSTONEFIELDS1]',
        selected: false,
      },
    ],
  },
  forms: {
    displayName: 'Forms',
    items: [
      {
        name: 'Forms 1',
        module: 'forms',
        tag: '[FORMS1]',
        selected: false,
      },
    ],
  },
  connect: {
    displayName: 'Connect',
    items: [
      {
        name: 'Manage Appointment',
        module: 'connect',
        tag: '[CONNECT_MANAGE_APPOINTMENT]',
        selected: false,
      },
      {
        name: 'Cancel Appointment',
        module: 'connect',
        tag: '[CONNECT_CANCEL_APPOINTMENT]',
        selected: false,
      },
      {
        name: 'Reschedule appointment',
        module: 'connect',
        tag: '[CONNECT_RESCHEDULE_APPOINTMENT]',
        selected: false,
      },
      {
        name: 'Book Online',
        module: 'connect',
        tag: '[CONNECT_BOOK_ONLINE]',
        selected: false,
      },
      {
        name: 'View appointment details',
        module: 'connect',
        tag: '[CONNECT_APPOINTMENT_DETAIL]',
        selected: false,
      },
      {
        name: 'Upload a photo',
        module: 'connect',
        tag: '[CONNECT_UPLOAD_PHOTO]',
        selected: false,
      },
    ],
  },
}
