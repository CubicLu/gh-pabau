import type { Context } from '../../context'
import type { CmContact } from '@prisma/client'

export default class ContactService {
  public constructor(private ctx: Context) {}
  public async getAllClients(): Promise<CmContact[]> {
    const allContacts = await this.ctx.prisma.cmContact.findMany({
      where: {
        company_id: {
          equals: this.ctx.authenticated.company,
        },
      },
    })
    return allContacts
  }
  private compareTwoContacts(
    contact1: CmContact,
    contact2: CmContact
  ): boolean {
    if (
      contact1.Fname === contact2.Fname &&
      contact1.Lname === contact2.Lname &&
      contact1.Email === contact2.Email &&
      contact1.ID !== contact2.ID
    ) {
      return true
    }
    return false
  }

  public async findAllDuplicates(): Promise<Array<CmContact>> {
    /// all patients in array
    const allContacts = await this.getAllClients()
    const duplicates = []
    const tempArray = []

    for (const mainContact of allContacts) {
      const foundGroup = []

      for (const queryContact of allContacts) {
        if (this.compareTwoContacts(mainContact, queryContact)) {
          if (
            !foundGroup.some((element) => element === mainContact) &&
            !tempArray.includes(mainContact.ID)
          ) {
            foundGroup.push(mainContact)
            tempArray.push(mainContact.ID)
          }
          if (
            !foundGroup.some((element) => element === queryContact) &&
            !tempArray.includes(queryContact.ID)
          ) {
            foundGroup.push(queryContact)
            tempArray.push(queryContact.ID)
          }
        }
      }

      if (foundGroup.length > 0) duplicates.push(foundGroup)
    }
    return duplicates
  }
}
