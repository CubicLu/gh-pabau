import React, { FC, ReactNode, useEffect, useRef } from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps'
import { compose, lifecycle, withProps } from 'recompose'
import marker from '../../assets/images/marker.png'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { LocationDetails } from './LocationDetails'
import styles from './LocationsLayout.module.less'

const {
  StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox') // eslint-disable-line @typescript-eslint/no-var-requires

interface MapProps {
  locationDetail: LocationDetails
  isMarkerShown?: boolean
  setLocationDetail: ReactNode
}

const apiKey = process.env.google_api_key

const Map: FC<MapProps> = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%`, borderRadius: 4 }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs: any = {} // eslint-disable-line  @typescript-eslint/no-explicit-any
      const { setLocationDetail } = this.props
      this.setState({
        places: [],
        // eslint-disable-next-line   @typescript-eslint/no-explicit-any
        onSearchBoxMounted: (ref: any) => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          const placeDetail = places?.[0]
          const locationDetail = {
            postcode: '',
            apt: '',
            address: '',
            position: {
              lng: 0,
              lat: 0,
            },
            city: '',
            region: '',
            country: '',
            location: '',
          }

          const { geometry, address_components } = placeDetail
          const { location } = geometry
          locationDetail.position = { lat: location.lat(), lng: location.lng() }
          if (address_components) {
            for (const addressDetail of address_components) {
              const { types, short_name } = addressDetail
              if (types.includes('street_number')) {
                locationDetail.apt = short_name
              } else if (types.includes('postal_code')) {
                locationDetail.postcode = short_name
              } else if (types.includes('country')) {
                locationDetail.country = short_name
              } else if (types.includes('locality')) {
                locationDetail.city = short_name
              } else if (types.includes('neighborhood')) {
                locationDetail.location = short_name
              }
            }
          }
          setLocationDetail(locationDetail)
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(
  (props: {
    locationDetail
    onSearchBoxMounted
    bounds
    onPlacesChanged
    isMarkerShown
    setLocationDetail
  }) => {
    const searchRef = useRef(null)
    const { t } = useTranslationI18()
    useEffect(() => {
      if (props.locationDetail.address) {
        searchRef.current.value = props.locationDetail.address
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (searchRef.current.value) {
        const locationDetail = {
          ...props.locationDetail,
          address: searchRef.current.value,
        }
        props.setLocationDetail(locationDetail)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchRef.current?.value])

    return (
      <GoogleMap
        defaultOptions={{
          disableDefaultUI: true,
        }}
        defaultZoom={14}
        center={props.locationDetail.position}
      >
        <div data-standalone-searchbox="">
          <div className={styles.locationSearchInput}>
            <div className={styles.locationSearchIcon}>
              <img alt={'marker-icon'} src={marker} />
            </div>
            <StandaloneSearchBox
              ref={props.onSearchBoxMounted}
              bounds={props.bounds}
              onPlacesChanged={props.onPlacesChanged}
            >
              <input
                ref={searchRef}
                type="text"
                className="ant-input"
                placeholder={t('setup.locations.location.search.placehodlder')}
              />
            </StandaloneSearchBox>
          </div>
        </div>
        {props.isMarkerShown && (
          <Marker position={props.locationDetail.position} />
        )}
      </GoogleMap>
    )
  }
)

export default Map
