import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useApiV3 } from "@helpers/ApiHelper";

interface UpdateStatusHelpdeskDto {
  status: boolean;
  rating: number
  HelpdeskUserId: number
}

export const updateStatusHelpdesk = ({
  id,
  ...data
}: UpdateStatusHelpdeskDto & { id: string }) => {
  const apiV3 = useApiV3();
  return apiV3.put(`/master/helpdesk/${id}`, data);
};

export default function useUpdateStatusHelpdesk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatusHelpdesk,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["helpdesk", `${variables.id}`],

      });
    },
  });
}
