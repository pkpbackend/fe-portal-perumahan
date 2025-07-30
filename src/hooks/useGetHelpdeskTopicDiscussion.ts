import { useMutation, useQuery } from "@tanstack/react-query";

import { useApiV3 } from "@helpers/ApiHelper";

export interface HelpdeskTopicDiscussion {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export const getHelpdeskTopicDiscussion = () => {
  const apiV3 = useApiV3();
  return apiV3.get<{ data: HelpdeskTopicDiscussion[] }>(
    "/master/helpdesk/topik-diskusi"
  );
};

export default function useGetHelpdeskTopicDiscussion() {
  return useQuery({
    queryKey: ["helpdesk-topic-discussion"],
    queryFn: getHelpdeskTopicDiscussion,
    select(response) {
      return response?.data?.data;
    },
    retry: false,
  });
}
