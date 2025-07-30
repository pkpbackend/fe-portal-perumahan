import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useApiV3 } from "@helpers/ApiHelper";

interface CreateDiscussionChatDto {
  HelpdeskUserId: number;
  chat: string;
}

export const createHelpdeskDiscussionChat = ({
  id,
  ...data
}: CreateDiscussionChatDto & { id: string }) => {
  const apiV3 = useApiV3();
  return apiV3.post(`/master/helpdesk/${id}/chat`, data);
};

export default function useCreateHelpdeskDiscussionChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHelpdeskDiscussionChat,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["helpdesk-discussion-chats", `${variables.id}`],
      });
    },
  });
}
