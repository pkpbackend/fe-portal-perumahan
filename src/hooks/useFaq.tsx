import { useApiV3 } from "@helpers/ApiHelper";
import { useQuery } from "@tanstack/react-query";

export interface Faq {
  id: number;
  order: number;
  status: boolean;
  answer: string;
  question: string;
  createdAt: string;
  updatedAt: string;
}
const getFaq = (query: any) => {
  const apiV3 = useApiV3();

  const params = {
    filtered: JSON.stringify([{ id: "status", value: true }]),
    sorted: JSON.stringify([{id: "order", desc: false},{id: "updatedAt", desc: true}]),
    ...query
  };

  return apiV3.get<{
    data: Faq[];
    page: number;
    pageSize: number;
    pages: number;
    total: number;
  }>(`/portalperumahan/faq`, {
    params,
  });
};

export default function useFaq(
  queryParams = null,
  options?: { enabled: boolean }
) {
  return useQuery({
    queryKey: ["faq", queryParams],
    queryFn: () => getFaq(queryParams),
    select(response) {
      return response?.data;
    },
    ...options,
  });
}
