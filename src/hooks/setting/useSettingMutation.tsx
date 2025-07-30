import { useApiV3 } from "@helpers/ApiHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateSettingDto {
  id?: string;
  key?: string;
  title?: string;
  description?: string;
  params?: string;
  status?: boolean;
  position?: number;
}

export const createSetting = (data: CreateSettingDto) => {
  const apiV3 = useApiV3();
  return apiV3.post("/portalperumahan/pengaturan/", data);
};

export const updateSetting = ({ id, ...data }: Partial<CreateSettingDto>) => {
  const apiV3 = useApiV3();
  return apiV3.put(`/portalperumahan/pengaturan/${id}`, data);
};

export default function useSettingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSettingDto) =>
      data.id ? updateSetting(data) : createSetting(data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["pengaturan", variables.key]);
    },
  });
}
