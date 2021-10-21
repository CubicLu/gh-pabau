import React, { FC, ReactNode } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { compose, withProps } from 'recompose'
import { LocationDetails } from './GpSearch'

interface MapProps {
  apiKey: string
  locationDetail: LocationDetails
  isMarkerShown?: boolean
  setLocationDetail: ReactNode
}

const Map: FC<MapProps> = compose(
  withProps((props) => ({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%`, borderRadius: 4 }} />,
  })),
  withScriptjs,
  withGoogleMap
)(
  (props: {
    apiKey
    locationDetail
    onSearchBoxMounted
    bounds
    onPlacesChanged
    isMarkerShown
    setLocationDetail
  }) => {
    return (
      <GoogleMap
        defaultOptions={{
          disableDefaultUI: true,
        }}
        defaultZoom={14}
        center={props.locationDetail.position}
      >
        {props.isMarkerShown && (
          <Marker position={props.locationDetail.position} />
        )}
      </GoogleMap>
    )
  }
)

export default Map
