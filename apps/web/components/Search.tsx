import { FC, useState } from 'react'
import { gql } from '@apollo/client'
import { useLiveQuery, Search as PabauSearch } from '@pabau/ui'

const QUERY = gql`
  query findContacts($searchTerm1: String, $searchTerm2: String) {
    cmContacts(
      where: {
        OR: [
          { Fname: { contains: $searchTerm1 } }
          { Fname: { contains: $searchTerm2 } }
          { Lname: { contains: $searchTerm1 } }
          { Lname: { contains: $searchTerm2 } }
          { Mobile: { contains: $searchTerm1 } }
          { Mobile: { contains: $searchTerm2 } }
          { Email: { contains: $searchTerm1 } }
          { Email: { contains: $searchTerm2 } }
        ]
      }
      take: 10
    ) {
      Fname
      Lname
      Email
      Mobile
      Avatar
    }
  }
`
const Search: FC = () => {
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const variables = { searchTerm1: searchTerms[0] }
  if (searchTerms[1] !== '') {
    variables['searchTerm2'] = searchTerms[1]
  }
  const { data } = useLiveQuery(QUERY, {
    variables: { searchTerm1: searchTerms[0] },
  })

  return (
    <PabauSearch
      searchResults={data?.map(
        ({ Fname, Lname, Avatar, Email, Mobile, ...rest }) => ({
          firstName: Fname,
          lastName: Lname,
          avatarUrl: Avatar,
          mobile: Mobile,
          email: Email,
          ...rest,
        })
      )}
      onChange={(e) => {
        console.log('got new text from input', e)
        const bits = e.split(' ')
        const wordBits = []

        for (const bit of bits) {
          wordBits.push(bit + '%')
        }
        if (wordBits.length < 2) {
          wordBits.push('%')
        }
        if (wordBits.length < 2) {
          wordBits.push('%')
        }

        setSearchTerms([...wordBits])
      }}
    />
  )
}

export default Search
