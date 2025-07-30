import { useApiV3 } from "@helpers/ApiHelper";
import { useQuery } from "@tanstack/react-query";

export interface PengumumanAttachment {
  id: string;
  isS3: boolean;
  path: string;
  size: number;
  s3url: string;
  encoding: string;
  filename: string;
  mimetype: string;
  fieldname: string;
  destination: string;
  originalname: string;
}
export interface Pengumuman {
  id: number;
  title: string;
  description: string;
  type: number;
  typePengumuman: string;
  urgencyScale: number;
  urgent: string;
  UserId: number;
  regionBased: any;
  attachments?: PengumumanAttachment[];
  createdAt: string;
  updatedAt: string;
}
const getPengumuman = (query: any) => {
  const apiV3 = useApiV3();

  const params = {
    filtered: [{ id: "eq$typePengumuman", value: "Lainnya" }],
    ...query,
  };

  return apiV3.get<{
    data: Pengumuman[];
    page: number;
    pageSize: number;
    pages: number;
    totalRow: number;
  }>(`/portalperumahan/pengumuman`, {
    params,
  });
};

export default function usePengumuman(
  queryParams = null,
  options?: { enabled: boolean }
) {
  return useQuery({
    queryKey: ["pengumuman", queryParams],
    queryFn: () => getPengumuman(queryParams),
    select(response) {
      return response?.data;
    },
    ...options,
  });
}
