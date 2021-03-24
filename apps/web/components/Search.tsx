import { FC, useState } from 'react'
import { gql } from '@apollo/client'
import { useLiveQuery, Search as PabauSearch } from '@pabau/ui'

const QUERY = gql`
  query($searchTerm1: String = "", $searchTerm2: String = "") {
    cmContacts(
      where: {
        OR: [
          {
            AND: [
              { Fname: { equals: $searchTerm1 } }
              { Fname: { equals: $searchTerm2 } }
            ]
          }
          {
            AND: [
              { Fname: { equals: $searchTerm2 } }
              { Fname: { equals: $searchTerm1 } }
            ]
          }
        ]
      }
    ) {
      ID
      Fname
      Lname
    }
  }
`

const Search: FC = () => {
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const { data } = useLiveQuery(QUERY, {
    variables: { searchTerm1: searchTerms[0], searchTerm2: searchTerms[1] },
  })
  console.log('data: ' + JSON.stringify(data))
  return (
    <PabauSearch
      searchResults={data?.map(({ first_name, last_name, ...rest }) => ({
        firstName: first_name,
        lastName: last_name,
        ...rest,
      }))}
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
