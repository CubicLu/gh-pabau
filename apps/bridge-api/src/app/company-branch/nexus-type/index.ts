import {
  floatArg,
  intArg,
  list,
  nonNull,
  stringArg,
  inputObjectType,
  objectType,
} from 'nexus'

export const EmployeeType = inputObjectType({
  name: 'EmployeeType',
  definition(t) {
    t.int('id')
    t.string('name')
  },
})

export const BadgeType = inputObjectType({
  name: 'BadgeType',
  definition(t) {
    t.string('icon')
    t.string('name')
  },
})
export const CreateCompanyBranchResponse = objectType({
  name: 'CreateCompanyBranchResponse',
  definition(t) {
    t.int('id')
  },
})

export const UpdateCompanyBranchResponse = objectType({
  name: 'UpdateCompanyBranchResponse',
  definition(t) {
    t.int('affected_row')
  },
})

export const CreateCompanyBranchInputType = {
  street: nonNull(stringArg()),
  bookable: nonNull(intArg()),
  lng: nonNull(floatArg()),
  city: nonNull(stringArg()),
  name: nonNull(stringArg()),
  postcode: nonNull(stringArg()),
  phone: nonNull(stringArg()),
  showOnline: nonNull(intArg()),
  hasCalender: nonNull(intArg()),
  region: nonNull(stringArg()),
  address: nonNull(stringArg()),
  country: nonNull(stringArg()),
  website: nonNull(stringArg()),
  isActive: nonNull(intArg()),
  email: nonNull(stringArg()),
  lat: nonNull(floatArg()),
  color: nonNull(stringArg()),
  sendConfEmil: nonNull(intArg()),
  onlineBooking: nonNull(intArg()),
  customId: nonNull(stringArg()),
  image: nonNull(stringArg()),
  employees: list(EmployeeType),
  badges: list(BadgeType),
}

export const UpdateCompanyBranchInputType = {
  id: nonNull(intArg()),
  street: nonNull(stringArg()),
  bookable: nonNull(intArg()),
  lng: nonNull(floatArg()),
  city: nonNull(stringArg()),
  name: nonNull(stringArg()),
  postcode: nonNull(stringArg()),
  phone: nonNull(stringArg()),
  showOnline: nonNull(intArg()),
  hasCalender: nonNull(intArg()),
  region: nonNull(stringArg()),
  address: nonNull(stringArg()),
  country: nonNull(stringArg()),
  website: nonNull(stringArg()),
  isActive: nonNull(intArg()),
  email: nonNull(stringArg()),
  lat: nonNull(floatArg()),
  sendConfEmil: nonNull(intArg()),
  onlineBooking: nonNull(intArg()),
  image: nonNull(stringArg()),
  employees: list(EmployeeType),
  badges: list(BadgeType),
}
