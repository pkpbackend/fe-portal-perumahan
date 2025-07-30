import { useMutation, useQuery } from "@tanstack/react-query";

import { useApiV3 } from "@helpers/ApiHelper";

export interface Helpdesk {
  id: number;
  HelpdeskTopikDiskusiId: number;
  HelpdeskUserId: number;
  DirektoratId: number;
  Direktorat: {
    id: number;
    name: string;
    kodeKegiatan: number;
    namaKegiatan: string;
    createdAt: string;
    updatedAt: string;
  };
  status: boolean;
  isAdmin: boolean;
  title: string;
  createdAt: string;
  updatedAt: string;
  topikDiskusi: {
    id: number;
    name: string;
    createdAt: string;
    updatedA: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    pekerjaan: string;
    pendidikanTerakhir?: string;
    gender: string;
    ProvinsiId: number;
    internalUserId?: string;
    internalUserDetail?: any;
    createdAt: string;
    updatedAt: string;
  };
}
export const getHelpdesk = (id: string) => {
  const apiV3 = useApiV3();
  return apiV3.get<{ data: Helpdesk }>(`/master/helpdesk/${id}`);
};

export default function useGetHelpdesk(id: string) {
  return useQuery({
    queryKey: ["helpdesk", id],
    queryFn: () => getHelpdesk(id),
    select(response) {
      return response?.data?.data;
    },
    enabled: Boolean(id),
    retry: false,
  });
}
