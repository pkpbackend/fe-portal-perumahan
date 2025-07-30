import generateMarker from '@utils/generateMarker'

/**
 * Untuk mengenerate Icon titik point peta sebaran Rusun, Rusus,
 * Ruswa, maupun RUK
 */
function generateMarkerPetaSebaran(idKegiatan?: string) {
  let icon = generateMarker('/images/marker/rusun-marker.svg')

  switch (parseInt(idKegiatan)) {
    case 5:
      icon = generateMarker('/images/marker/rusus-marker.svg')
      break

    case 4:
      icon = generateMarker('/images/marker/ruswa-marker.svg')
      break

    case 3:
      icon = generateMarker('/images/marker/ruk-marker.svg')
      break

    default:
      icon = generateMarker('/images/marker/rusun-marker.svg')
      break
  }

  return icon
}

export default generateMarkerPetaSebaran
