import { useApiV3 } from "@helpers/ApiHelper";
import { useQuery } from "@tanstack/react-query";

export interface Panduan {
  id: number;
  order: number;
  status: boolean;
  title: string;
  description: string;
  attachments?: any;
  createdAt: string;
  updatedAt: string;
}
const getPanduan = (query: any) => {
  const apiV3 = useApiV3();

  const params = {
    filtered: JSON.stringify([{ id: "status", value: true }]),
    sorted: JSON.stringify([
      { id: "order", desc: false },
      { id: "updatedAt", desc: true },
    ]),
    ...query,
  };

  return apiV3.get<{
    data: Panduan[];
    page: number;
    pageSize: number;
    pages: number;
    totalRow: number;
  }>(`/portalperumahan/peraturan`, {
    params,
  });
};

export default function usePanduan(
  queryParams = null,
  options?: { enabled: boolean }
) {
  return useQuery({
    queryKey: ["panduan", queryParams],
    queryFn: () => getPanduan(queryParams),
    select(response) {
      return response?.data;
    },
    ...options,
  });
}
