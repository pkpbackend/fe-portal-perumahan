import L from 'leaflet'

/**
 * Generate Leaflet map marker
 */
function generateMarker(iconUrl: string) {
  return new L.Icon({
    iconUrl,
    iconSize: [18, 32],
    iconAnchor: [12, 28],
  })
}

export default generateMarker
