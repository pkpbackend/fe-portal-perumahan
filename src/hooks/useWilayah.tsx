import { useState } from "react"
import { useApiV3 } from "@helpers/ApiHelper"

export default function useWilayah() {
  const apiV3 = useApiV3()

  const [loadingProvinsis, setLoadingProvinsis] = useState<boolean>(false)
  const [provinsis, setProvinsis] = useState<TProvinsiRecord[]>([])
  
  const optionsProvinsis = provinsis.map((provinsi: TProvinsiRecord) => {
    return {
      label: provinsi.nama,
      value: provinsi.id,
    }
  })

  const fetchAllProvinsis = async () => {
    setLoadingProvinsis(true)
    return apiV3.get("/master/wilayah/provinsi").then((res) => {
      setProvinsis((res.data).data)
    }).finally(() => setLoadingProvinsis(false))
  }

  return {
    loadingProvinsis,
    fetchAllProvinsis,
    provinsis,
    optionsProvinsis,
  }
}
