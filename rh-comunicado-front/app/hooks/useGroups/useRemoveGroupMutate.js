import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useRemoveGroupMutate = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async ({ selectedChat }) => {
      return await axios.delete(API_URL + `api/grupo/${selectedChat}`, {
        headers: {
          Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Grupo apagado com sucesso");
      queryClient.invalidateQueries(["groups-data"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Error ao apagar grupo: ${error}`);
    },
  });
  return mutate;
};
