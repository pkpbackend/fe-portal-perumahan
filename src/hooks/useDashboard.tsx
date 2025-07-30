import { useApiV3 } from "@helpers/ApiHelper"
import { useState } from "react"

export default function useDashboard() {
  const apiV3 = useApiV3()
  
  const [mapLoading, setMapLoading] = useState(false)
  const [map, setMap] = useState([])

  const fetchMap:any = (params: TMapParams) => {
    setMapLoading(true)
    return apiV3.get('/dashboard/map', { params }).then((res) => {
      setMap((res.data).data)
      setMapLoading(false)
    })
  }
  
  return {
    fetchMap,
    mapLoading,
    map,
  }
}