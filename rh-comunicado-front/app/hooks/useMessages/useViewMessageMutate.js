import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useViewMessageMutate = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async ({ userId, messageId }) => {
      return await axios.post(
        API_URL + `api/mensagem/${messageId}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["viewUser"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutate;
};
