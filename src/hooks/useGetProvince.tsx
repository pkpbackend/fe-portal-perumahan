import { useMutation, useQuery } from "@tanstack/react-query";

import { useApiV3 } from "@helpers/ApiHelper";

export const getProvince = () => {
  const apiV3 = useApiV3();
  return apiV3.get("/master/wilayah/provinsi");
};

export default function useGetProvince() {
  return useQuery({
    queryKey: ["province"],
    queryFn: getProvince,
    select(response) {
      return response?.data?.data;
    },
    retry: false,
  });
}
