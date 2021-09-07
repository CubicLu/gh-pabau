import userAvatar from '../../assets/images/users/austin.png'
import t1 from '../../assets/images/template1.svg'
import t2 from '../../assets/images/template2.svg'
import t3 from '../../assets/images/template3.svg'
import t4 from '../../assets/images/template4.svg'
import t5 from '../../assets/images/template5.svg'
import image1 from '../../assets/images/attach-dialog/sample/image3.png'
import image2 from '../../assets/images/attach-dialog/sample/image4.png'
export const allDocument = [
  {
    key: 0,
    title: 'COVID19 - Consent',
    category: 'Forms',
    image: t1,
    url:
      'https://www.plasticsurgery.org/documents/medical-professionals/COVID19-Informed-Consent.pdf',
  },
  {
    key: 1,
    title: 'Case: Consulatation',
    category: 'Forms',
    image: t2,
    url:
      'https://www.plasticsurgery.org/documents/medical-professionals/COVID19-Informed-Consent.pdf',
  },
  {
    key: 2,
    title: 'Past Medical History',
    category: 'Forms',
    image: t3,
    url:
      'https://www.plasticsurgery.org/documents/medical-professionals/COVID19-Informed-Consent.pdf',
  },
  {
    key: 3,
    title: 'Social History',
    category: 'Forms',
    image: t4,
    url:
      'https://www.plasticsurgery.org/documents/medical-professionals/COVID19-Informed-Consent.pdf',
  },
  {
    key: 4,
    title: 'DL7 test',
    category: 'Lab results',
    image: t5,
    url:
      'https://www.plasticsurgery.org/documents/medical-professionals/COVID19-Informed-Consent.pdf',
  },
  {
    key: 5,
    title: 'Back photo',
    category: 'Photos',
    image: image1,
    url:
      'https://st.depositphotos.com/1005018/2093/i/950/depositphotos_20938715-stock-photo-back.jpg',
  },
  {
    key: 6,
    title: 'Eye Photo',
    category: 'Photos',
    image: image2,
    url:
      'https://st.depositphotos.com/1005018/2093/i/950/depositphotos_20938715-stock-photo-back.jpg',
  },
]
export const categoryOptions = [
  {
    key: 0,
    content: 'Letters',
  },
  {
    key: 1,
    content: 'Invoice',
  },
  {
    key: 2,
    content: 'Felicitation',
  },
  {
    key: 3,
    content: 'Invitation',
  },
]
export const topCategories = [
  {
    key: 0,
    title: 'All',
  },
  {
    key: 1,
    title: 'Letters',
  },
  {
    key: 2,
    title: 'Quotes',
  },
  {
    key: 3,
    title: 'Other',
  },
  {
    key: 4,
    title: 'Uncategorized',
  },
]
export const recipientList = [
  {
    relationship: 'emergency-contact',
    firstName: 'Bruno',
    lastName: 'Ballardin',
    email: 'bruno.ballardin@example.com',
    avatar: userAvatar,
    mergeTag: [
      {
        value: 'Bruno Ballardin',
        tag: '[APPOINTMENTNAME]',
      },
      {
        value: 'Bruno',
        tag: '[APPOINTMENTFIRSTNAME]',
      },
      {
        value: 'Ballardin',
        tag: '[APPOINTMENTLASTNAME]',
      },
      {
        value: 'bruno.ballardin@example.com',
        tag: '[CLIENTEMAIL]',
      },
      {
        value: 'Date of birth',
        tag: '[CLIENTDOB]',
      },
      {
        value: 'Gender',
        tag: '[CLIENTGENDER]',
      },
      {
        value: 'Home phone number',
        tag: '[CLIENTPHONE]',
      },
      {
        value: 'Mobile phone number',
        tag: '[CLIENTMOBILE]',
      },
      {
        value: 'Client ID',
        tag: '[CLIENTID]',
      },
      {
        value: 'Salutation',
        tag: '[CLIENTSALUTATION]',
      },
      {
        value: 'Full Address',
        tag: '[FULLADDRESS]',
      },
      {
        value: 'Full Address Other',
        tag: '[FULLADDRESS2]',
      },
      {
        value: 'City',
        tag: '[CLIENTCITY]',
      },
      {
        value: 'Street',
        tag: '[CLIENTSTREET]',
      },
      {
        value: 'Street 2',
        tag: '[CLIENTADDRESS2]',
      },
      {
        value: 'Post code',
        tag: '[CLIENTPOSTAL]',
      },
      {
        value: 'County',
        tag: '[CLIENTCOUNTY]',
      },
      {
        value: 'Country',
        tag: '[CLIENTCOUNTRY]',
      },
      {
        value: 'Client preferences',
        tag: '[CLIENT_PREFERENCES]',
      },
      {
        value: 'Client form',
        tag: '[CLIENTFORM]',
      },
      {
        value: 'Client loyalty points',
        tag: '[CLIENTLOYALTY]',
      },
      {
        value: 'Number of sessions',
        tag: 'NUMBER_OF_SESSIONS',
      },
      {
        value: 'Client diagnosis code',
        tag: 'DIAG_CODE',
      },
      {
        value: 'Client mailing country',
        tag: 'CLIENTMAILINGCOUNTRY',
      },
      {
        value: 'Connect update information link',
        tag: 'APPOINTMENTMANAGE',
      },
      {
        value: 'Medical history form',
        tag: 'MEDICAL_FORM',
      },
      {
        value: 'Birthday voucher',
        tag: 'BDAYVOUCHER',
      },
      {
        value: 'Prescription date',
        tag: 'PRESCRIPTION_DATE',
      },
      {
        value: 'Prescriber name',
        tag: 'PRESCRIBER_NAME',
      },
      {
        value: 'Package name',
        tag: 'PACKAGE_NAME',
      },
      {
        value: 'Insurance name',
        tag: 'CLIENT_INS_COMP',
      },
      {
        value: 'Insurance contract',
        tag: 'CLIENT_INS_CONTRACT',
      },
      {
        value: 'Membership number',
        tag: 'CLIENT_INS_MEM_NUM',
      },
      {
        value: 'Insurance authorization code',
        tag: 'CLIENT_INS_AUTH_CODE',
      },
      {
        value: 'Insurance mobile',
        tag: 'CLIENT_INS_MOBILE',
      },
      {
        value: 'Insurance website',
        tag: 'CLIENT_INS_WEBSITE',
      },
      {
        value: 'Insurance city',
        tag: 'CLIENT_INS_CITY',
      },
      {
        value: 'Insurance street',
        tag: 'CLIENT_INS_STREET',
      },
      {
        value: 'Insurance county',
        tag: 'CLIENT_INS_COUNTY',
      },
      {
        value: 'Insurance postal',
        tag: 'CLIENT_INS_POSTAL',
      },
      {
        value: 'Insurance email',
        tag: 'CLIENT_INS_EMAIL',
      },
      {
        value: 'Insurance image',
        tag: 'CLIENT_INS_IMAGE',
      },
      {
        value: 'Insurance country',
        tag: 'CLIENT_INS_COUNTRY',
      },
      {
        value: 'Insurance street 2',
        tag: 'CLIENT_INS_STREET2',
      },
      {
        value: 'Insurance provider number',
        tag: 'CLIENT_INS_PROVIDERNUM',
      },
      {
        value: 'Staff Email',
        tag: '[APPOINTMENTSTAFFEMAIL]',
      },
      {
        value: 'Appt Date',
        tag: '[ADATE]',
      },
      {
        value: 'Appt Start Time',
        tag: '[ASTARTTIME]',
      },
      {
        value: 'Appt End Time',
        tag: '[AENDTIME]',
      },
      {
        value: 'Day',
        tag: '[AWEEKDAY]',
      },
      {
        value: 'Type',
        tag: '[ATYPE]',
      },
      {
        value: 'With',
        tag: '[AWITH]',
      },
      {
        value: 'Location',
        tag: '[ALOCATIONNAME]',
      },
      {
        value: 'Location address',
        tag: '[ALOCATIONADDRESS]',
      },
      {
        value: 'Location address 2',
        tag: '[ALOCATIONADDRESS2]',
      },
      {
        value: 'City',
        tag: '[ALOCATIONCITY]',
      },
      {
        value: 'Post code',
        tag: '[ALOCATIONPOSTAL]',
      },
      {
        value: 'Map Image',
        tag: '[ALOCATION_IMAGE]',
      },
      {
        value: 'Reschedule from date',
        tag: '[RESCHEDULE_FROM_DATE]',
      },
      {
        value: 'Reschedule from date and time',
        tag: '[RESCHEDULE_FROM_DATE_TIME]',
      },
      {
        value: 'Reschedule to date',
        tag: '[RESCHEDULE_TO_DATE]',
      },
      {
        value: 'Reschedule to date and time',
        tag: '[RESCHEDULE_TO_DATE_TIME]',
      },
      {
        value: 'Location email',
        tag: '[ALOCATIONEMAIL]',
      },
      {
        value: 'Location phone',
        tag: '[ALOCATIONPHONE]',
      },
      {
        value: 'Location website',
        tag: '[ALOCATIONWEB]',
      },
      {
        value: 'Appt Status',
        tag: '[APPOINTMENTSTATUS]',
      },
      {
        value: 'Appt Cancel',
        tag: '[APPOINTMENTCANCEL]',
      },
      {
        value: 'Appt Room',
        tag: '[APPOINTMENTROOM]',
      },
      {
        value: 'Social survey',
        tag: '[SOCIALSURVEY]',
      },
      {
        value: 'Social survey URL',
        tag: '[LINKSOCIALSURVEY]',
      },
      {
        value: 'Appointment group bookings',
        tag: '[FULL_APPT_DETAILS]',
      },
      {
        value: 'Video conference',
        tag: '[VIDEO_CONFERENCE]',
      },
      {
        value: 'Service category',
        tag: '[SERVICE_CATEGORY]',
      },
      {
        value: 'Master service category',
        tag: '[MASTER_CATEGORY]',
      },
      {
        value: 'Current date',
        tag: '[DATE]',
      },
      {
        value: 'Current date 2',
        tag: '[DATE2]',
      },
      {
        value: 'Current date & time friendly',
        tag: '[DATEFULL]',
      },
      {
        value: 'Current date & time',
        tag: '[DATETIME]',
      },
      {
        value: 'Current time',
        tag: '[TIME]',
      },
      {
        value: 'Company ID',
        tag: '[COMPANYID]',
      },
      {
        value: 'Name',
        tag: '[COMPANYNAME]',
      },
      {
        value: 'Site',
        tag: '[COMPANYSITE]',
      },
      {
        value: 'City',
        tag: '[COMPANYCITY]',
      },
      {
        value: 'Street',
        tag: '[COMPANYSTREET]',
      },
      {
        value: 'County',
        tag: '[COMPANYCOUNTRY]',
      },
      {
        value: 'Post code',
        tag: '[COMPANYPOSTAL]',
      },
      {
        value: 'Country',
        tag: '[COMPANYCOUNTY]',
      },
      {
        value: 'Phone number',
        tag: '[COMPANYPHONE]',
      },
      {
        value: 'Company logo',
        tag: '[COMPANYLOGO_IMG]',
      },
      {
        value: 'Invoice number',
        tag: '[INVOICE_NUM]',
      },
      {
        value: 'Invoice URL',
        tag: '[INVOICE_URL]',
      },
      {
        value: 'Outstanding amount',
        tag: '[OUTSTANDING_AMOUNT]',
      },
      {
        value: 'Invoice date',
        tag: '[INVOICEDATE]',
      },
      {
        value: 'Voucher code',
        tag: '[VOUCHER_CODE]',
      },
      {
        value: 'Voucher amount',
        tag: '[VOUCHER_AMOUNT]',
      },
      {
        value: 'Voucher QR',
        tag: '[VOUCHER_QR]',
      },
      {
        value: 'Voucher barcode',
        tag: '[VOUCHER_BARCODE]',
      },
      {
        value: 'Voucher expiry',
        tag: '[VOUCHER_EXPIRY]',
      },
      {
        value: 'Voucher first name',
        tag: '[VOUCHER_FNAME]',
      },
      {
        value: 'Voucher last name',
        tag: '[VOUCHER_LNAME]',
      },
      {
        value: 'Voucher full name',
        tag: '[VOUCHER_FULLNAME]',
      },
      {
        value: 'Name',
        tag: '[LEADNAME]',
      },
      {
        value: 'First Name',
        tag: '[LEADFNAME]',
      },
      {
        value: 'Last Name',
        tag: '[LEADLNAME]',
      },
      {
        value: 'Salutation',
        tag: '[LEADTITLE]',
      },
      {
        value: 'Email',
        tag: '[LEADEMAIL]',
      },
      {
        value: 'Mobile',
        tag: '[LEADMOBILE]',
      },
      {
        value: 'Phone',
        tag: '[LEADPHONE]',
      },
      {
        value: 'Last call date',
        tag: '[LASTCALLDATE]',
      },
      {
        value: 'Last call date and time',
        tag: '[LASTCALLDATETIME]',
      },
      {
        value: 'Full name',
        tag: '[YOURNAME]',
      },
      {
        value: 'First name',
        tag: '[STAFFIRSTNAME]',
      },
      {
        value: 'Last name',
        tag: '[STAFFLASTNAME]',
      },
      {
        value: 'Email',
        tag: '[YOUREMAIL]',
      },
      {
        value: 'Job title',
        tag: '[YOURTITLE]',
      },
      {
        value: 'Mobile',
        tag: '[STAFFMOBILE]',
      },
      {
        value: 'Signature',
        tag: '[STAFF_SIGNATURE]',
      },
      {
        value: 'Opportunity owner',
        tag: '[OPPORTUNITY_OWNERFULLNAME]',
      },
      {
        value: 'Opportunity owner mobile',
        tag: '[OPPORTUNITY_OWNERMOBILE]',
      },
      {
        value: 'Opportunity owner job position',
        tag: '[OPPORTUNITY_OWNERJOBPOSITION]',
      },
      {
        value: 'Quickbook link',
        tag: '[QUICKBOOK_LINK]',
      },
      {
        value: 'Quickbook URL',
        tag: '[QUICKBOOK_URL]',
      },
      {
        value: 'Quickbook date and time',
        tag: '[QUICKBOOK_DATETIME]',
      },
      {
        value: 'Quickbook duration (minutes)',
        tag: '[QUICKBOOK_DURATION_MINUTES]',
      },
      {
        value: 'Custom Fields 1',
        tag: '[CUSTONEFIELDS1]',
      },
      {
        value: 'Forms 1',
        tag: '[FORMS1]',
      },
      {
        value: 'Manage Appointment',
        tag: '[CONNECT_MANAGE_APPOINTMENT]',
      },
      {
        value: 'Cancel Appointment',
        tag: '[CONNECT_CANCEL_APPOINTMENT]',
      },
      {
        value: 'Reschedule appointment',
        tag: '[CONNECT_RESCHEDULE_APPOINTMENT]',
      },
      {
        value: 'Book Online',
        tag: '[CONNECT_BOOK_ONLINE]',
      },
      {
        value: 'View appointment details',
        tag: '[CONNECT_APPOINTMENT_DETAIL]',
      },
      {
        value: 'Upload a photo',
        tag: '[CONNECT_UPLOAD_PHOTO]',
      },
    ],
  },
  {
    relationship: 'family-member',
    firstName: 'Jessica',
    lastName: 'Winter',
    email: 'jessica.winter@example.com',
    avatar: userAvatar,
    mergeTag: [
      {
        value: 'jessica.winter',
        tag: '[APPOINTMENTNAME]',
      },
      {
        value: 'jessica',
        tag: '[APPOINTMENTFIRSTNAME]',
      },
      {
        value: 'winter',
        tag: '[APPOINTMENTLASTNAME]',
      },
      {
        value: 'jessica.winter@example.com',
        tag: '[CLIENTEMAIL]',
      },
      {
        value: 'Date of birth',
        tag: '[CLIENTDOB]',
      },
      {
        value: 'Gender',
        tag: '[CLIENTGENDER]',
      },
      {
        value: 'Home phone number',
        tag: '[CLIENTPHONE]',
      },
      {
        value: 'Mobile phone number',
        tag: '[CLIENTMOBILE]',
      },
      {
        value: 'Client ID',
        tag: '[CLIENTID]',
      },
      {
        value: 'Salutation',
        tag: '[CLIENTSALUTATION]',
      },
      {
        value: 'Full Address',
        tag: '[FULLADDRESS]',
      },
      {
        value: 'Full Address Other',
        tag: '[FULLADDRESS2]',
      },
      {
        value: 'City',
        tag: '[CLIENTCITY]',
      },
      {
        value: 'Street',
        tag: '[CLIENTSTREET]',
      },
      {
        value: 'Street 2',
        tag: '[CLIENTADDRESS2]',
      },
      {
        value: 'Post code',
        tag: '[CLIENTPOSTAL]',
      },
      {
        value: 'County',
        tag: '[CLIENTCOUNTY]',
      },
      {
        value: 'Country',
        tag: '[CLIENTCOUNTRY]',
      },
      {
        value: 'Client preferences',
        tag: '[CLIENT_PREFERENCES]',
      },
      {
        value: 'Client form',
        tag: '[CLIENTFORM]',
      },
      {
        value: 'Client loyalty points',
        tag: '[CLIENTLOYALTY]',
      },
      {
        value: 'Number of sessions',
        tag: 'NUMBER_OF_SESSIONS',
      },
      {
        value: 'Client diagnosis code',
        tag: 'DIAG_CODE',
      },
      {
        value: 'Client mailing country',
        tag: 'CLIENTMAILINGCOUNTRY',
      },
      {
        value: 'Connect update information link',
        tag: 'APPOINTMENTMANAGE',
      },
      {
        value: 'Medical history form',
        tag: 'MEDICAL_FORM',
      },
      {
        value: 'Birthday voucher',
        tag: 'BDAYVOUCHER',
      },
      {
        value: 'Prescription date',
        tag: 'PRESCRIPTION_DATE',
      },
      {
        value: 'Prescriber name',
        tag: 'PRESCRIBER_NAME',
      },
      {
        value: 'Package name',
        tag: 'PACKAGE_NAME',
      },
      {
        value: 'Insurance name',
        tag: 'CLIENT_INS_COMP',
      },
      {
        value: 'Insurance contract',
        tag: 'CLIENT_INS_CONTRACT',
      },
      {
        value: 'Membership number',
        tag: 'CLIENT_INS_MEM_NUM',
      },
      {
        value: 'Insurance authorization code',
        tag: 'CLIENT_INS_AUTH_CODE',
      },
      {
        value: 'Insurance mobile',
        tag: 'CLIENT_INS_MOBILE',
      },
      {
        value: 'Insurance website',
        tag: 'CLIENT_INS_WEBSITE',
      },
      {
        value: 'Insurance city',
        tag: 'CLIENT_INS_CITY',
      },
      {
        value: 'Insurance street',
        tag: 'CLIENT_INS_STREET',
      },
      {
        value: 'Insurance county',
        tag: 'CLIENT_INS_COUNTY',
      },
      {
        value: 'Insurance postal',
        tag: 'CLIENT_INS_POSTAL',
      },
      {
        value: 'Insurance email',
        tag: 'CLIENT_INS_EMAIL',
      },
      {
        value: 'Insurance image',
        tag: 'CLIENT_INS_IMAGE',
      },
      {
        value: 'Insurance country',
        tag: 'CLIENT_INS_COUNTRY',
      },
      {
        value: 'Insurance street 2',
        tag: 'CLIENT_INS_STREET2',
      },
      {
        value: 'Insurance provider number',
        tag: 'CLIENT_INS_PROVIDERNUM',
      },
      {
        value: 'Staff Email',
        tag: '[APPOINTMENTSTAFFEMAIL]',
      },
      {
        value: 'Appt Date',
        tag: '[ADATE]',
      },
      {
        value: 'Appt Start Time',
        tag: '[ASTARTTIME]',
      },
      {
        value: 'Appt End Time',
        tag: '[AENDTIME]',
      },
      {
        value: 'Day',
        tag: '[AWEEKDAY]',
      },
      {
        value: 'Type',
        tag: '[ATYPE]',
      },
      {
        value: 'With',
        tag: '[AWITH]',
      },
      {
        value: 'Location',
        tag: '[ALOCATIONNAME]',
      },
      {
        value: 'Location address',
        tag: '[ALOCATIONADDRESS]',
      },
      {
        value: 'Location address 2',
        tag: '[ALOCATIONADDRESS2]',
      },
      {
        value: 'City',
        tag: '[ALOCATIONCITY]',
      },
      {
        value: 'Post code',
        tag: '[ALOCATIONPOSTAL]',
      },
      {
        value: 'Map Image',
        tag: '[ALOCATION_IMAGE]',
      },
      {
        value: 'Reschedule from date',
        tag: '[RESCHEDULE_FROM_DATE]',
      },
      {
        value: 'Reschedule from date and time',
        tag: '[RESCHEDULE_FROM_DATE_TIME]',
      },
      {
        value: 'Reschedule to date',
        tag: '[RESCHEDULE_TO_DATE]',
      },
      {
        value: 'Reschedule to date and time',
        tag: '[RESCHEDULE_TO_DATE_TIME]',
      },
      {
        value: 'Location email',
        tag: '[ALOCATIONEMAIL]',
      },
      {
        value: 'Location phone',
        tag: '[ALOCATIONPHONE]',
      },
      {
        value: 'Location website',
        tag: '[ALOCATIONWEB]',
      },
      {
        value: 'Appt Status',
        tag: '[APPOINTMENTSTATUS]',
      },
      {
        value: 'Appt Cancel',
        tag: '[APPOINTMENTCANCEL]',
      },
      {
        value: 'Appt Room',
        tag: '[APPOINTMENTROOM]',
      },
      {
        value: 'Social survey',
        tag: '[SOCIALSURVEY]',
      },
      {
        value: 'Social survey URL',
        tag: '[LINKSOCIALSURVEY]',
      },
      {
        value: 'Appointment group bookings',
        tag: '[FULL_APPT_DETAILS]',
      },
      {
        value: 'Video conference',
        tag: '[VIDEO_CONFERENCE]',
      },
      {
        value: 'Service category',
        tag: '[SERVICE_CATEGORY]',
      },
      {
        value: 'Master service category',
        tag: '[MASTER_CATEGORY]',
      },
      {
        value: 'Current date',
        tag: '[DATE]',
      },
      {
        value: 'Current date 2',
        tag: '[DATE2]',
      },
      {
        value: 'Current date & time friendly',
        tag: '[DATEFULL]',
      },
      {
        value: 'Current date & time',
        tag: '[DATETIME]',
      },
      {
        value: 'Current time',
        tag: '[TIME]',
      },
      {
        value: 'Company ID',
        tag: '[COMPANYID]',
      },
      {
        value: 'Name',
        tag: '[COMPANYNAME]',
      },
      {
        value: 'Site',
        tag: '[COMPANYSITE]',
      },
      {
        value: 'City',
        tag: '[COMPANYCITY]',
      },
      {
        value: 'Street',
        tag: '[COMPANYSTREET]',
      },
      {
        value: 'County',
        tag: '[COMPANYCOUNTRY]',
      },
      {
        value: 'Post code',
        tag: '[COMPANYPOSTAL]',
      },
      {
        value: 'Country',
        tag: '[COMPANYCOUNTY]',
      },
      {
        value: 'Phone number',
        tag: '[COMPANYPHONE]',
      },
      {
        value: 'Company logo',
        tag: '[COMPANYLOGO_IMG]',
      },
      {
        value: 'Invoice number',
        tag: '[INVOICE_NUM]',
      },
      {
        value: 'Invoice URL',
        tag: '[INVOICE_URL]',
      },
      {
        value: 'Outstanding amount',
        tag: '[OUTSTANDING_AMOUNT]',
      },
      {
        value: 'Invoice date',
        tag: '[INVOICEDATE]',
      },
      {
        value: 'Voucher code',
        tag: '[VOUCHER_CODE]',
      },
      {
        value: 'Voucher amount',
        tag: '[VOUCHER_AMOUNT]',
      },
      {
        value: 'Voucher QR',
        tag: '[VOUCHER_QR]',
      },
      {
        value: 'Voucher barcode',
        tag: '[VOUCHER_BARCODE]',
      },
      {
        value: 'Voucher expiry',
        tag: '[VOUCHER_EXPIRY]',
      },
      {
        value: 'Voucher first name',
        tag: '[VOUCHER_FNAME]',
      },
      {
        value: 'Voucher last name',
        tag: '[VOUCHER_LNAME]',
      },
      {
        value: 'Voucher full name',
        tag: '[VOUCHER_FULLNAME]',
      },
      {
        value: 'Name',
        tag: '[LEADNAME]',
      },
      {
        value: 'First Name',
        tag: '[LEADFNAME]',
      },
      {
        value: 'Last Name',
        tag: '[LEADLNAME]',
      },
      {
        value: 'Salutation',
        tag: '[LEADTITLE]',
      },
      {
        value: 'Email',
        tag: '[LEADEMAIL]',
      },
      {
        value: 'Mobile',
        tag: '[LEADMOBILE]',
      },
      {
        value: 'Phone',
        tag: '[LEADPHONE]',
      },
      {
        value: 'Last call date',
        tag: '[LASTCALLDATE]',
      },
      {
        value: 'Last call date and time',
        tag: '[LASTCALLDATETIME]',
      },
      {
        value: 'Full name',
        tag: '[YOURNAME]',
      },
      {
        value: 'First name',
        tag: '[STAFFIRSTNAME]',
      },
      {
        value: 'Last name',
        tag: '[STAFFLASTNAME]',
      },
      {
        value: 'Email',
        tag: '[YOUREMAIL]',
      },
      {
        value: 'Job title',
        tag: '[YOURTITLE]',
      },
      {
        value: 'Mobile',
        tag: '[STAFFMOBILE]',
      },
      {
        value: 'Signature',
        tag: '[STAFF_SIGNATURE]',
      },
      {
        value: 'Opportunity owner',
        tag: '[OPPORTUNITY_OWNERFULLNAME]',
      },
      {
        value: 'Opportunity owner mobile',
        tag: '[OPPORTUNITY_OWNERMOBILE]',
      },
      {
        value: 'Opportunity owner job position',
        tag: '[OPPORTUNITY_OWNERJOBPOSITION]',
      },
      {
        value: 'Quickbook link',
        tag: '[QUICKBOOK_LINK]',
      },
      {
        value: 'Quickbook URL',
        tag: '[QUICKBOOK_URL]',
      },
      {
        value: 'Quickbook date and time',
        tag: '[QUICKBOOK_DATETIME]',
      },
      {
        value: 'Quickbook duration (minutes)',
        tag: '[QUICKBOOK_DURATION_MINUTES]',
      },
      {
        value: 'Custom Fields 1',
        tag: '[CUSTONEFIELDS1]',
      },
      {
        value: 'Forms 1',
        tag: '[FORMS1]',
      },
      {
        value: 'Manage Appointment',
        tag: '[CONNECT_MANAGE_APPOINTMENT]',
      },
      {
        value: 'Cancel Appointment',
        tag: '[CONNECT_CANCEL_APPOINTMENT]',
      },
      {
        value: 'Reschedule appointment',
        tag: '[CONNECT_RESCHEDULE_APPOINTMENT]',
      },
      {
        value: 'Book Online',
        tag: '[CONNECT_BOOK_ONLINE]',
      },
      {
        value: 'View appointment details',
        tag: '[CONNECT_APPOINTMENT_DETAIL]',
      },
      {
        value: 'Upload a photo',
        tag: '[CONNECT_UPLOAD_PHOTO]',
      },
    ],
  },
  {
    relationship: 'family-member',
    firstName: 'Jeff',
    lastName: 'Koons',
    email: 'jeff.koons@example.com',
    avatar: userAvatar,
    mergeTag: [
      {
        value: 'jeff.koons',
        tag: '[APPOINTMENTNAME]',
      },
      {
        value: 'jeff',
        tag: '[APPOINTMENTFIRSTNAME]',
      },
      {
        value: 'koons',
        tag: '[APPOINTMENTLASTNAME]',
      },
      {
        value: 'jeff.koons@example.com',
        tag: '[CLIENTEMAIL]',
      },
      {
        value: 'Date of birth',
        tag: '[CLIENTDOB]',
      },
      {
        value: 'Gender',
        tag: '[CLIENTGENDER]',
      },
      {
        value: 'Home phone number',
        tag: '[CLIENTPHONE]',
      },
      {
        value: 'Mobile phone number',
        tag: '[CLIENTMOBILE]',
      },
      {
        value: 'Client ID',
        tag: '[CLIENTID]',
      },
      {
        value: 'Salutation',
        tag: '[CLIENTSALUTATION]',
      },
      {
        value: 'Full Address',
        tag: '[FULLADDRESS]',
      },
      {
        value: 'Full Address Other',
        tag: '[FULLADDRESS2]',
      },
      {
        value: 'City',
        tag: '[CLIENTCITY]',
      },
      {
        value: 'Street',
        tag: '[CLIENTSTREET]',
      },
      {
        value: 'Street 2',
        tag: '[CLIENTADDRESS2]',
      },
      {
        value: 'Post code',
        tag: '[CLIENTPOSTAL]',
      },
      {
        value: 'County',
        tag: '[CLIENTCOUNTY]',
      },
      {
        value: 'Country',
        tag: '[CLIENTCOUNTRY]',
      },
      {
        value: 'Client preferences',
        tag: '[CLIENT_PREFERENCES]',
      },
      {
        value: 'Client form',
        tag: '[CLIENTFORM]',
      },
      {
        value: 'Client loyalty points',
        tag: '[CLIENTLOYALTY]',
      },
      {
        value: 'Number of sessions',
        tag: 'NUMBER_OF_SESSIONS',
      },
      {
        value: 'Client diagnosis code',
        tag: 'DIAG_CODE',
      },
      {
        value: 'Client mailing country',
        tag: 'CLIENTMAILINGCOUNTRY',
      },
      {
        value: 'Connect update information link',
        tag: 'APPOINTMENTMANAGE',
      },
      {
        value: 'Medical history form',
        tag: 'MEDICAL_FORM',
      },
      {
        value: 'Birthday voucher',
        tag: 'BDAYVOUCHER',
      },
      {
        value: 'Prescription date',
        tag: 'PRESCRIPTION_DATE',
      },
      {
        value: 'Prescriber name',
        tag: 'PRESCRIBER_NAME',
      },
      {
        value: 'Package name',
        tag: 'PACKAGE_NAME',
      },
      {
        value: 'Insurance name',
        tag: 'CLIENT_INS_COMP',
      },
      {
        value: 'Insurance contract',
        tag: 'CLIENT_INS_CONTRACT',
      },
      {
        value: 'Membership number',
        tag: 'CLIENT_INS_MEM_NUM',
      },
      {
        value: 'Insurance authorization code',
        tag: 'CLIENT_INS_AUTH_CODE',
      },
      {
        value: 'Insurance mobile',
        tag: 'CLIENT_INS_MOBILE',
      },
      {
        value: 'Insurance website',
        tag: 'CLIENT_INS_WEBSITE',
      },
      {
        value: 'Insurance city',
        tag: 'CLIENT_INS_CITY',
      },
      {
        value: 'Insurance street',
        tag: 'CLIENT_INS_STREET',
      },
      {
        value: 'Insurance county',
        tag: 'CLIENT_INS_COUNTY',
      },
      {
        value: 'Insurance postal',
        tag: 'CLIENT_INS_POSTAL',
      },
      {
        value: 'Insurance email',
        tag: 'CLIENT_INS_EMAIL',
      },
      {
        value: 'Insurance image',
        tag: 'CLIENT_INS_IMAGE',
      },
      {
        value: 'Insurance country',
        tag: 'CLIENT_INS_COUNTRY',
      },
      {
        value: 'Insurance street 2',
        tag: 'CLIENT_INS_STREET2',
      },
      {
        value: 'Insurance provider number',
        tag: 'CLIENT_INS_PROVIDERNUM',
      },
      {
        value: 'Staff Email',
        tag: '[APPOINTMENTSTAFFEMAIL]',
      },
      {
        value: 'Appt Date',
        tag: '[ADATE]',
      },
      {
        value: 'Appt Start Time',
        tag: '[ASTARTTIME]',
      },
      {
        value: 'Appt End Time',
        tag: '[AENDTIME]',
      },
      {
        value: 'Day',
        tag: '[AWEEKDAY]',
      },
      {
        value: 'Type',
        tag: '[ATYPE]',
      },
      {
        value: 'With',
        tag: '[AWITH]',
      },
      {
        value: 'Location',
        tag: '[ALOCATIONNAME]',
      },
      {
        value: 'Location address',
        tag: '[ALOCATIONADDRESS]',
      },
      {
        value: 'Location address 2',
        tag: '[ALOCATIONADDRESS2]',
      },
      {
        value: 'City',
        tag: '[ALOCATIONCITY]',
      },
      {
        value: 'Post code',
        tag: '[ALOCATIONPOSTAL]',
      },
      {
        value: 'Map Image',
        tag: '[ALOCATION_IMAGE]',
      },
      {
        value: 'Reschedule from date',
        tag: '[RESCHEDULE_FROM_DATE]',
      },
      {
        value: 'Reschedule from date and time',
        tag: '[RESCHEDULE_FROM_DATE_TIME]',
      },
      {
        value: 'Reschedule to date',
        tag: '[RESCHEDULE_TO_DATE]',
      },
      {
        value: 'Reschedule to date and time',
        tag: '[RESCHEDULE_TO_DATE_TIME]',
      },
      {
        value: 'Location email',
        tag: '[ALOCATIONEMAIL]',
      },
      {
        value: 'Location phone',
        tag: '[ALOCATIONPHONE]',
      },
      {
        value: 'Location website',
        tag: '[ALOCATIONWEB]',
      },
      {
        value: 'Appt Status',
        tag: '[APPOINTMENTSTATUS]',
      },
      {
        value: 'Appt Cancel',
        tag: '[APPOINTMENTCANCEL]',
      },
      {
        value: 'Appt Room',
        tag: '[APPOINTMENTROOM]',
      },
      {
        value: 'Social survey',
        tag: '[SOCIALSURVEY]',
      },
      {
        value: 'Social survey URL',
        tag: '[LINKSOCIALSURVEY]',
      },
      {
        value: 'Appointment group bookings',
        tag: '[FULL_APPT_DETAILS]',
      },
      {
        value: 'Video conference',
        tag: '[VIDEO_CONFERENCE]',
      },
      {
        value: 'Service category',
        tag: '[SERVICE_CATEGORY]',
      },
      {
        value: 'Master service category',
        tag: '[MASTER_CATEGORY]',
      },
      {
        value: 'Current date',
        tag: '[DATE]',
      },
      {
        value: 'Current date 2',
        tag: '[DATE2]',
      },
      {
        value: 'Current date & time friendly',
        tag: '[DATEFULL]',
      },
      {
        value: 'Current date & time',
        tag: '[DATETIME]',
      },
      {
        value: 'Current time',
        tag: '[TIME]',
      },
      {
        value: 'Company ID',
        tag: '[COMPANYID]',
      },
      {
        value: 'Name',
        tag: '[COMPANYNAME]',
      },
      {
        value: 'Site',
        tag: '[COMPANYSITE]',
      },
      {
        value: 'City',
        tag: '[COMPANYCITY]',
      },
      {
        value: 'Street',
        tag: '[COMPANYSTREET]',
      },
      {
        value: 'County',
        tag: '[COMPANYCOUNTRY]',
      },
      {
        value: 'Post code',
        tag: '[COMPANYPOSTAL]',
      },
      {
        value: 'Country',
        tag: '[COMPANYCOUNTY]',
      },
      {
        value: 'Phone number',
        tag: '[COMPANYPHONE]',
      },
      {
        value: 'Company logo',
        tag: '[COMPANYLOGO_IMG]',
      },
      {
        value: 'Invoice number',
        tag: '[INVOICE_NUM]',
      },
      {
        value: 'Invoice URL',
        tag: '[INVOICE_URL]',
      },
      {
        value: 'Outstanding amount',
        tag: '[OUTSTANDING_AMOUNT]',
      },
      {
        value: 'Invoice date',
        tag: '[INVOICEDATE]',
      },
      {
        value: 'Voucher code',
        tag: '[VOUCHER_CODE]',
      },
      {
        value: 'Voucher amount',
        tag: '[VOUCHER_AMOUNT]',
      },
      {
        value: 'Voucher QR',
        tag: '[VOUCHER_QR]',
      },
      {
        value: 'Voucher barcode',
        tag: '[VOUCHER_BARCODE]',
      },
      {
        value: 'Voucher expiry',
        tag: '[VOUCHER_EXPIRY]',
      },
      {
        value: 'Voucher first name',
        tag: '[VOUCHER_FNAME]',
      },
      {
        value: 'Voucher last name',
        tag: '[VOUCHER_LNAME]',
      },
      {
        value: 'Voucher full name',
        tag: '[VOUCHER_FULLNAME]',
      },
      {
        value: 'Name',
        tag: '[LEADNAME]',
      },
      {
        value: 'First Name',
        tag: '[LEADFNAME]',
      },
      {
        value: 'Last Name',
        tag: '[LEADLNAME]',
      },
      {
        value: 'Salutation',
        tag: '[LEADTITLE]',
      },
      {
        value: 'Email',
        tag: '[LEADEMAIL]',
      },
      {
        value: 'Mobile',
        tag: '[LEADMOBILE]',
      },
      {
        value: 'Phone',
        tag: '[LEADPHONE]',
      },
      {
        value: 'Last call date',
        tag: '[LASTCALLDATE]',
      },
      {
        value: 'Last call date and time',
        tag: '[LASTCALLDATETIME]',
      },
      {
        value: 'Full name',
        tag: '[YOURNAME]',
      },
      {
        value: 'First name',
        tag: '[STAFFIRSTNAME]',
      },
      {
        value: 'Last name',
        tag: '[STAFFLASTNAME]',
      },
      {
        value: 'Email',
        tag: '[YOUREMAIL]',
      },
      {
        value: 'Job title',
        tag: '[YOURTITLE]',
      },
      {
        value: 'Mobile',
        tag: '[STAFFMOBILE]',
      },
      {
        value: 'Signature',
        tag: '[STAFF_SIGNATURE]',
      },
      {
        value: 'Opportunity owner',
        tag: '[OPPORTUNITY_OWNERFULLNAME]',
      },
      {
        value: 'Opportunity owner mobile',
        tag: '[OPPORTUNITY_OWNERMOBILE]',
      },
      {
        value: 'Opportunity owner job position',
        tag: '[OPPORTUNITY_OWNERJOBPOSITION]',
      },
      {
        value: 'Quickbook link',
        tag: '[QUICKBOOK_LINK]',
      },
      {
        value: 'Quickbook URL',
        tag: '[QUICKBOOK_URL]',
      },
      {
        value: 'Quickbook date and time',
        tag: '[QUICKBOOK_DATETIME]',
      },
      {
        value: 'Quickbook duration (minutes)',
        tag: '[QUICKBOOK_DURATION_MINUTES]',
      },
      {
        value: 'Custom Fields 1',
        tag: '[CUSTONEFIELDS1]',
      },
      {
        value: 'Forms 1',
        tag: '[FORMS1]',
      },
      {
        value: 'Manage Appointment',
        tag: '[CONNECT_MANAGE_APPOINTMENT]',
      },
      {
        value: 'Cancel Appointment',
        tag: '[CONNECT_CANCEL_APPOINTMENT]',
      },
      {
        value: 'Reschedule appointment',
        tag: '[CONNECT_RESCHEDULE_APPOINTMENT]',
      },
      {
        value: 'Book Online',
        tag: '[CONNECT_BOOK_ONLINE]',
      },
      {
        value: 'View appointment details',
        tag: '[CONNECT_APPOINTMENT_DETAIL]',
      },
      {
        value: 'Upload a photo',
        tag: '[CONNECT_UPLOAD_PHOTO]',
      },
    ],
  },
  {
    relationship: 'practioner',
    firstName: 'Smith',
    lastName: 'Practice',
    email: 'smith.practice@example.com',
    avatar: userAvatar,
    mergeTag: [
      {
        value: 'Smith Practic',
        tag: '[APPOINTMENTNAME]',
      },
      {
        value: 'Smith',
        tag: '[APPOINTMENTFIRSTNAME]',
      },
      {
        value: 'Practic',
        tag: '[APPOINTMENTLASTNAME]',
      },
      {
        value: 'smith.practice@example.com',
        tag: '[CLIENTEMAIL]',
      },
      {
        value: 'Date of birth',
        tag: '[CLIENTDOB]',
      },
      {
        value: 'Gender',
        tag: '[CLIENTGENDER]',
      },
      {
        value: 'Home phone number',
        tag: '[CLIENTPHONE]',
      },
      {
        value: 'Mobile phone number',
        tag: '[CLIENTMOBILE]',
      },
      {
        value: 'Client ID',
        tag: '[CLIENTID]',
      },
      {
        value: 'Salutation',
        tag: '[CLIENTSALUTATION]',
      },
      {
        value: 'Full Address',
        tag: '[FULLADDRESS]',
      },
      {
        value: 'Full Address Other',
        tag: '[FULLADDRESS2]',
      },
      {
        value: 'City',
        tag: '[CLIENTCITY]',
      },
      {
        value: 'Street',
        tag: '[CLIENTSTREET]',
      },
      {
        value: 'Street 2',
        tag: '[CLIENTADDRESS2]',
      },
      {
        value: 'Post code',
        tag: '[CLIENTPOSTAL]',
      },
      {
        value: 'County',
        tag: '[CLIENTCOUNTY]',
      },
      {
        value: 'Country',
        tag: '[CLIENTCOUNTRY]',
      },
      {
        value: 'Client preferences',
        tag: '[CLIENT_PREFERENCES]',
      },
      {
        value: 'Client form',
        tag: '[CLIENTFORM]',
      },
      {
        value: 'Client loyalty points',
        tag: '[CLIENTLOYALTY]',
      },
      {
        value: 'Number of sessions',
        tag: 'NUMBER_OF_SESSIONS',
      },
      {
        value: 'Client diagnosis code',
        tag: 'DIAG_CODE',
      },
      {
        value: 'Client mailing country',
        tag: 'CLIENTMAILINGCOUNTRY',
      },
      {
        value: 'Connect update information link',
        tag: 'APPOINTMENTMANAGE',
      },
      {
        value: 'Medical history form',
        tag: 'MEDICAL_FORM',
      },
      {
        value: 'Birthday voucher',
        tag: 'BDAYVOUCHER',
      },
      {
        value: 'Prescription date',
        tag: 'PRESCRIPTION_DATE',
      },
      {
        value: 'Prescriber name',
        tag: 'PRESCRIBER_NAME',
      },
      {
        value: 'Package name',
        tag: 'PACKAGE_NAME',
      },
      {
        value: 'Insurance name',
        tag: 'CLIENT_INS_COMP',
      },
      {
        value: 'Insurance contract',
        tag: 'CLIENT_INS_CONTRACT',
      },
      {
        value: 'Membership number',
        tag: 'CLIENT_INS_MEM_NUM',
      },
      {
        value: 'Insurance authorization code',
        tag: 'CLIENT_INS_AUTH_CODE',
      },
      {
        value: 'Insurance mobile',
        tag: 'CLIENT_INS_MOBILE',
      },
      {
        value: 'Insurance website',
        tag: 'CLIENT_INS_WEBSITE',
      },
      {
        value: 'Insurance city',
        tag: 'CLIENT_INS_CITY',
      },
      {
        value: 'Insurance street',
        tag: 'CLIENT_INS_STREET',
      },
      {
        value: 'Insurance county',
        tag: 'CLIENT_INS_COUNTY',
      },
      {
        value: 'Insurance postal',
        tag: 'CLIENT_INS_POSTAL',
      },
      {
        value: 'Insurance email',
        tag: 'CLIENT_INS_EMAIL',
      },
      {
        value: 'Insurance image',
        tag: 'CLIENT_INS_IMAGE',
      },
      {
        value: 'Insurance country',
        tag: 'CLIENT_INS_COUNTRY',
      },
      {
        value: 'Insurance street 2',
        tag: 'CLIENT_INS_STREET2',
      },
      {
        value: 'Insurance provider number',
        tag: 'CLIENT_INS_PROVIDERNUM',
      },
      {
        value: 'Staff Email',
        tag: '[APPOINTMENTSTAFFEMAIL]',
      },
      {
        value: 'Appt Date',
        tag: '[ADATE]',
      },
      {
        value: 'Appt Start Time',
        tag: '[ASTARTTIME]',
      },
      {
        value: 'Appt End Time',
        tag: '[AENDTIME]',
      },
      {
        value: 'Day',
        tag: '[AWEEKDAY]',
      },
      {
        value: 'Type',
        tag: '[ATYPE]',
      },
      {
        value: 'With',
        tag: '[AWITH]',
      },
      {
        value: 'Location',
        tag: '[ALOCATIONNAME]',
      },
      {
        value: 'Location address',
        tag: '[ALOCATIONADDRESS]',
      },
      {
        value: 'Location address 2',
        tag: '[ALOCATIONADDRESS2]',
      },
      {
        value: 'City',
        tag: '[ALOCATIONCITY]',
      },
      {
        value: 'Post code',
        tag: '[ALOCATIONPOSTAL]',
      },
      {
        value: 'Map Image',
        tag: '[ALOCATION_IMAGE]',
      },
      {
        value: 'Reschedule from date',
        tag: '[RESCHEDULE_FROM_DATE]',
      },
      {
        value: 'Reschedule from date and time',
        tag: '[RESCHEDULE_FROM_DATE_TIME]',
      },
      {
        value: 'Reschedule to date',
        tag: '[RESCHEDULE_TO_DATE]',
      },
      {
        value: 'Reschedule to date and time',
        tag: '[RESCHEDULE_TO_DATE_TIME]',
      },
      {
        value: 'Location email',
        tag: '[ALOCATIONEMAIL]',
      },
      {
        value: 'Location phone',
        tag: '[ALOCATIONPHONE]',
      },
      {
        value: 'Location website',
        tag: '[ALOCATIONWEB]',
      },
      {
        value: 'Appt Status',
        tag: '[APPOINTMENTSTATUS]',
      },
      {
        value: 'Appt Cancel',
        tag: '[APPOINTMENTCANCEL]',
      },
      {
        value: 'Appt Room',
        tag: '[APPOINTMENTROOM]',
      },
      {
        value: 'Social survey',
        tag: '[SOCIALSURVEY]',
      },
      {
        value: 'Social survey URL',
        tag: '[LINKSOCIALSURVEY]',
      },
      {
        value: 'Appointment group bookings',
        tag: '[FULL_APPT_DETAILS]',
      },
      {
        value: 'Video conference',
        tag: '[VIDEO_CONFERENCE]',
      },
      {
        value: 'Service category',
        tag: '[SERVICE_CATEGORY]',
      },
      {
        value: 'Master service category',
        tag: '[MASTER_CATEGORY]',
      },
      {
        value: 'Current date',
        tag: '[DATE]',
      },
      {
        value: 'Current date 2',
        tag: '[DATE2]',
      },
      {
        value: 'Current date & time friendly',
        tag: '[DATEFULL]',
      },
      {
        value: 'Current date & time',
        tag: '[DATETIME]',
      },
      {
        value: 'Current time',
        tag: '[TIME]',
      },
      {
        value: 'Company ID',
        tag: '[COMPANYID]',
      },
      {
        value: 'Name',
        tag: '[COMPANYNAME]',
      },
      {
        value: 'Site',
        tag: '[COMPANYSITE]',
      },
      {
        value: 'City',
        tag: '[COMPANYCITY]',
      },
      {
        value: 'Street',
        tag: '[COMPANYSTREET]',
      },
      {
        value: 'County',
        tag: '[COMPANYCOUNTRY]',
      },
      {
        value: 'Post code',
        tag: '[COMPANYPOSTAL]',
      },
      {
        value: 'Country',
        tag: '[COMPANYCOUNTY]',
      },
      {
        value: 'Phone number',
        tag: '[COMPANYPHONE]',
      },
      {
        value: 'Company logo',
        tag: '[COMPANYLOGO_IMG]',
      },
      {
        value: 'Invoice number',
        tag: '[INVOICE_NUM]',
      },
      {
        value: 'Invoice URL',
        tag: '[INVOICE_URL]',
      },
      {
        value: 'Outstanding amount',
        tag: '[OUTSTANDING_AMOUNT]',
      },
      {
        value: 'Invoice date',
        tag: '[INVOICEDATE]',
      },
      {
        value: 'Voucher code',
        tag: '[VOUCHER_CODE]',
      },
      {
        value: 'Voucher amount',
        tag: '[VOUCHER_AMOUNT]',
      },
      {
        value: 'Voucher QR',
        tag: '[VOUCHER_QR]',
      },
      {
        value: 'Voucher barcode',
        tag: '[VOUCHER_BARCODE]',
      },
      {
        value: 'Voucher expiry',
        tag: '[VOUCHER_EXPIRY]',
      },
      {
        value: 'Voucher first name',
        tag: '[VOUCHER_FNAME]',
      },
      {
        value: 'Voucher last name',
        tag: '[VOUCHER_LNAME]',
      },
      {
        value: 'Voucher full name',
        tag: '[VOUCHER_FULLNAME]',
      },
      {
        value: 'Name',
        tag: '[LEADNAME]',
      },
      {
        value: 'First Name',
        tag: '[LEADFNAME]',
      },
      {
        value: 'Last Name',
        tag: '[LEADLNAME]',
      },
      {
        value: 'Salutation',
        tag: '[LEADTITLE]',
      },
      {
        value: 'Email',
        tag: '[LEADEMAIL]',
      },
      {
        value: 'Mobile',
        tag: '[LEADMOBILE]',
      },
      {
        value: 'Phone',
        tag: '[LEADPHONE]',
      },
      {
        value: 'Last call date',
        tag: '[LASTCALLDATE]',
      },
      {
        value: 'Last call date and time',
        tag: '[LASTCALLDATETIME]',
      },
      {
        value: 'Full name',
        tag: '[YOURNAME]',
      },
      {
        value: 'First name',
        tag: '[STAFFIRSTNAME]',
      },
      {
        value: 'Last name',
        tag: '[STAFFLASTNAME]',
      },
      {
        value: 'Email',
        tag: '[YOUREMAIL]',
      },
      {
        value: 'Job title',
        tag: '[YOURTITLE]',
      },
      {
        value: 'Mobile',
        tag: '[STAFFMOBILE]',
      },
      {
        value: 'Signature',
        tag: '[STAFF_SIGNATURE]',
      },
      {
        value: 'Opportunity owner',
        tag: '[OPPORTUNITY_OWNERFULLNAME]',
      },
      {
        value: 'Opportunity owner mobile',
        tag: '[OPPORTUNITY_OWNERMOBILE]',
      },
      {
        value: 'Opportunity owner job position',
        tag: '[OPPORTUNITY_OWNERJOBPOSITION]',
      },
      {
        value: 'Quickbook link',
        tag: '[QUICKBOOK_LINK]',
      },
      {
        value: 'Quickbook URL',
        tag: '[QUICKBOOK_URL]',
      },
      {
        value: 'Quickbook date and time',
        tag: '[QUICKBOOK_DATETIME]',
      },
      {
        value: 'Quickbook duration (minutes)',
        tag: '[QUICKBOOK_DURATION_MINUTES]',
      },
      {
        value: 'Custom Fields 1',
        tag: '[CUSTONEFIELDS1]',
      },
      {
        value: 'Forms 1',
        tag: '[FORMS1]',
      },
      {
        value: 'Manage Appointment',
        tag: '[CONNECT_MANAGE_APPOINTMENT]',
      },
      {
        value: 'Cancel Appointment',
        tag: '[CONNECT_CANCEL_APPOINTMENT]',
      },
      {
        value: 'Reschedule appointment',
        tag: '[CONNECT_RESCHEDULE_APPOINTMENT]',
      },
      {
        value: 'Book Online',
        tag: '[CONNECT_BOOK_ONLINE]',
      },
      {
        value: 'View appointment details',
        tag: '[CONNECT_APPOINTMENT_DETAIL]',
      },
      {
        value: 'Upload a photo',
        tag: '[CONNECT_UPLOAD_PHOTO]',
      },
    ],
  },
  {
    relationship: 'insurance-provider',
    company: 'BUPA',
    email: 'bupa@example.com',
    avatar: userAvatar,
    mergeTag: [
      {
        value: 'Client full name',
        tag: '[APPOINTMENTNAME]',
      },
      {
        value: 'First Name',
        tag: '[APPOINTMENTFIRSTNAME]',
      },
      {
        value: 'Last Name',
        tag: '[APPOINTMENTLASTNAME]',
      },
      {
        value: 'bupa@example.com',
        tag: '[CLIENTEMAIL]',
      },
      {
        value: 'Date of birth',
        tag: '[CLIENTDOB]',
      },
      {
        value: 'Gender',
        tag: '[CLIENTGENDER]',
      },
      {
        value: 'Home phone number',
        tag: '[CLIENTPHONE]',
      },
      {
        value: 'Mobile phone number',
        tag: '[CLIENTMOBILE]',
      },
      {
        value: 'Client ID',
        tag: '[CLIENTID]',
      },
      {
        value: 'Salutation',
        tag: '[CLIENTSALUTATION]',
      },
      {
        value: 'Full Address',
        tag: '[FULLADDRESS]',
      },
      {
        value: 'Full Address Other',
        tag: '[FULLADDRESS2]',
      },
      {
        value: 'City',
        tag: '[CLIENTCITY]',
      },
      {
        value: 'Street',
        tag: '[CLIENTSTREET]',
      },
      {
        value: 'Street 2',
        tag: '[CLIENTADDRESS2]',
      },
      {
        value: 'Post code',
        tag: '[CLIENTPOSTAL]',
      },
      {
        value: 'County',
        tag: '[CLIENTCOUNTY]',
      },
      {
        value: 'Country',
        tag: '[CLIENTCOUNTRY]',
      },
      {
        value: 'Client preferences',
        tag: '[CLIENT_PREFERENCES]',
      },
      {
        value: 'Client form',
        tag: '[CLIENTFORM]',
      },
      {
        value: 'Client loyalty points',
        tag: '[CLIENTLOYALTY]',
      },
      {
        value: 'Number of sessions',
        tag: 'NUMBER_OF_SESSIONS',
      },
      {
        value: 'Client diagnosis code',
        tag: 'DIAG_CODE',
      },
      {
        value: 'Client mailing country',
        tag: 'CLIENTMAILINGCOUNTRY',
      },
      {
        value: 'Connect update information link',
        tag: 'APPOINTMENTMANAGE',
      },
      {
        value: 'Medical history form',
        tag: 'MEDICAL_FORM',
      },
      {
        value: 'Birthday voucher',
        tag: 'BDAYVOUCHER',
      },
      {
        value: 'Prescription date',
        tag: 'PRESCRIPTION_DATE',
      },
      {
        value: 'Prescriber name',
        tag: 'PRESCRIBER_NAME',
      },
      {
        value: 'Package name',
        tag: 'PACKAGE_NAME',
      },
      {
        value: 'Insurance name',
        tag: 'CLIENT_INS_COMP',
      },
      {
        value: 'Insurance contract',
        tag: 'CLIENT_INS_CONTRACT',
      },
      {
        value: 'Membership number',
        tag: 'CLIENT_INS_MEM_NUM',
      },
      {
        value: 'Insurance authorization code',
        tag: 'CLIENT_INS_AUTH_CODE',
      },
      {
        value: 'Insurance mobile',
        tag: 'CLIENT_INS_MOBILE',
      },
      {
        value: 'Insurance website',
        tag: 'CLIENT_INS_WEBSITE',
      },
      {
        value: 'Insurance city',
        tag: 'CLIENT_INS_CITY',
      },
      {
        value: 'Insurance street',
        tag: 'CLIENT_INS_STREET',
      },
      {
        value: 'Insurance county',
        tag: 'CLIENT_INS_COUNTY',
      },
      {
        value: 'Insurance postal',
        tag: 'CLIENT_INS_POSTAL',
      },
      {
        value: 'Insurance email',
        tag: 'CLIENT_INS_EMAIL',
      },
      {
        value: 'Insurance image',
        tag: 'CLIENT_INS_IMAGE',
      },
      {
        value: 'Insurance country',
        tag: 'CLIENT_INS_COUNTRY',
      },
      {
        value: 'Insurance street 2',
        tag: 'CLIENT_INS_STREET2',
      },
      {
        value: 'Insurance provider number',
        tag: 'CLIENT_INS_PROVIDERNUM',
      },
      {
        value: 'Staff Email',
        tag: '[APPOINTMENTSTAFFEMAIL]',
      },
      {
        value: 'Appt Date',
        tag: '[ADATE]',
      },
      {
        value: 'Appt Start Time',
        tag: '[ASTARTTIME]',
      },
      {
        value: 'Appt End Time',
        tag: '[AENDTIME]',
      },
      {
        value: 'Day',
        tag: '[AWEEKDAY]',
      },
      {
        value: 'Type',
        tag: '[ATYPE]',
      },
      {
        value: 'With',
        tag: '[AWITH]',
      },
      {
        value: 'Location',
        tag: '[ALOCATIONNAME]',
      },
      {
        value: 'Location address',
        tag: '[ALOCATIONADDRESS]',
      },
      {
        value: 'Location address 2',
        tag: '[ALOCATIONADDRESS2]',
      },
      {
        value: 'City',
        tag: '[ALOCATIONCITY]',
      },
      {
        value: 'Post code',
        tag: '[ALOCATIONPOSTAL]',
      },
      {
        value: 'Map Image',
        tag: '[ALOCATION_IMAGE]',
      },
      {
        value: 'Reschedule from date',
        tag: '[RESCHEDULE_FROM_DATE]',
      },
      {
        value: 'Reschedule from date and time',
        tag: '[RESCHEDULE_FROM_DATE_TIME]',
      },
      {
        value: 'Reschedule to date',
        tag: '[RESCHEDULE_TO_DATE]',
      },
      {
        value: 'Reschedule to date and time',
        tag: '[RESCHEDULE_TO_DATE_TIME]',
      },
      {
        value: 'Location email',
        tag: '[ALOCATIONEMAIL]',
      },
      {
        value: 'Location phone',
        tag: '[ALOCATIONPHONE]',
      },
      {
        value: 'Location website',
        tag: '[ALOCATIONWEB]',
      },
      {
        value: 'Appt Status',
        tag: '[APPOINTMENTSTATUS]',
      },
      {
        value: 'Appt Cancel',
        tag: '[APPOINTMENTCANCEL]',
      },
      {
        value: 'Appt Room',
        tag: '[APPOINTMENTROOM]',
      },
      {
        value: 'Social survey',
        tag: '[SOCIALSURVEY]',
      },
      {
        value: 'Social survey URL',
        tag: '[LINKSOCIALSURVEY]',
      },
      {
        value: 'Appointment group bookings',
        tag: '[FULL_APPT_DETAILS]',
      },
      {
        value: 'Video conference',
        tag: '[VIDEO_CONFERENCE]',
      },
      {
        value: 'Service category',
        tag: '[SERVICE_CATEGORY]',
      },
      {
        value: 'Master service category',
        tag: '[MASTER_CATEGORY]',
      },
      {
        value: 'Current date',
        tag: '[DATE]',
      },
      {
        value: 'Current date 2',
        tag: '[DATE2]',
      },
      {
        value: 'Current date & time friendly',
        tag: '[DATEFULL]',
      },
      {
        value: 'Current date & time',
        tag: '[DATETIME]',
      },
      {
        value: 'Current time',
        tag: '[TIME]',
      },
      {
        value: 'Company ID',
        tag: '[COMPANYID]',
      },
      {
        value: 'Name',
        tag: '[COMPANYNAME]',
      },
      {
        value: 'Site',
        tag: '[COMPANYSITE]',
      },
      {
        value: 'City',
        tag: '[COMPANYCITY]',
      },
      {
        value: 'Street',
        tag: '[COMPANYSTREET]',
      },
      {
        value: 'County',
        tag: '[COMPANYCOUNTRY]',
      },
      {
        value: 'Post code',
        tag: '[COMPANYPOSTAL]',
      },
      {
        value: 'Country',
        tag: '[COMPANYCOUNTY]',
      },
      {
        value: 'Phone number',
        tag: '[COMPANYPHONE]',
      },
      {
        value: 'Company logo',
        tag: '[COMPANYLOGO_IMG]',
      },
      {
        value: 'Invoice number',
        tag: '[INVOICE_NUM]',
      },
      {
        value: 'Invoice URL',
        tag: '[INVOICE_URL]',
      },
      {
        value: 'Outstanding amount',
        tag: '[OUTSTANDING_AMOUNT]',
      },
      {
        value: 'Invoice date',
        tag: '[INVOICEDATE]',
      },
      {
        value: 'Voucher code',
        tag: '[VOUCHER_CODE]',
      },
      {
        value: 'Voucher amount',
        tag: '[VOUCHER_AMOUNT]',
      },
      {
        value: 'Voucher QR',
        tag: '[VOUCHER_QR]',
      },
      {
        value: 'Voucher barcode',
        tag: '[VOUCHER_BARCODE]',
      },
      {
        value: 'Voucher expiry',
        tag: '[VOUCHER_EXPIRY]',
      },
      {
        value: 'Voucher first name',
        tag: '[VOUCHER_FNAME]',
      },
      {
        value: 'Voucher last name',
        tag: '[VOUCHER_LNAME]',
      },
      {
        value: 'Voucher full name',
        tag: '[VOUCHER_FULLNAME]',
      },
      {
        value: 'Name',
        tag: '[LEADNAME]',
      },
      {
        value: 'First Name',
        tag: '[LEADFNAME]',
      },
      {
        value: 'Last Name',
        tag: '[LEADLNAME]',
      },
      {
        value: 'Salutation',
        tag: '[LEADTITLE]',
      },
      {
        value: 'Email',
        tag: '[LEADEMAIL]',
      },
      {
        value: 'Mobile',
        tag: '[LEADMOBILE]',
      },
      {
        value: 'Phone',
        tag: '[LEADPHONE]',
      },
      {
        value: 'Last call date',
        tag: '[LASTCALLDATE]',
      },
      {
        value: 'Last call date and time',
        tag: '[LASTCALLDATETIME]',
      },
      {
        value: 'Full name',
        tag: '[YOURNAME]',
      },
      {
        value: 'First name',
        tag: '[STAFFIRSTNAME]',
      },
      {
        value: 'Last name',
        tag: '[STAFFLASTNAME]',
      },
      {
        value: 'Email',
        tag: '[YOUREMAIL]',
      },
      {
        value: 'Job title',
        tag: '[YOURTITLE]',
      },
      {
        value: 'Mobile',
        tag: '[STAFFMOBILE]',
      },
      {
        value: 'Signature',
        tag: '[STAFF_SIGNATURE]',
      },
      {
        value: 'Opportunity owner',
        tag: '[OPPORTUNITY_OWNERFULLNAME]',
      },
      {
        value: 'Opportunity owner mobile',
        tag: '[OPPORTUNITY_OWNERMOBILE]',
      },
      {
        value: 'Opportunity owner job position',
        tag: '[OPPORTUNITY_OWNERJOBPOSITION]',
      },
      {
        value: 'Quickbook link',
        tag: '[QUICKBOOK_LINK]',
      },
      {
        value: 'Quickbook URL',
        tag: '[QUICKBOOK_URL]',
      },
      {
        value: 'Quickbook date and time',
        tag: '[QUICKBOOK_DATETIME]',
      },
      {
        value: 'Quickbook duration (minutes)',
        tag: '[QUICKBOOK_DURATION_MINUTES]',
      },
      {
        value: 'Custom Fields 1',
        tag: '[CUSTONEFIELDS1]',
      },
      {
        value: 'Forms 1',
        tag: '[FORMS1]',
      },
      {
        value: 'Manage Appointment',
        tag: '[CONNECT_MANAGE_APPOINTMENT]',
      },
      {
        value: 'Cancel Appointment',
        tag: '[CONNECT_CANCEL_APPOINTMENT]',
      },
      {
        value: 'Reschedule appointment',
        tag: '[CONNECT_RESCHEDULE_APPOINTMENT]',
      },
      {
        value: 'Book Online',
        tag: '[CONNECT_BOOK_ONLINE]',
      },
      {
        value: 'View appointment details',
        tag: '[CONNECT_APPOINTMENT_DETAIL]',
      },
      {
        value: 'Upload a photo',
        tag: '[CONNECT_UPLOAD_PHOTO]',
      },
    ],
  },
]
