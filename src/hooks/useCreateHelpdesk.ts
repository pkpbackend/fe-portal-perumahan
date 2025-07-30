import { useMutation, useQuery } from "@tanstack/react-query";

import { useApiV3 } from "@helpers/ApiHelper";

interface CreateTicketDto {
  Helpdesk: {
    HelpdeskTopikDiskusiId?: number;
    isAdmin?: boolean;
    DirektoratId: number;
    title: string;
    HelpdeskUserId?: number;
  };
  HelpdeskUser: {
    name: string;
    gender: string;
    email: string;
    phone: string;
    instansi: string;
    pekerjaan: string;
    pendidikanTerakhir: string;
    internalUserId?: number;
    internalUserDetail?: string;
    ProvinsiId: number;
  };
}
interface CreateTicketResponse {
  data: {
    HelpdeskUser: {
      id: number;
      name: string;
      gender: string;
      email: string;
      phone: string;
      instansi: string;
      pekerjaan: string;
      ProvinsiId: number;
      updatedAt: string;
      createdAt: string;
    };
    Helpdesk: {
      id: number;
      HelpdeskTopikDiskusiId: number;
      DirektoratId: number;
      title: string;
      HelpdeskUserId: number;
      updatedAt: string;
      createdAt: string;
    };
  };
}
export const createHelpdesk = (data: CreateTicketDto) => {
  const apiV3 = useApiV3();
  return apiV3.post<CreateTicketResponse>("/master/helpdesk/", data);
};

export default function useCreateHelpdesk() {
  return useMutation({
    mutationFn: createHelpdesk,
  });
}
