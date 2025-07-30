import { useState } from "react"
import { useApiV3 } from "@helpers/ApiHelper"

export default function useWilayah() {
  const apiV3 = useApiV3()

  const [loadingDirektorats, setLoadingDirektorats] = useState<boolean>(false)
  const [direktorats, setDirektorats] = useState<TDirektoratRecord[]>([])

  const optionsDirektorats = direktorats.filter(({ modelKegiatan }) => modelKegiatan).map(
    (direktorat: TDirektoratRecord) => {
      return {
        label: direktorat.name,
        value: direktorat.id,
      }
    }
  )

  const fetchAllDirektorats = async (params: Partial<TDirektoratRecord> = {}) => {
    setLoadingDirektorats(true)
    return apiV3
      .get("/master/direktorat/all", { params })
      .then((res) => {
        setDirektorats(res.data)
      })
      .finally(() => setLoadingDirektorats(false))
  }

  return {
    loadingDirektorats,
    fetchAllDirektorats,
    direktorats,
    optionsDirektorats,
  }
}
