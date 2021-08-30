import React, { FC } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'
import { compose, withProps } from 'recompose'
import vector from '../../assets/images/location-pin.svg'

interface Coordinate {
  lat: number
  lng: number
}

interface SearchItem {
  name: string
  street: string
  postCode: string
  city: string
  country: string
  phone: string
  location?: Coordinate
}

interface MapProps {
  searchItems: SearchItem[]
}

const apiKey = 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw' //process.env.google_api_key

const Map: FC<MapProps> = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%`, borderRadius: 4 }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props: { searchItems; onSearchBoxMounted; bounds; onPlacesChanged }) => {
  return (
    <GoogleMap
      defaultOptions={{
        disableDefaultUI: true,
      }}
      defaultZoom={10}
      defaultCenter={{ lat: 29.5, lng: -95 }}
      center={
        props.searchItems.length > 0
          ? props.searchItems[0].location
          : { lat: 29.5, lng: -95 }
      }
    >
      {props.searchItems.map((item, index) => (
        <Marker
          key={`search-item-marker-${index}`}
          position={item.location}
          icon={{ url: vector, anchor: new google.maps.Point(5, 58) }}
        >
          <InfoWindow>
            <div>{item.name}</div>
          </InfoWindow>
        </Marker>
      ))}
    </GoogleMap>
  )
})

export default Map
