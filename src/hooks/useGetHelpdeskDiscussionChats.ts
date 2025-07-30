import { useQuery } from "@tanstack/react-query";

import { useApiV3 } from "@helpers/ApiHelper";

export interface HelpdeskChats {
  id: number;
  HelpdeskId: number;
  HelpdeskUserId?: number;
  chat: string;
  createdAt: string;
  updatedAt: string;
  HelpdeskUser?: {
    internalUserId?: number;
    internalUserDetail?: {
      id: number
      nama: string
    };
    id: number;
    name?: string;
    email: string;
    phone?: string;
    pekerjaan?: string;
    instansi: any;
    pendidikanTerakhir: any;
    gender?: string;
    ProvinsiId?: number;
    createdAt: string;
    updatedAt: string;
  };
}
export const getHelpdeskDiscussionChats = (helpdeskId: string) => {
  const apiV3 = useApiV3();
  return apiV3.get<{ data: HelpdeskChats[] }>("/master/helpdesk/chats", {
    params: {
      page: 1,
      pageSize: 99999, // todo paginate
      filtered: JSON.stringify([
        {
          id: "eq$HelpdeskId",
          value: helpdeskId,
        },
      ]),
    },
  });
};

export default function useGetHelpdeskDiscussionChats({
  helpdeskId,
}: {
  helpdeskId: string;
}) {
  return useQuery({
    queryKey: ["helpdesk-discussion-chats", helpdeskId],
    queryFn: () => getHelpdeskDiscussionChats(helpdeskId),
    select(response) {
      return response?.data?.data;
    },
    enabled: Boolean(helpdeskId),
    retry: false,
  });
}
