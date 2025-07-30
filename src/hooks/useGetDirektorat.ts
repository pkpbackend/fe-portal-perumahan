import { useMutation, useQuery } from "@tanstack/react-query";

import { useApiV3 } from "@helpers/ApiHelper";

export const getDirektorat = () => {
  return Promise.resolve([
    {
      id: 1,
      name: "Direktorat Rumah Susun",
    },
    {
      id: 2,
      name: "Direktorat Rumah Khusus",
    },
    {
      id: 3,
      name: "Direktorat Rumah Swadaya",
    },
    {
      id: 4,
      name: "Direktorat Rumah Umum dan Komersial",
    },
  ])
};

export default function useGetDirektorat() {
  return useQuery({
    queryKey: ["direktorat"],
    queryFn: getDirektorat,
    retry: false,
  });
}
