import { useEffect, useRef } from 'react'
import * as L from 'leaflet'
import { useMap } from 'react-leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import daftarProvinsi from './json/setiap-provinsi-geojson.json'

export type MarkerPositionTypes = {
  idProvinsi: string
  lat: number
  lng: number
  icon?: L.Icon<L.IconOptions> | L.DivIcon
  onClick?: () => void
}

type MarkerClusterProps = {
  markerPositions?: MarkerPositionTypes[]
}

export default function MarkerCluster(props: MarkerClusterProps) {
  const { markerPositions } = props
  const mcgs = useRef<Record<string, any>>({})
  const map = useMap()

  useEffect(() => {
    Object.keys(mcgs.current).forEach((key) => {
      mcgs.current[key]?.clearLayers()
    })

    daftarProvinsi.forEach((provinsi) => {
      /**
       * mcg is "Marker Cluster Group"
       */
      const mcg = (L as any).markerClusterGroup({
        iconCreateFunction: (options) => {
          const childCount = options.getChildCount()
          let className = ' marker-cluster-'

          switch (true) {
            case childCount < 51:
              className += 'small'
              break

            case childCount < 151:
              className += 'medium'
              break

            default:
              className += 'large'
              break
          }

          return new L.DivIcon({
            html: `<div><span>${childCount}</span></div>`,
            className: `marker-cluster${className}`,
            iconSize: new L.Point(40, 40),
          })
        },
      })

      mcgs.current[provinsi.properties.id] = mcg

      const geoLayer = L.geoJSON(provinsi as any, {
        style: { color: 'rgba(79, 70, 229, 0.25)' },
      })

      /**
       * Generate marker by Provinsi
       */
      markerPositions
        ?.filter((marker) => String(marker.idProvinsi) === String(provinsi.properties.id))
        ?.forEach((marker) => {
          L.marker(new L.LatLng(marker.lat, marker.lng), {
            icon: marker.icon,
          })
            .on('click', marker.onClick)
            .addTo(geoLayer)
        })

      /**
       * Add GeoJSON layer to mcg
       */
      geoLayer.addTo(mcg)

      /**
       * Add the marker cluster group to the map
       */
      map.addLayer(mcg)
    })

    /**
     * Optionally center the map around the markers
     */
    // map.fitBounds(mcg.getBounds());
  }, [markerPositions, map])

  return null
}
